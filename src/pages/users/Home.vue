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
        <div class="row">
          <div class="col-12 col-lg-3 col-md-6">
            <q-card class="q-ma-sm"
              style="background: linear-gradient(to right, #2980b9, #2c3e50);">
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
          <!-- <div class="col-12 col-lg-4 col-md-6">
            <q-card class="q-ma-sm"
              style="background: linear-gradient(to right, #2980b9, #2c3e50);">
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
          </div> -->
          <!-- <div class="col-12 col-lg-4 col-md-6">
            <q-card class="q-ma-sm"
              style="background: linear-gradient(to right, #134e5e, #71b280);">
              <div class="q-pt-md q-pb-md">
                <div class="row items-center">
                  <div class="col-3 q-pl-md">
                    <q-icon name="paid" color="white" size="4rem" />
                  </div>
                  <div class="col-9">
                    <h6 class="text-muted font-semibold q-ma-sm">Số Dư Ban Đầu</h6>
                    <h4 class="font-extrabold mb-0 q-ma-sm">{{ capital || '' }}</h4>
                  </div>
                </div>
              </div>
            </q-card>
          </div> -->
          <div class="col-12 col-lg-3 col-md-6">
            <q-card class="q-ma-sm"
              style="background: linear-gradient(to right, #2bc0e4, #eaecc6);">
              <div class="q-pt-md q-pb-md">
                <div class="row items-center">
                  <div class="col-3 q-pl-md">
                    <q-icon name="account_balance" color="white" size="4rem" />
                  </div>
                  <div class="col-9">
                    <h6 class="text-muted font-semibold q-ma-sm">Số Dư Hiện Tại
                      <q-badge>{{ accountType || '' }}</q-badge>
                    </h6>
                    <h4 class="font-extrabold mb-0 q-ma-sm">{{ availableBalance || '' }}$</h4>
                  </div>
                </div>
              </div>
            </q-card>
          </div>
          <div class="col-12 col-lg-3 col-md-6">
            <q-card class="q-ma-sm"
              style="background: linear-gradient(to right, #4776e6, #8e54e9);">
              <div class="q-pt-md q-pb-md">
                <div class="row items-center">
                  <div class="col-3 q-pl-md">
                    <q-icon name="savings" color="white" size="4rem" />
                  </div>
                  <div class="col-9">
                    <h6 class="text-muted font-semibold q-ma-sm">Lợi Nhuận</h6>
                    <h4 class="font-extrabold mb-0 q-ma-sm">{{ incomeAmount || 0 }}$</h4>
                  </div>
                </div>
              </div>
            </q-card>
          </div>
          <div class="col-12 col-lg-3 col-md-6">
            <q-card class="q-ma-sm"
              style="background: linear-gradient(to right, #dd5e89, #f7bb97);">
              <div class="q-pt-md q-pb-md">
                <div class="row items-center">
                  <div class="col-3 q-pl-md">
                    <q-icon name="import_export" color="white" size="4rem" />
                  </div>
                  <div class="col-9">
                    <h6 class="text-muted font-semibold q-ma-sm">Thắng / Thua</h6>
                    <h4 class="font-extrabold mb-0 q-ma-sm">{{ winOrderQuan ? winOrderQuan: '0'}} /
                      {{loseOrderQuan? loseOrderQuan : '0' }}</h4>
                  </div>
                </div>
              </div>
            </q-card>
          </div>
        </div>
        <q-separator color="dark" class="q-mt-md q-mb-md" inset />
        <MontlyExport @updateWinLose="updateWinLose" />
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

  import { api } from 'boot/axios';
  import { useRouter } from 'vue-router';
  import { useQuasar, date } from 'quasar';
  import { ref, onMounted, onBeforeMount } from 'vue';
  import MontlyExport from '../MontlyExport.vue';

  export default {
    components: {
      MontlyExport
    },
    setup() {
      const $q = useQuasar();
      const $router = useRouter();
      const capital = ref('');
      const availableBalance = ref('');
      const incomeAmount = ref('');
      const accountType = ref('');
      const rows = ref([]);
      const isCopyTradeScreen = ref(true);
      const pagination = ref({
        rowsPerPage: 10, // current rows per page being displayed
      });
      const nickName = ref('');
      const winOrderQuan = ref('');
      const loseOrderQuan = ref('');
      async function getSportBalance() {
        try {
          let token = localStorage.getItem('jwt');
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          await onCheckValid();
          let responseContent = await api.get('/users/spot-balance');
          availableBalance.value = responseContent.data.balance;
          capital.value = `${responseContent.data.capital}$`;
          // incomeAmount.value = `${responseContent.data.incomeAmount}$`;
          accountType.value = `${responseContent.data.userType}`;
          // if (responseContent.data.isTakeProfit) {
          //   $q.dialog({
          //     title: 'Thông báo',
          //     message: `Lợi nhuận hiện tại: <span class="text-green">${incomeAmount.value}</span> đã đạt giới hạn [Chốt lãi:<span class="text-green">${incomeAmount.value}</span>]. Hệ thống copy trade đã tự động dừng`,
          //     html: true,
          //   })
          //     .onOk(() => {
          //       return;
          //     })
          //     .onCancel(() => {
          //       return;
          //     })
          //     .onDismiss(() => {
          //       // console.log('I am triggered on both OK and Cancel')
          //     });
          //   return;
          // } else if (responseContent.data.isStopLoss) {
          //   $q.dialog({
          //     title: 'Thông báo',
          //     message: `Lợi nhuận hiện tại: <span class="text-red">${incomeAmount.value}</span> đã đạt giới hạn [Cắt lỗ: <span class="text-red">${incomeAmount.value}</span>]. Hệ thống copy trade đã tự động dừng`,
          //     html: true,
          //   })
          //     .onOk(() => {
          //       return;
          //     })
          //     .onCancel(() => {
          //       return;
          //     })
          //     .onDismiss(() => {
          //       // console.log('I am triggered on both OK and Cancel')
          //     });
          // }
          return;
        } catch (error) {
          // $router.push('/user/list-master');
        }
      }
      async function onCheckValid() {
        try {
          let token = localStorage.getItem('jwt');
          // // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          await api.post('/users/valid-token');
          return true;
        } catch (error) {
          if (
            error.response.data.status === 404 &&
            error.response.data.message === 'token.notFound'
          ) {
            $q.dialog({
              title: 'Thông báo',
              message:
                'Hãy đăng nhập vào sàn trước khi follow theo chuyên gia.Nhấn OK để chuyển sang màn hình đăng nhập sàn',
              cancel: true,
              persistent: true,
            })
              .onOk(() => {
                $router.push('/user/login-exchange');
              })
              .onCancel(() => {
                return;
              })
              .onDismiss(() => {
                // console.log('I am triggered on both OK and Cancel')
              });
          } else {
            $q.dialog({
              title: 'Thông báo',
              message:
                'Bạn đã đăng nhập trên sàn chính nên bạn cần đăng nhập lại sàn ở đây.Nhấn OK để chuyển sang màn hình đăng nhập sàn',
              cancel: true,
              persistent: true,
            })
              .onOk(() => {
                $router.push('/user/login-exchange');
              })
              .onCancel(() => {
                return;
              })
              .onDismiss(() => {
                // console.log('I am triggered on both OK and Cancel')
              });
          }
          return false;
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
      function updateWinLose(data) {
        winOrderQuan.value = data.winOrderQuan,
        loseOrderQuan.value = data.loseOrderQuan,
        incomeAmount.value = data.monthlyTotalIncome
      }
      onMounted(async () => {
        // $q.loading.show({
        //   spinner: QSpinnerIos,
        //   spinnerColor: 'yellow',
        //   spinnerSize: 140,
        //   backgroundColor: 'purple',
        //   messageColor: 'black',
        // });
        await getSportBalance(),
          await getStatistic();
        // $q.loading.hide();
      });
      onBeforeMount(async () => {
        let token = localStorage.getItem('jwt');
        // // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let user = await api.get('/users/get-profile');
        nickName.value = user.data.username;
        // if (user.data.masterId) {
        //   return;
        // }
        // if (user.data.botId) {
        //   $q.dialog({
        //     title: 'Thông báo',
        //     message:
        //       'Bạn đang follow theo bot. Bạn chắc chắn muốn dừng follow bot và follow theo chuyên gia?',
        //     cancel: true,
        //     persistent: true,
        //   })
        //     .onOk(async () => {
        //       await api.put('/user-setting/unfolow-bot');
        //       $router.push('/user/list-master');
        //     })
        //     .onCancel(() => {
        //       $router.push('/user/information-bot');
        //     })
        //     .onDismiss(() => {
        //       // console.log('I am triggered on both OK and Cancel')
        //     });
        // }
        // if(user.data.groupId) {
        //           $q.dialog({
        //     title: 'Thông báo',
        //     message:
        //       'Bạn đang follow theo nhóm chuyên gia. Bạn chắc chắn muốn dừng follow nhóm chuyên gia và follow theo chuyên gia?',
        //     cancel: true,
        //     persistent: true,
        //   })
        //     .onOk(async () => {
        //       await api.put('/user-setting/unfolow');
        //       $router.push('/user/list-master');
        //     })
        //     .onCancel(() => {
        //       $router.push('/user/infomation-copy-group');
        //     })
        //     .onDismiss(() => {
        //       // console.log('I am triggered on both OK and Cancel')
        //     });
        // }
        //   $router.push('/user/list-master');
      });
      return {
        capital,
        availableBalance,
        incomeAmount,
        columns,
        rows,
        pagination,
        accountType,
        isCopyTradeScreen,
        nickName,
        winOrderQuan,
        loseOrderQuan,
        updateWinLose
      };
    },
  };
</script>
<style scoped>
</style>