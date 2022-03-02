<template>
  <!-- <q-layout container style="height: 600px"> -->
  <q-layout class="justify-center">
    <q-page-container class="window-height">
      <div
        class="
          q-pa-md
          fit
          row
          wrap
          justify-center
          items-end
          content-center
          rounded-borders
          dark
          fixed-center
          relative-position
        "
        style="max-width: 428px"
      >
        <div>
          <img class="absolute-top-left" src="logo.png" style="height: 80px" />
        </div>
        <h5 class="text-weight-bolder">Đăng nhập vào sàn</h5>
        <q-banner
          inline-actions
          rounded
          class="bg-positive text-white q-mb-md"
          style="width: 295px"
        >
          Tài khoản của Quý Khách đã dừng Copytrade. Quý Khách vui lòng đăng
          nhập lại.
        </q-banner>
        <template v-if="!isShowAuthenticator">
          <form class="q-gutter-x-xs q-gutter-y-lg">
            <div>
              <q-item-label class="q-mb-sm">Địa chỉ email*</q-item-label>
              <q-input
                dark
                outlined
                v-model="email"
                readonly
                style="width: 295px"
                placeholder="Điền email"
              >
              </q-input>
            </div>
            <div>
              <q-item-label class="q-mb-sm">Mật khẩu*</q-item-label>
              <q-input
                dark
                outlined
                v-model="password"
                style="width: 295px"
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
              @click="onLogin()"
              label="Đăng nhập sàn"
              style=""
            />
          </form>
        </template>
        <template v-else>
                 <form class="q-gutter-x-xs q-gutter-y-lg">
            <div>
              <q-item-label class="q-mb-sm">Mã Google Authentication*</q-item-label>
              <q-input
                dark
                outlined
                v-model="authenticatorCode"
                style="width: 295px"
                placeholder="Điền mã Google Authentication"
              >
              </q-input>
            </div>
            <q-btn
              class="full-width bg-positive"
              @click="onAuthenticator()"
              label="Đăng nhập sàn"
              style=""
            />
          </form>  
        </template>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { useQuasar, QSpinnerFacebook } from 'quasar';
import { ref, onMounted, onBeforeMount } from 'vue';
import { api } from 'src/boot/axios-connect-bo';
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
      if(!email.value) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Hãy điền email!',
          icon: 'report_problem',
        });
        return;
      }
      if(!isValidEmail()){
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Email không đúng định dạng!',
          icon: 'report_problem',
        });
        return;
      }
      if(!password.value){
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Hãy điền password!',
          icon: 'report_problem',
        });
        return;
      }
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
        authenticatorCode.value='';
        $q.loading.value = false;
      } catch (error) {
        if (
          error.response.status === 400 &&
          error.data.d?.err_code === 'user.limit.exceed'
        ) {
          $q.notify({
            color: 'negative',
            position: 'top',
            message:
              'Đang có hơn 1000 người vào hệ thống . Vui lòng đăng nhập lại sau vài phút',
            icon: 'report_problem',
          });
          $router.push('/user/setting-follow');
        }
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
      if(!authenticatorCode.value){
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Hãy điền mã Google Authentication!',
          icon: 'report_problem',
        });
        return;
      }
      if(authenticatorCode.value.length !== 6){
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Hãy điền mã Google Authentication bao gồm 6 số',
          icon: 'report_problem',
        });
        return;
      }
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
          message: 'Đăng nhập sàn thành công!',
          position: 'top',
        });
        $q.loading.value = false;
        // tslint:disable-next-line:no-floating-promises
        $router.back();
      } catch (error) {
        if(error.response.data.message === 'Invalid.2faCode') {
        $q.notify({
          color: 'negative',
          position: 'top',
          message:
            'Mã Authenticator không đúng định dạng! Vui lòng nhập mã gồm 6 kí tự',
          icon: 'report_problem',
        });
        } else {
        $q.notify({
          color: 'negative',
          position: 'top',
          message:
            'Mã Authenticator bị sai! Vui lòng nhập lại mã Authenticator',
          icon: 'report_problem',
        });
        }
      } finally {
        $q.loading.hide();
      }
    }
    function getEmail() {
      email.value = JSON.parse(localStorage.getItem('user')).email;
    }
    async function checkIsLogin() {
      let token = localStorage.getItem('jwt');
      // // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await api.post('/users/valid-token');
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Bạn đã đăng nhập sàn rồi!',
        position: 'top',
      });
      $router.back();
    }
    onMounted(getEmail);
    onBeforeMount(checkIsLogin);
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