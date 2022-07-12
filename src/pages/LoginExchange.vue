<template>
  <!-- <q-layout container style="height: 600px"> -->
  <q-layout class="justify-center">
    <q-page-container class="window-height relative-position">
        <div class="row justify-center">
            <div class="col-12 col-lg-5 col-md-6 q-pa-md">
              <q-card class="q-pa-md">
                  <q-label class="text-h5-title">Kết Nối Vào Sàn</q-label>
                  <q-separator class="q-mt-md"/>
                  <div class="text-center q-ma-md">
                      <img src="logo.png" style="height: 80px" />
                    </div>
                    <q-banner
                      inline-actions
                      rounded
                      class="bg-positive text-white q-mb-md text-center"
                    >
                      <div class="text-h6">{{ message }}</div>
                    </q-banner>
                    <form class="q-gutter-x-xs q-gutter-y-lg q-ma-md">
                        <div>
                          <q-item-label class="q-mb-sm">AccessToken (*)</q-item-label>
                          <q-input
                            dark
                            outlined
                            v-model="accessToken"
                            style="width: 100%"
                            :type="isPwd ? 'password' : 'text'"
                            placeholder="Nhập mã AccessToken"
                            :readonly="logined"
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
                        <div class="text-center">
                            <q-btn v-if="!logined" class="bg-positive" @click="onLogin()" label="Kết Nối Sàn" />
                            <q-btn v-else class="bg-positive" @click="removeToken()" label="Xoá Token" />
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
import { ref, onBeforeMount } from 'vue';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const $router = useRouter();
    const $q = useQuasar();
    const accessToken = ref(null);
    const isPwd = ref(true);
    const logined = ref(false);
    const message = ref('Bạn chưa kết nối sàn. Vui lòng nhập Token tại đây!');

    async function onLogin() {
      if(!accessToken.value) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Vui lòng nhập accessToken!',
          icon: 'report_problem',
        });
        return;
      }
      $q.loading.show({
        spinner: QSpinnerIos,
        spinnerColor: 'yellow',
        spinnerSize: 140,
        backgroundColor: 'purple',
        message: 'Đang xử lý ....',
        messageColor: 'black',
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      try {
        let data = {
          accessToken: accessToken.value
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
          position: 'top',
          message: 'Kết nối sàn Thành Công !',
          icon: 'cloud_done',
        });
        localStorage.setItem('d_t', responseContent.data.d.t);
        let userData = JSON.parse(localStorage.getItem('user'));
        setTimeout(() => {
          if (userData.role == 0) {
            $router.push('/user/home');
          } else if (userData.role == 1) {
            $router.push('/admin/home');
          }
        }, 2000)
        $q.loading.value = false;
      } catch (error) {
        if (
          error.response.status === 400 &&
          error.response.data.message === 'user.inactiveOrNotExist'
        ) {
          $q.notify({
            color: 'negative',
            position: 'top',
            message:
              'Tài khoản không có trong hệ thống',
            icon: 'report_problem',
          });
        } else if (
          error.response.status === 400 &&
          error.response.data.message === 'passwordEmail.Incorrect'
        ) {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Mã accessToken sai. Vui lòng nhập lại!',
            icon: 'report_problem',
          });
        } else {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Lỗi hệ thống! Vui lòng liên hệ admin.',
            icon: 'report_problem',
          });
        }
      } finally {
        $q.loading.hide();
      }
    }

    async function checkIsLogin() {
      try {
        let token = localStorage.getItem('jwt');
        // // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let responseContent = await api.post('/users/valid-token');
        // $q.notify({
        //   color: 'green-4',
        //   textColor: 'white',
        //   icon: 'cloud_done',
        //   message: 'Bạn đã đăng nhập sàn rồi!',
        //   position: 'top',
        // });
        if (responseContent.status == 201) {
          message.value = 'Bạn đang kết nối sàn!'
          logined.value = true
          accessToken.value = responseContent.data.accessToken
        }
      } catch (error) {
        if (error.response.data.status === 404 &&
          error.response.data.message === 'token.notFound') {
          accessToken.value = null
        } else if (error.response.data.status === 404 &&
          error.response.data.message === 'token.expiredDate') {
          message.value = 'Mã Token đã hết hạn. Vui lòng vào sàn để tạo Token mới!'
          accessToken.value = null
        }
      }
      // $router.back();
    }

    function removeToken() {
      $q.dialog({
        title: 'Thông báo',
        message: 'Bạn chắc chắn muốn xóa Token ?',
        cancel: true,
        persistent: true,
      })
        .onOk(async () => {
          try {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            let responseContent = await api.post('/users/delete-token');
            if (responseContent.status !== 200 && responseContent.status !== 201) {
              throw new Error();
            }
            $q.notify({
              color: 'green-4',
              position: 'top',
              message: 'Bạn đã xoá Token Thành Công !',
              icon: 'cloud_done',
            });
            accessToken.value = null
            $router.go()
          } catch (error) {
            throw new Error();
          }
        })
        .onCancel(() => {
          return
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
          return
        });
    }
    onBeforeMount(checkIsLogin);
    return {
      accessToken,
      onLogin,
      isPwd,
      logined,
      message,
      removeToken
    };
  },
};
</script>
<style></style>