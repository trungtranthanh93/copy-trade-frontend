<template>
  <!-- <q-layout container style="height: 600px"> -->
  <q-layout class="justify-center">
    <q-page-container class="window-height relative-position">
      <div class="row justify-center">
        <div :class="`${$q.screen.width > 768 ? 'col-4' : 'col-10 q-ma-md'}`" :style="$q.screen.width > 768 ? 'margin-top: 10%' : 'margin-top: 50%'">
            <div class="text-center q-ma-md">
                <img src="logo.png" style="height: 80px" />
              </div>
          <q-card class="q-pa-md">
        <form class="q-gutter-x-xs q-gutter-y-lg">
          <div>
            <q-item-label class="q-mb-sm">Địa chỉ email (*)</q-item-label>
            <q-input
              dark
              outlined
              v-model="email"
              placeholder="Điền email"
            >
            </q-input>
          </div>
          <div>
            <q-item-label class="q-mb-sm">Mật khẩu (*)</q-item-label>
            <q-input
              dark
              outlined
              v-model="password"
              :type="isPwd ? 'password' : 'text'"
              placeholder="Điền mật khẩu"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
          <q-btn
            class="full-width bg-positive"
            @click="onSubmit()"
            label="Đăng ký"
            style=""
          />
          <div class="q-mt-md">
            Có tài khoản Bossgroup?
            <a href="/" class="text-positive"
              >Đăng nhập tài khoản</a
            >
          </div>
        </form>
        </q-card>
      </div>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { useQuasar, QSpinnerIos } from 'quasar';
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
    function isValidEmail() {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(email.value);
    }

    async function onSubmit() {
      if (!email.value) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Hãy điền email!',
          icon: 'report_problem',
        });
        return;
      }
      if (!isValidEmail()) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Email không đúng định dạng!',
          icon: 'report_problem',
        });
        return;
      }
      if (!password.value) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Hãy điền password!',
          icon: 'report_problem',
        });
        return;
      }
      $q.loading.show({
        spinner: QSpinnerIos,
        spinnerColor: 'yellow',
        spinnerSize: 140,
        backgroundColor: 'purple',
        message: 'Đang xử lý đăng nhập....',
        messageColor: 'black',
      });
      let data = {
        email: email.value,
        password: password.value,
        isActive: false,
        role: 0,
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      try {
        let response = await api.post('/users', data);
        if (response.status !== 200 && response.status !== 201) {
          throw new Error();
        }
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Đăng ký thành công',
          position: 'top',
        });
        $q.loading.value = false;
        $router.push('/');
      } catch (error) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Đăng ký thất bại!',
          icon: 'report_problem',
        });
      } finally {
        $q.loading.hide();
      }
    }

    return {
      email,
      onSubmit,
      password,
      isPwd,
      isValidEmail,
    };
  },
};
</script>
<style></style>