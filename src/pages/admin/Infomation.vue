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
      <div class="row q-mb-md">
              <div class="col">
                  <q-label class="text-h5-title">Kết quả follow theo bot</q-label>
              </div>
              <div class="col text-right">
                  <q-btn
            size="md"
            class="bg-positive"
            label="Kết thúc"
            @click="unfollowBot"
          />
              </div>
            </div>
        <q-separator color="dark" class="q-mt-md q-mb-md" inset />
        <div class="q-pa-md">
            <div class="row">
                <div :class="`${$q.screen.width > 768 ? 'col-4' : 'col-12'}`">
                    <q-card class="q-md" style="
                                  background: linear-gradient(to right, #5c258d, #4389a2);
                                ">
                      <q-card-section>

                        <div class="text-h5-title"> <q-icon name="account_circle" color="white" size="3rem" /> Loại Tài Khoản</div>
                      </q-card-section>

                      <q-card-section :class="'q-pt-none txt-18'">
                        Tài khoản <q-badge color="info" text-color="black" :label="accountType" />
                      </q-card-section>
                    </q-card>
                </div>
                <div :class="`${$q.screen.width > 768 ? 'col-4' : 'col-12 q-mt-md'}`">
                    <q-card :class="`${$q.screen.width > 768 ? 'q-ml-md' : ''}`" style="
                                  background: linear-gradient(to right, #134e5e, #71b280);
                                ">
                      <q-card-section>
                        <div class="text-h5-title"><q-icon name="account_balance_wallet" color="white" size="3rem" /> Số Dư Ban Đầu</div>
                      </q-card-section>

                      <q-card-section :class="'q-pt-none txt-18'">
                        {{ capital }}
                      </q-card-section>
                    </q-card>
                </div>
                <div :class="`${$q.screen.width > 768 ? 'col-4' : 'col-12 q-mt-md'}`">
                    <q-card :class="`${$q.screen.width > 768 ? 'q-ml-md' : ''}`" style="
                                  background: linear-gradient(to right, #2bc0e4, #eaecc6);
                                ">
                      <q-card-section>
                        <div class="text-h5-title"><q-icon name="account_balance" color="white" size="3rem"/> Số dư hiện tại</div>
                      </q-card-section>

                      <q-card-section :class="'q-pt-none txt-18'">
                        {{ availableBalance }}
                      </q-card-section>
                    </q-card>
                </div>
              </div>

              <div class="row q-mt-md">
                  <div :class="`${$q.screen.width > 768 ? 'col-4' : 'col-12 q-mt-md'}`">
                      <q-card class="q-md" style="
                                      background: linear-gradient(to right, #4776e6, #8e54e9);
                                    ">
                        <q-card-section>
                          <div class="text-h5-title"><q-icon name="paid" color="white" size="3rem"/> Lợi nhuận</div>
                        </q-card-section>

                        <q-card-section :class="'q-pt-none txt-18'">
                          {{ incomeAmount }}
                        </q-card-section>
                      </q-card>
                  </div>
                  <div :class="`${$q.screen.width > 768 ? 'col-4' : 'col-12 q-mt-md'}`">
                      <q-card :class="`${$q.screen.width > 768 ? 'q-ml-md' : ''}`" style="
                                      background: linear-gradient(to right, #dd5e89, #f7bb97);
                                    ">
                        <q-card-section>
                          <div class="text-h5-title"><q-icon name="record_voice_over" color="white" size="3rem"/> Số người theo dõi</div>
                        </q-card-section>
                        <q-card-section :class="'q-pt-none txt-18'">
                          {{ countUser }} người  <q-icon name="info" color="white" @click="goUserFollow" size="1.2rem"/>
                        </q-card-section>
                      </q-card>
                  </div>
                  <div :class="`${$q.screen.width > 768 ? 'col-4' : 'col-12'}`"></div>
              </div>
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

import { useQuasar, date } from 'quasar';
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
    };
  },
};
</script>
