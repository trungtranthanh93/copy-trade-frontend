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
        <h5 class="text-weight-bolder">Màn hình kết quả follow theo bot</h5>

        <div class="row justify-right">
          <q-btn
            size="md"
            class="bg-positive"
            label="Kết thúc"
            @click="unfollowBot"
          />
        </div>
        <q-separator color="dark" class="q-mt-md q-mb-md" inset />
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
            <q-card
              class="q-ml-md"
              style="
                background-image: url(https://moonata.net/img/livebanner.bc9b94b0.png);
              "
            >
              <q-card-section>
                <div class="text-h5">Số người theo dõi</div>
              </q-card-section>
              <q-card-section :class="'q-pt-none'">
                {{ countUser }} người
                <q-btn class="bg-positive q-ml-lg" @click="goUserFollow"
                  >Chi tiết</q-btn
                >
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
                <q-item>
                  <q-item-section avatar>
                    <q-icon color="green" name="thumb_up_off_alt" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Người follow</q-item-label>
                    <q-item-label caption
                      >{{ countUser }} người
                      <q-btn class="bg-positive q-ml-lg" @click="goUserFollow"
                        >Chi tiết</q-btn
                      ></q-item-label
                    >
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </template>
        <q-separator color="dark" class="q-mt-md q-mb-md" inset />
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

import { useQuasar, QSpinnerFacebook, date } from 'quasar';
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
