<template>
  <!-- <q-layout container style="height: 600px"> -->
  <q-layout class="justify-center">
    <q-page-container class="window-height">
      <div class="
          q-pa-md
          fit
          wrap
          justify-center
          items-end
          content-center
          rounded-borders
          relative-position
        ">
        <q-label class="text-h6">Màn Hình {{ titleScreen }}</q-label>
          <q-separator class="q-mb-md" />
            <div class="q-md">
                <div class="row">
                    <div :class="`${$q.screen.width > 768 ? 'col-4' : 'col-12 q-mt-md'}`">
                            <q-card class="q-md" style="background: linear-gradient(to right, #2980b9, #2c3e50);">
                                <q-card-section>
                                    <div class="text-h5-title">
                                        <q-icon name="assignment_ind" color="white" size="3rem" /> Biệt Danh Chuyên Gia
                                    </div>
                                </q-card-section>

                                <q-card-section :class="'q-pt-none txt-18'">
                                    {{ nickName }}
                                </q-card-section>
                            </q-card>
                        </div>
                <div :class="`${$q.screen.width > 768 ? 'col-4' : 'col-12 q-mt-md'}`">
                    <q-card :class="`${$q.screen.width > 768 ? 'q-ml-md' : ''}`" style="background: linear-gradient(to right, #5c258d, #4389a2);">
                        <q-card-section>

                            <div class="text-h5-title">
                                <q-icon name="account_circle" color="white" size="3rem" /> Loại Tài Khoản</div>
                        </q-card-section>

                        <q-card-section :class="'q-pt-none txt-18'">
                            Tài khoản
                            <q-badge color="info" text-color="black" :label="accountType" />
                        </q-card-section>
                    </q-card>
                </div>
                <div :class="`${$q.screen.width > 768 ? 'col-4' : 'col-12 q-mt-md'}`">
                    <q-card :class="`${$q.screen.width > 768 ? 'q-ml-md' : ''}`" style="background: linear-gradient(to right, #134e5e, #71b280);">
                        <q-card-section>
                            <div class="text-h5-title">
                                <q-icon name="account_balance_wallet" color="white" size="3rem" /> Số Dư Ban Đầu
                            </div>
                        </q-card-section>

                        <q-card-section :class="'q-pt-none txt-18'">
                            {{ capital }}
                        </q-card-section>
                    </q-card>
                </div>
                <div :class="`${$q.screen.width > 768 ? 'col-4 q-mt-md' : 'col-12 q-mt-md'}`">
                    <q-card class="q-md" style="background: linear-gradient(to right, #2bc0e4, #eaecc6);">
                        <q-card-section>
                            <div class="text-h5-title">
                                <q-icon name="account_balance" color="white" size="3rem" /> Số Dư Hiện Tại</div>
                        </q-card-section>

                        <q-card-section :class="'q-pt-none txt-18'">
                            {{ availableBalance }}
                        </q-card-section>
                    </q-card>
                </div>
                <div :class="`${$q.screen.width > 768 ? 'col-4 q-mt-md' : 'col-12 q-mt-md'}`">
                    <q-card :class="`${$q.screen.width > 768 ? 'q-ml-md' : ''}`" style="background: linear-gradient(to right, #4776e6, #8e54e9);">
                        <q-card-section>
                            <div class="text-h5-title">
                                <q-icon name="paid" color="white" size="3rem" /> Lợi Nhuận</div>
                        </q-card-section>

                        <q-card-section :class="'q-pt-none txt-18'">
                            {{ incomeAmount }}
                        </q-card-section>
                    </q-card>
                </div>
                <div :class="`${$q.screen.width > 768 ? 'col-4 q-mt-md' : 'col-12 q-mt-md'}`">
                    <q-card :class="`${$q.screen.width > 768 ? 'q-ml-md' : ''}`" style="background: linear-gradient(to right, #dd5e89, #f7bb97);">
                        <q-card-section>
                            <div class="text-h5-title">
                                <q-icon name="record_voice_over" color="white" size="3rem" /> Số Người Theo Dõi
                            </div>
                        </q-card-section>
                        <q-card-section :class="'q-pt-none txt-18'">
                            {{ countUser }} người
                            <q-icon name="info" color="white" @click="goUserFollow" size="1.2rem" />
                        </q-card-section>
                    </q-card>
                </div>

            </div>
            </div>

        <q-separator color="dark" class="q-mt-md q-mb-md" inset />

        <div class="row">
          <div :class="`${$q.screen.width > 768 ? 'col-4' : 'col-12'}`">
              <q-card :class="{
                              'q-pa-md q-ma-none no-shadow': true,
                              'full-width': !$q.platform.is.mobile,
                            }" align="left">
                            <div class="row">
                              <div class="col"><q-label class="text-h5-title">Cài Đặt Lệnh</q-label></div>
                              <div class="col text-right"><q-btn v-on:click="setLock" color="primary" :icon="locked ? 'lock_open' : 'lock'" :label="!locked ? 'Khoá' : 'Mở khoá'" /></div>
                            </div>
                            <q-separator class="q-mt-md" />
                <q-card-section>
                      <div class="col">
                          <q-input outlined input-class="text-right" type="text" v-model="money" label="Nhập số % vốn vào lệnh" lazy-rules suffix="%" :rules="[
                                          (val) =>
                                            (val !== null && val !== '') || 'Hãy điền số % vốn đánh',
                                          (val) => (val >=1 && val <= 30) || 'Hãy điền số % vốn từ 1 đến 30',
                                        ]">
                          </q-input>
                        </div>
                    <div class="col">
                      <q-btn size="21px" class="q-px-xl q-py-xs bg-green-13 q-mb-md" style="width: 100%" label="Tăng" icon-right="trending_up"
                        v-on:click="onSubmit(`UP`)" :disable="isDisableUp" />
                    </div>

                    <div class="col">
                      <q-btn size="21px" class="q-px-xl q-py-xs bg-red-13 q-mb-md" style="width: 100%" label="Giảm" icon-right="trending_down"
                        v-on:click="onSubmit(`DOWN`)" :disable="isDisableDown" />
                    </div>
                </q-card-section>
              </q-card>
          </div>
          <div :class="`${$q.screen.width > 768 ? 'col-8' : 'col-12 q-mt-md'}`">
              <div :class="`${$q.screen.width > 768 ? 'q-pl-md' : ''}`">
                  <q-table color="primary" flat bordered title="Kết Quả" :rows="rows" :columns="columns" row-key="name"
                    :pagination="pagination" />
                </div>
          </div>
        </div>

      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
  const columns = [
    { name: 'stt', align: 'center', label: 'STT', field: 'stt' },
    {
      name: 'createdDatetime',
      align: 'center',
      label: 'Thời gian',
      field: 'createdDatetime',
    },
    { name: 'betType', align: 'center', label: 'Lệnh đánh', field: 'betType' },
    {
      name: 'betAmount',
      align: 'center',
      label: 'Số tiền',
      field: 'betAmount',
    },
    { name: 'winAmount', align: 'center', label: 'Kết quả', field: 'winAmount' },
  ];

  import { useQuasar, QSpinnerIos, date } from 'quasar';
  import { ref, onBeforeMount, onMounted } from 'vue';
  import { api } from 'boot/axios';
  import { useRouter } from 'vue-router';

  export default {
    setup() {
      const $q = useQuasar();
      const $router = useRouter();
      const putOptions = ref('UP');
      const money = ref(null);
      const loading = ref(false);
      const capital = ref('');
      const availableBalance = ref('');
      const incomeAmount = ref('');
      const accountType = ref('');
      const countUser = ref('');
      const rows = ref([]);
      const isDisableUp = ref(false);
      const isDisableDown = ref(false);
      const nickName = ref('');
      const titleScreen = ref('');
      const locked = ref('');

      async function getSportBalance() {
        try {
          let token = localStorage.getItem('jwt');
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          let responseContent = await api.get('/users/spot-balance');
          availableBalance.value = `${responseContent.data.balance} $`;
          capital.value = `${responseContent.data.capital} $`;
          incomeAmount.value = `${responseContent.data.incomeAmount}$`;
          accountType.value = `${responseContent.data.userType}`;
        } catch (error) {
          capital.value = 'Chưa có thông tin';
          availableBalance.value = 'Chưa có thông tin';
          incomeAmount.value = 'Chưa có thông tin';
        }
      }
      async function getCountUser() {
        let token = localStorage.getItem('jwt');
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let responseContent = await api.get('/users/count-user');
        countUser.value = responseContent.data.folowingUser;
      }
      function logout() {
        $router.push('/logout');
      }
      async function onSubmit(value) {
        $q.loading.show({
          spinner: QSpinnerIos,
          spinnerColor: 'yellow',
          spinnerSize: 140,
          backgroundColor: 'purple',
          message: 'Đang xử lý ....',
          messageColor: 'black',
        });
        try {
          let data = {
            betType: value,
            betAmount: Number(money.value),
          };
          let response;
          if ($router.currentRoute.value.name === 'trader-group') {
            response = await api.post(`/trade/v1/group/${$router.currentRoute.value.params.id}/bet`, data);
          } else {
            response = await api.post('/trade/v1/bet', data);
          }
          if (response.data.ok === false) {
            if (response.data.d ?.err_code === 'betsession_is_invalid') {
              $q.notify({
                color: 'negative',
                position: 'top',
                message:
                  'Chưa đến thời điểm đánh lệnh. Hãy đánh đúng thời điểm đánh lệnh',
                icon: 'report_problem',
              });
            } else {
              $q.notify({
                color: 'negative',
                position: 'top',
                message: response.data.m,
                icon: 'report_problem',
              });
            }
          } else if (response.data.ok === true) {
            $q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Đánh lệnh thành công',
              position: 'top',
            });
            if (value === 'UP') {
              isDisableUp.value = true;
              $q.loading.hide();
              await wait(30);
              isDisableUp.value = false;
            } else if (value === 'DOWN') {
              isDisableDown.value = true;
              $q.loading.hide();
              await wait(30);
              isDisableDown.value = false;
            }
          }
        } catch (error) {
          if (
            error.response.status === 400 &&
            error.response.data.message === 'notEnough.betAmount'
          ) {
            $q.notify({
              color: 'negative',
              position: 'top',
              message: 'Đặt lệnh thất bại, lệnh phải bằng tối thiểu 0.8% vốn',
              icon: 'report_problem',
            });
          } else {
            $q.notify({
              color: 'negative',
              position: 'top',
              message: 'Chưa đánh được lệnh. Hãy thử lại hoặc liên hệ admin',
              icon: 'report_problem',
            });
          }
        } finally {
          $q.loading.hide();
        }
      }
      async function onCheckValid() {
        try {
          let token = localStorage.getItem('jwt');
          // // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          await api.post('/users/valid-token');
          let user = await api.get('/users/get-profile');
          nickName.value = user.data.username;
          locked.value = user.data.isLocked;
          if (user.data.botId) {
            $q
              .dialog({
                title: 'Thông báo',
                message: 'Bạn đang follow theo bot. Bạn chắc chắn muốn dừng follow bot và tự đánh lệnh ?',
                html: true,
                cancel: true,
                persistent: true,
              })
              .onOk(async () => {
                await api.put('/user-setting/unfolow-bot');
              })
              .onCancel(() => {
                $router.push('/admin/information-bot');
              });
          }
        } catch (error) {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Hãy đăng nhập vào sàn trước khi đánh lệnh',
            icon: 'report_problem',
          });
          $router.push('/admin/login-exchange');
        }
      }
      async function wait(timeout) {
        return new Promise((resolve) => setTimeout(resolve, timeout * 1000));
      }
      async function getStatistic() {
        let token = localStorage.getItem('jwt');
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let responseContent = await api.get('/statistics');
        let data = responseContent.data;
        let index = 1;
        rows.value = data.map((obj) => {
          obj.stt = index;
          index++;
          if (obj.winAmount === 0) {
            obj.winAmount = '$0';
          } else {
            obj.winAmount = `+$${obj.winAmount}`;
          }
          obj.createdDatetime = date.formatDate(
            Number(obj.createdDatetime),
            'DD/MM/YYYY HH:mm:ss'
          );
          return obj;
        });
      }
      function goUserFollow() {
        $router.push('/admin/user-follow');
      }
      function getTitleScreen() {
        titleScreen.value = localStorage.getItem('title-screen');
      }

      async function setLock(){
        $q.loading.show({
          spinner: QSpinnerIos,
          spinnerColor: 'yellow',
          spinnerSize: 140,
          backgroundColor: 'purple',
          message: 'Đang xử lý ....',
          messageColor: 'black',
        });
        try {
          let token = localStorage.getItem('jwt');
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          let response = await api.put('/users/lock', {
            type: !locked.value ? 'lock' : 'unlock'
          });
          if(response.status === 200) {
            $q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: `Bạn đã ${!locked.value ? 'khoá' : 'mở khoá'} follow thành công!`,
              position: 'top',
            });
            locked.value = response.data.isLocked
          }
        } catch (error) {
          console.log(error);
        } finally {
          $q.loading.hide();
        }


      }
      onBeforeMount(onCheckValid);
      onMounted(async () => {
        await getSportBalance(), await getCountUser(), await getStatistic(), getTitleScreen();
      });
      return {
        putOptions,
        money,
        loading,
        onSubmit,
        capital,
        availableBalance,
        incomeAmount,
        columns,
        rows,
        countUser,
        goUserFollow,
        accountType,
        isDisableUp,
        isDisableDown,
        logout,
        nickName,
        titleScreen,
        locked,
        setLock
      };
    },
    updated(){
        this.titleScreen = localStorage.getItem('title-screen');
    }
  };
</script>

<style>
.txt-18 {
  font-size: 20px;
  font-weight: 600;
}
</style>