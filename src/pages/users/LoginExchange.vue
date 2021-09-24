<template>
  <div class="column">
    <div class="row justify-center items-center">
      <q-card
        square
        dark
        class="q-pa-md q-ma-none no-shadow bg-grey-10"
        style="width: 320px"
      >
        <q-card-section class="q-mb-md"> </q-card-section>
        <q-card-section class="q-mt-xl q-mb-md">
          <p class="text-weight-bolder text-grey-2 text-center text-h6">
            Đăng nhập vào sàn
          </p>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md">
            <template v-if="!isShowAuthenticator">
              <q-input
                dark
                dense
                square
                filled
                clearable
                v-model="email"
                type="email"
                label="Email"
                :rules="[
                  (val) => !!val || 'Hãy điền email của bạn',
                  isValidEmail,
                ]"
                lazy-rules
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                dark
                dense
                square
                filled
                clearable
                v-model="password"
                type="password"
                label="Password"
                :rules="[(val) => !!val || 'Hãy điền password của bạn']"
                lazy-rules
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </template>
            <template v-else>
              <q-input
                dark
                dense
                square
                filled
                clearable
                v-model="authenticatorCode"
                type="text"
                label="Authenticator"
                lazy-rules
              >
                <template v-slot:prepend>
                  <q-icon name="vpn_key" />
                </template>
              </q-input>
            </template>
          </q-form>
        </q-card-section>
        <q-card-actions>
          <div class="row full-width items-center">
            <template v-if="!isShowAuthenticator">
              <div class="col-6">
                <q-btn
                  outline
                  rounded
                  size="md"
                  color="deep-orange"
                  class="full-width text-white"
                  label="Đăng nhập"
                  @click="onLogin()"
                />
              </div>
            </template>
            <template v-else>
              <q-btn
                outline
                rounded
                size="md"
                color="deep-orange"
                class="full-width text-white"
                label="Gửi mã"
                @click="onAuthenticator()"
              />
            </template>
          </div>
        </q-card-actions>
        <q-card-section> </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { useQuasar, QSpinnerFacebook } from 'quasar';
import { ref } from 'vue';
import { api } from 'boot/axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const $router = useRouter();
    const $q = useQuasar();
    const email = ref(null);
    const password = ref(null);
    const isPwd = ref(true);
    const authenticatorCode = ref(null);
    const isShowAuthenticator = ref(false);
    function isValidEmail() {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(email.value) || 'Hãy nhập đúng định dạng email';
    }

    async function onLogin() {
      $q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'yellow',
        spinnerSize: 140,
        backgroundColor: 'purple',
        message: 'Đang xử lý ....',
        messageColor: 'black',
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      try {
        let data = {
          email: email.value,
          password: password.value,
        };
        let token = localStorage.getItem('jwt');
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let responseContent = await api.post('/users/login-pocinex', data);
        if (responseContent.status !== 200 && responseContent.status !== 201) {
          throw new Error();
        }
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Hãy điền tiếp mã Authenticator ',
          position: 'top',
        });
        isShowAuthenticator.value = true;
        $q.loading.value = false;
      } catch (error) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Đăng nhập thất bại ! Vui lòng đăng nhập lại',
          icon: 'report_problem',
        });
        isShowAuthenticator.value = false;
      } finally {
        $q.loading.hide();
      }
    }
    async function onAuthenticator() {
      $q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'yellow',
        spinnerSize: 140,
        backgroundColor: 'purple',
        message: 'Đang xử lý ....',
        messageColor: 'black',
      });
      try {
        let dataAuthenticatorCode = {
          email: email.value,
          authentication: authenticatorCode.value,
        };
        let token = localStorage.getItem('jwt');
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let res = await api.post(
          '/users/authentication',
          dataAuthenticatorCode
        );
        if (res.status !== 200 && res.status !== 201) {
          throw new Error();
        }
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Đăng nhập sàn thành công. Hãy chọn chuyên gia muốn follow',
          position: 'top',
        });
        $q.loading.value = false;
        // tslint:disable-next-line:no-floating-promises
        $router.push('/user/list-master');
      } catch (error) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message:
            'Mã Authenticator không đúng! Vui lòng thực hiện đăng nhập lại',
          icon: 'report_problem',
        });
        isShowAuthenticator.value = false;
      }finally {
        $q.loading.hide();
      }
    }
    return {
      email,
      onLogin,
      password,
      isPwd,
      isValidEmail,
      isShowAuthenticator,
      onAuthenticator,
      authenticatorCode,
    };
  },
};
</script>
<style></style>
