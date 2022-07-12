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
        <div class="row q-mb-md">
          <div class="col">
            <q-label class="text-h5-title">Kết Quả Follow Theo BOT</q-label>
          </div>
        </div>
        <q-separator color="dark" class="q-mt-md q-mb-md" inset />
        <div>
          <div class="row">
            <div class="col-12 col-lg-4 col-md-6">
              <q-card class="q-ma-sm" style="background: linear-gradient(to right, #2980b9, #2c3e50);">
                <div class="q-pt-md q-pb-md">
                  <div class="row items-center">
                    <div class="col-3 q-pl-md">
                      <q-icon name="assignment_ind" color="white" size="4rem" />
                    </div>
                    <div class="col-9">
                      <h6 class="text-muted font-semibold q-ma-sm">Biệt Danh </h6>
                      <h4 class="font-extrabold mb-0 q-ma-sm nickname">{{ nickName || '' }}</h4>
                    </div>
                  </div>
                </div>
              </q-card>
            </div>
            <div class="col-12 col-lg-4 col-md-6">
              <q-card class="q-ma-sm"
                style="background: linear-gradient(to right, #5c258d, #4389a2);">
                <div class="q-pt-md q-pb-md">
                  <div class="row items-center">
                    <div class="col-3 q-pl-md">
                      <q-icon name="account_circle" color="white" size="4rem" />
                    </div>
                    <div class="col-9">
                      <h6 class="text-muted font-semibold q-ma-sm">Loại Tài Khoản</h6>
                      <h4 class="font-extrabold mb-0 q-ma-sm">{{ accountType || '' }}</h4>
                    </div>
                  </div>
                </div>
              </q-card>
            </div>
            <div class="col-12 col-lg-4 col-md-6">
              <q-card class="q-ma-sm"
                style="background: linear-gradient(to right, #134e5e, #71b280);">
                <div class="q-pt-md q-pb-md">
                  <div class="row items-center">
                    <div class="col-3 q-pl-md">
                      <q-icon name="paid" color="white" size="4rem" />
                    </div>
                    <div class="col-9">
                      <h6 class="text-muted font-semibold q-ma-sm">Số Dư Ban Đầu</h6>
                      <h4 class="font-extrabold mb-0 q-ma-sm">{{ capital || ''  }}</h4>
                    </div>
                  </div>
                </div>
              </q-card>
            </div>
            <div class="col-12 col-lg-4 col-md-6">
              <q-card class="q-ma-sm"
                style="background: linear-gradient(to right, #2bc0e4, #eaecc6);">
                <div class="q-pt-md q-pb-md">
                  <div class="row items-center">
                    <div class="col-3 q-pl-md">
                      <q-icon name="account_balance" color="white" size="4rem" />
                    </div>
                    <div class="col-9">
                      <h6 class="text-muted font-semibold q-ma-sm">Số Dư Hiện Tại</h6>
                      <h4 class="font-extrabold mb-0 q-ma-sm">{{ availableBalance || ''  }}$</h4>
                    </div>
                  </div>
                </div>
              </q-card>
            </div>
            <div class="col-12 col-lg-4 col-md-6">
              <q-card class="q-ma-sm"
                style="background: linear-gradient(to right, #4776e6, #8e54e9);">
                <div class="q-pt-md q-pb-md">
                  <div class="row items-center">
                    <div class="col-3 q-pl-md">
                      <q-icon name="savings" color="white" size="4rem" />
                    </div>
                    <div class="col-9">
                      <h6 class="text-muted font-semibold q-ma-sm">Lợi Nhuận</h6>
                      <h4 class="font-extrabold mb-0 q-ma-sm">{{ incomeAmount || ''  }}</h4>
                    </div>
                  </div>
                </div>
              </q-card>
            </div>
            <div class="col-12 col-lg-4 col-md-6">
              <q-card class="q-ma-sm"
                style="background: linear-gradient(to right, #dd5e89, #f7bb97);">
                <div class="q-pt-md q-pb-md">
                  <div class="row items-center">
                    <div class="col-3 q-pl-md">
                      <q-icon name="record_voice_over" color="white" size="4rem" />
                    </div>
                    <div class="col-9">
                      <h6 class="text-muted font-semibold q-ma-sm">Số Người Theo Dõi</h6>
                      <h4 class="font-extrabold mb-0 q-ma-sm">{{ countUser || ''  }} Người
                        <q-icon name="info" color="white" @click="goUserFollow" size="2rem" />
                      </h4>
                    </div>
                  </div>
                </div>
              </q-card>
            </div>
          </div>
        </div>
        <q-separator color="dark" class="q-mt-md q-mb-md" inset />
        <div class="row items-center q-gutter-md justify-center">
          <q-btn size="md" class="bg-positive" label="Kết thúc" @click="unfollowBot" />
        </div>
        <q-separator color="dark" class="q-mt-md q-mb-md" inset />
        <div class="q-pa-md">
          <q-table color="primary" flat bordered title="Kết quả" :rows="rows" :columns="columns" row-key="name"
            :pagination="pagination" />
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

  import { useQuasar, date } from 'quasar';
  import { ref, onBeforeMount, onMounted } from 'vue';
  import { api } from 'boot/axios';
  import { useRouter } from 'vue-router';
  const sessionBot = -10;
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
      const pagination = ref({
        rowsPerPage: 20, // current rows per page being displayed
      });
      const nickName = ref('');

      async function getSportBalance() {
        try {
          let token = localStorage.getItem('jwt');
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          let responseContent = await api.get('/users/spot-balance');
          availableBalance.value = responseContent.data.balance;
          capital.value = `${responseContent.data.capital}$`;
          incomeAmount.value = `${responseContent.data.incomeAmount}$`;
          accountType.value = `${responseContent.data.userType}`;
          if (responseContent.data.isTakeProfit) {
            $q.dialog({
              title: 'Thông báo',
              message: `Lợi nhuận hiện tại: <span class="text-green">${incomeAmount.value}</span> đã đạt giới hạn [Chốt lãi:<span class="text-green">${incomeAmount.value}</span>]. Hệ thống bot trade đã tự động dừng`,
              html: true,
            })
              .onOk(() => {
                return;
              })
              .onCancel(() => {
                return;
              })
              .onDismiss(() => {
                // console.log('I am triggered on both OK and Cancel')
              });
            return;
          } else if (responseContent.data.isStopLoss) {
            $q.dialog({
              title: 'Thông báo',
              message: `Lợi nhuận hiện tại: <span class="text-red">${incomeAmount.value}</span> đã đạt giới hạn [Cắt lỗ: <span class="text-red">${incomeAmount.value}</span>]. Hệ thống bot trade đã tự động dừng`,
              html: true,
            })
              .onOk(() => {
                return;
              })
              .onCancel(() => {
                return;
              })
              .onDismiss(() => {
                // console.log('I am triggered on both OK and Cancel')
              });
          }
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
      async function onCheckValid() {
        try {
          let token = localStorage.getItem('jwt');
          // // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          let user = await api.get('/users/get-profile');
          nickName.value = user.data.username;
          if (user.data.botId == sessionBot) {
            $q.dialog({
              title: 'Thông báo',
              message: 'Số phiên đạt giới hạn. Cấu hình đã tạm dừng',
              html: true,
            })
              .onOk(() => {
                $router.push('/admin/setting-bot');
                return;
              })
              .onCancel(() => {
                return;
              })
              .onDismiss(() => {
                // console.log('I am triggered on both OK and Cancel')
              });
            return;
          }
          if (!user.data.botId) {
            $router.push('/admin/setting-bot');
          }
          await api.post('/users/valid-token');
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
      onBeforeMount(onCheckValid);
      onMounted(async () => {
        await getSportBalance(), await getCountUser(), await getStatistic();

        setInterval(async () => {
          await getStatistic();
        }, 20000);
      });
      async function unfollowBot() {
        try {
          let token = localStorage.getItem('jwt');
          // // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          await api.put('user-setting/unfolow-bot');
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Đã dừng follow bot',
            position: 'top',
          });
          $router.push('/admin/setting-bot');
        } catch (error) {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Có lỗi . Hãy liên hệ admin để được hỗ trợ',
            icon: 'report_problem',
          });
        }
      }
      return {
        putOptions,
        money,
        loading,
        capital,
        availableBalance,
        incomeAmount,
        columns,
        rows,
        countUser,
        goUserFollow,
        accountType,
        unfollowBot,
        pagination,
        nickName
      };
    },
  };
</script>
<style scoped>
</style>