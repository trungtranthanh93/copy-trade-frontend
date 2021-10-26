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
        <template v-if="!$q.platform.is.mobile">
          <div class="row justify-center">
            <q-card
              class="bg-blue-grey-14 q-ml-md"
              style="
                background-image: url(https://moonata.net/img/livebanner.bc9b94b0.png);
              "
            >
              <q-card-section>
                <div class="text-h5">Loại tài khoản</div>
              </q-card-section>

              <q-card-section :class="'q-pt-none'">
                {{ accountType }}
              </q-card-section>
            </q-card>
            <q-card
              class="bg-blue-grey-14 q-ml-md"
              style="
                background-image: url(https://moonata.net/img/livebanner.bc9b94b0.png);
              "
            >
              <q-card-section>
                <div class="text-h5">Số dư ban đầu</div>
              </q-card-section>

              <q-card-section :class="'q-pt-none'">
                {{ capital }}
              </q-card-section>
            </q-card>
            <q-card
              class="q-ml-md"
              style="
                background-image: url(https://moonata.net/img/livebanner.bc9b94b0.png);
              "
            >
              <q-card-section>
                <div class="text-h5">Số dư hiện tại</div>
              </q-card-section>

              <q-card-section :class="'q-pt-none'">
                {{ availableBalance }}
              </q-card-section>
            </q-card>
            <q-card
              class="q-ml-md"
              style="
                background-image: url(https://moonata.net/img/livebanner.bc9b94b0.png);
              "
            >
              <q-card-section>
                <div class="text-h5">Lợi nhuận</div>
              </q-card-section>

              <q-card-section :class="'q-pt-none'">
                {{ incomeAmount }}
              </q-card-section>
            </q-card>
          </div>
        </template>
        <template v-else>
          <div class="q-pa-md row items-start q-gutter-md">
            <q-card class="my-card">
              <q-list>
                <q-item clickable>
                  <q-item-section avatar>
                    <q-icon color="orange" name="payment" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Loại tài khoản</q-item-label>
                    <q-item-label caption>{{ accountType }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section avatar>
                    <q-icon color="primary" name="local_atm" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Số dư ban đầu</q-item-label>
                    <q-item-label caption>{{ capital }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable>
                  <q-item-section avatar>
                    <q-icon color="red" name="price_check" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Số dư hiện tại</q-item-label>
                    <q-item-label caption>{{ availableBalance }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable>
                  <q-item-section avatar>
                    <q-icon color="amber" name="price_change" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Lợi nhuận</q-item-label>
                    <q-item-label caption>{{ incomeAmount }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </template>
        <q-separator color="dark" class="q-mt-md q-mb-md" inset />
        <div v-if="true" class="row items-center q-gutter-md justify-center">
          <q-btn
            color="negative"
            icon-right="cancel"
            style=""
            dense
            @click="unfollow()"
            >Dừng follow</q-btn
          >
          <q-btn
            color="green"
            icon-right="cancel"
            style=""
            dense
            @click="continueFollow()"
            >Tiếp tục</q-btn
          >
        </div>
        <div v-if="true" class="row items-center q-gutter-md justify-center">
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
import { useQuasar, date, QSpinnerFacebook } from 'quasar';
import { ref, onMounted } from 'vue';
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
      rowsPerPage: 10, // current rows per page being displayed
    });
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
        if (responseContent.data.isTakeProfit) {
          $q.dialog({
            title: 'Thông báo',
            message: `Lợi nhuận hiện tại: <span class="text-green">${incomeAmount.value}</span> đã đạt giới hạn [Chốt lãi:<span class="text-green">${incomeAmount.value}</span>]. Hệ thống copy trade đã tự động dừng`,
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
            message: `Lợi nhuận hiện tại: <span class="text-red">${incomeAmount.value}</span> đã đạt giới hạn [Cắt lỗ: <span class="text-red">${incomeAmount.value}</span>]. Hệ thống copy trade đã tự động dừng`,
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
        let user = await api.get('/users/get-profile');
        console.log(user);
        if (!user.data.masterId) {
          $router.push('/user/list-master');
          return;
        }
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
    async function unfollow() {
      try {
        let token = localStorage.getItem('jwt');
        // // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        await api.put('users/unfolow');
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Đã dừng follow chuyên gia',
          position: 'top',
        });
        $router.push('/user/list-master');
      } catch (error) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Có lỗi . Hãy liên hệ admin để được hỗ trợ',
          icon: 'report_problem',
        });
      }
    }
    async function continueFollow() {
      let token = localStorage.getItem('jwt');
      // // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      let user = await api.get('/users/get-profile');
      $router.push('/user/setting-follow/' + user.data.masterId);
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
        spinner: QSpinnerFacebook,
        spinnerColor: 'yellow',
        spinnerSize: 140,
        backgroundColor: 'purple',
        messageColor: 'black',
      });
      await getSportBalance(), await getStatistic();
      $q.loading.hide();
    });
    return {
      capital,
      availableBalance,
      incomeAmount,
      unfollow,
      continueFollow,
      columns,
      rows,
      pagination,
      accountType,
    };
  },
};
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
