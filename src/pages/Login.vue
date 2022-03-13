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
                <q-input dark outlined v-model="email" placeholder="Điền email">
                </q-input>
              </div>
              <div>
                <q-item-label class="q-mb-sm">Mật khẩu (*)</q-item-label>
                <q-input dark outlined v-model="password" :type="isPwd ? 'password' : 'text'"
                  placeholder="Điền mật khẩu">
                  <template v-slot:append>
                    <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                      @click="isPwd = !isPwd" />
                  </template>
                </q-input>
              </div>
              <div class="text-right q-mt-sm">
                <a href="/forgot-password" class="text-positive">Quên mật khẩu</a>
              </div>
              <q-btn class="full-width bg-positive" @click="onSubmit()" label="Đăng nhập" style="" />
              <div class="q-mt-md">
                Cần tài khoản KingAI? <a href="/register" class="text-positive">Đăng ký</a>
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
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        try {
          let response = await api.post('/auth/login', data);
          if (response.status !== 200 && response.status !== 201) {
            throw new Error();
          }
          let user = response.data.user;
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('jwt', response.data.access_token);
          api.defaults.headers.common['Authorization'] =
            'Bearer ' + response.data.access_token;
          if (user.role === 0) {
            if (user.botId) {
              $router.push({ name: 'information-bot' });
            } else if (user.groupId) {
              $router.push({ name: 'infomation-copy-group' });
            } else {
              // $router.push({ name: 'infomation-copy-trader' });
              $router.push('/user/home');
            }
          } else if (user.role === 1) {
            if (user.botId) {
              $router.push('/admin/information-bot');
            } else {
              // $router.push('/admin/solo');
              $router.push('/admin/home');

            }
          } else if (user.role === 3) {
            $router.push('/superadmin/');
          } else {

          }
          $q.loading.value = false;
        } catch (error) {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Email hoặc password không đúng!',
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