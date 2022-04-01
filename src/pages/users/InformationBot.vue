<template>
  <!-- <q-layout container style="height: 600px"> -->
  <q-layout class="justify-center">
    <q-page-container class="window-height">
      <div
        class="
          q-pa-md
          fit
          wrap
          justify-center
          items-end
          content-center
          rounded-borders
          relative-position
        "
      >
      <div class="row">
            <div :class="`${$q.screen.width > 768 ? 'col-4' : 'col-12 q-mt-md'}`">
                <q-card class="q-ml-md" style="
                          background: linear-gradient(to right, #dd5e89, #f7bb97);
                        ">
                  <q-card-section>
                    <div class="text-h5-title">
                      <q-icon name="paid" color="white" size="3rem" /> Biệt Danh</div>
                  </q-card-section>

                  <q-card-section :class="'q-pt-none txt-18'">
                    {{ nickName ? nickName : '' }}
                  </q-card-section>
                </q-card>
              </div>
          <div :class="`${$q.screen.width > 768 ? 'col-4' : 'col-12 q-mt-md'}`">
            <q-card class="q-ml-md" style="
                      background: linear-gradient(to right, #5c258d, #4389a2);
                    ">
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
            <q-card class="q-ml-md" style="
                      background: linear-gradient(to right, #134e5e, #71b280);
                    ">
              <q-card-section>
                <div class="text-h5-title">
                  <q-icon name="account_balance_wallet" color="white" size="3rem" /> Số Dư Ban Đầu</div>
              </q-card-section>

              <q-card-section :class="'q-pt-none txt-18'">
                {{ capital }}
              </q-card-section>
            </q-card>
          </div>
          <div :class="`${$q.screen.width > 768 ? 'col-4  q-mt-md' : 'col-12 q-mt-md'}`">
            <q-card class="q-ml-md" style="
                      background: linear-gradient(to right, #2bc0e4, #eaecc6);
                    ">
              <q-card-section>
                <div class="text-h5-title">
                  <q-icon name="account_balance" color="white" size="3rem" /> Số Dư Hiện Tại</div>
              </q-card-section>

              <q-card-section :class="'q-pt-none txt-18'">
                {{ availableBalance }}$
              </q-card-section>
            </q-card>
          </div>
          <div :class="`${$q.screen.width > 768 ? 'col-4 q-mt-md' : 'col-12 q-mt-md'}`">
            <q-card class="q-ml-md" style="
                      background: linear-gradient(to right, #4776e6, #8e54e9);
                    ">
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
            <q-card class="q-ml-md" style="
                      background: linear-gradient(to right, #2980b9, #2c3e50);
                    ">
              <q-card-section>
                <div class="text-h5-title">
                  <q-icon name="flag" color="white" size="3rem" /> Thắng / Thua</div>
              </q-card-section>

              <q-card-section :class="'q-pt-none txt-18'">
                {{ winLose ? winLose : '0/0' }}
              </q-card-section>
            </q-card>
          </div>
        </div>

        <q-separator color="dark" class="q-mt-md q-mb-md" inset />
        <div class="row items-center q-gutter-md justify-center">
          <q-btn
            color="negative"
            icon-right="cancel"
            style=""
            dense
            @click="unfollowBot()"
            >Kết thúc</q-btn
          >
        </div>
        <q-separator color="dark" class="q-mt-md q-mb-md" inset />
        <div class="q-pa-md">
          <q-table
            color="primary"
            flat
            bordered
            title="Kết quả"
            :rows="rows"
            :columns="columns"
            row-key="name"
            :pagination="pagination"
          />
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

import { api } from 'boot/axios';
import { useRouter } from 'vue-router';
import { useQuasar, date, QSpinnerIos } from 'quasar';
import { ref, onMounted, onBeforeMount } from 'vue';
export default {
  setup() {
    const $q = useQuasar();
    const $router = useRouter();
    const capital = ref('');
    const availableBalance = ref('');
    const incomeAmount = ref('');
    const accountType = ref('');
    const rows = ref([]);
    const pagination = ref({
      rowsPerPage: 20, // current rows per page being displayed
    });
    const nickName = ref('');
    const winLose = ref('');

    async function getSportBalance() {
      try {
        let token = localStorage.getItem('jwt');
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await onCheckValid();
        let responseContent = await api.get('/users/spot-balance');
        availableBalance.value = responseContent.data.balance;
        capital.value = `${responseContent.data.capital}$`;
        incomeAmount.value = `${responseContent.data.incomeAmount}$`;
        accountType.value = `${responseContent.data.userType}`;
        console.log(responseContent)
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
        return;
      } catch (error) {
        $router.push('/user/list-master');
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
        $router.push('/user/setting-bot');
      } catch (error) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Có lỗi . Hãy liên hệ admin để được hỗ trợ',
          icon: 'report_problem',
        });
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
    onMounted(async () => {
      $q.loading.show({
        spinner: QSpinnerIos,
        spinnerColor: 'yellow',
        spinnerSize: 140,
        backgroundColor: 'purple',
        messageColor: 'black',
      });
      await getSportBalance(), await getStatistic();
      $q.loading.hide();
    });
    onBeforeMount(async () => {
      let token = localStorage.getItem('jwt');
      // // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      let user = await api.get('/users/get-profile');
      nickName.value = user.data.username;
      if (user.data.botId) {
        return;
      } else {
        $router.back()
      }
      if(user.data.masterId){
        $q.dialog({
        title: 'Thông báo',
        message:
          'Bạn đang Follow CG. Bạn có chắc chắn dừng?',
        cancel: true,
        persistent: true,
      })
        .onOk(() => {
          $router.push('/user/setting-bot');
        })
        .onCancel(() => {
            $router.push('/user/infomation-copy-trader');
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
      }
      if(user.data.groupId) {
        $q.dialog({
          title: 'Thông báo',
          message:
            'Bạn đang Follow theo nhóm CG. Bạn có chắc chắn dừng?',
          cancel: true,
          persistent: true,
        })
          .onOk(() => {
            $router.push('/user/setting-bot');
          })
          .onCancel(() => {
            $router.push('/user/infomation-copy-group');
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      }
    });
    return {
      capital,
      availableBalance,
      incomeAmount,
      unfollowBot,
      columns,
      rows,
      pagination,
      accountType,
      nickName,
      winLose
    };
  },
};
</script>
<style lang="css" scoped>
.txt-18 {
  font-size: 20px;
  font-weight: 600;
}
</style>
