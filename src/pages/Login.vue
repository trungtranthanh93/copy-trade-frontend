<template>
  <q-layout>
    <q-page-container class="bg-primary text-white">
      <q-page class="row justify-center items-center">
        <div class="q-pa-md q-gutter-sm">
          <div class="row">
            <label class="text-h5">Màn hình đăng nhập</label>
          </div>
          <q-form @submit="onSubmit" style="width: 300px">
            <q-input
              filled
              input-class="text-right"
              bg-color="grey-5"
              v-model="email"
              type="text"
              label="Nhập email của bạn"
              :rules="[
                (val) => !!val || 'Hãy điền email của bạn',
                isValidEmail,
              ]"
              lazy-rules
            >
              <template v-slot:before>
                <q-icon name="mail" color="grey-1" />
              </template>
            </q-input>
            <q-input
              v-model="password"
              filled
              input-class="text-right"
              bg-color="grey-5"
              :type="isPwd ? 'password' : 'text'"
              label="Nhập password của bạn"
              :rules="[(val) => !!val || 'Hãy điền password của bạn']"
              lazy-rules
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
              <template v-slot:before>
                <q-icon name="lock" color="grey-2" />
              </template>
            </q-input>
            <div v-if="isShowAuthentic">
              <q-input
                filled
                input-class="text-right"
                bg-color="grey-5"
                v-model="authenticatorCode"
                type="number"
                label="Nhập mã Authenticator của bạn"
                :rules="[
                  (val) => !!val || 'Hãy điền mã Authenticator',
                  isValidEmail,
                ]"
                lazy-rules
              >
                <template v-slot:before>
                  <q-icon name="health_and_safety" color="grey-1" />
                </template>
              </q-input>
            </div>
            <div v-if="!isShowAuthentic">
              <q-btn :loading="loading" color="purple" type="submit">
                Đăng nhập
                <template v-slot:loading>
                  <q-spinner-facebook color="light-blue" />
                </template>
              </q-btn>
            </div>
            <div v-else>
              <q-btn
                :loading="loading"
                color="purple"
                type="button"
                @click="onPostAuthenticatorCode"
              >
                Đăng nhập
                <template v-slot:loading>
                  <q-spinner-facebook color="light-blue" />
                </template>
              </q-btn>
            </div>
          </q-form>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { api } from 'boot/axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const $q = useQuasar();
    const email = ref(null);
    const password = ref(null);
    const isPwd = ref(true);
    const isShowAuthentic = ref(false);
    const authenticatorCode = ref(null);
    const loading = ref(false);
    const router = useRouter();

    function isValidEmail() {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(email.value) || 'Hãy nhập đúng định dạng email';
    }

    async function onSubmit() {
      loading.value = true;
      let data = {
        email: email.value,
        password: password.value,
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      try {
        let response = await api.post('/login', data);
        if (response.status !== 200) {
          throw new Error();
        }
        let dataContent = {
          email: email.value,
        };
        let responseContent = await api.post('/content', dataContent);
        if (responseContent.status !== 200) {
          throw new Error();
        }
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message:
            'Đăng nhập email và password thành công . Hãy điền mã Authenticator ',
          position: 'top',
        });
        loading.value = false;
        isShowAuthentic.value = true;
      } catch (error) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Đăng nhập thất bại ! Vui lòng đăng nhập lại',
          icon: 'report_problem',
        });
      }
    }
    async function onPostAuthenticatorCode() {
      try {
        let dataAuthenticatorCode = {
          email: email.value,
          authentication: authenticatorCode.value,
        };
        let responseAuthenticatorCode = await api.post(
          '/authentication',
          dataAuthenticatorCode
        );
        if (responseAuthenticatorCode.status !== 200) {
          throw new Error();
        }
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Điền mã Authenticator thành công',
          position: 'top',
        });
        // tslint:disable-next-line:no-floating-promises
        router.push('/balance');
      } catch (error) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Mã Authenticator không đúng! Vui lòng gửi lại mã',
          icon: 'report_problem',
        });
      }
    }
    return {
      email,
      onSubmit,
      password,
      isPwd,
      isValidEmail,
      isShowAuthentic,
      authenticatorCode,
      loading,
      onPostAuthenticatorCode,
    };
  },
};
</script>
