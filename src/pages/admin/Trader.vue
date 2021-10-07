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
        <div>
          <img class="relative-top-left" src="logo.png" style="height: 80px" />
        </div>
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

        <div class="row justify-center items-center">
          <q-card
            square
            :class="{
              'q-pa-md q-ma-none no-shadow': true,
              'full-width': !$q.platform.is.mobile,
            }"
            :style="{ 'width: 320px': $q.platform.is.mobile }"
            align="center"
          >
            <q-card-section>
              <div
                :class="{
                  row: !$q.platform.is.mobile,
                  'justify-center items-center': true,
                }"
              >
                <div class="col">
                  <q-btn
                    size="22px"
                    class="q-px-xl q-py-xs bg-green-13 q-mb-md"
                    label="Tăng"
                    icon-right="trending_up"
                    v-on:click="onSubmit(`UP`)"
                    :disable="isDisableUp"
                  />
                </div>
                <div class="col">
                  <q-input
                    outlined
                    input-class="text-right"
                    type="number"
                    v-model="money"
                    label="Nhập số tiền đánh"
                    lazy-rules
                    style="width: 160px"
                    suffix="$"
                    :rules="[
                      (val) =>
                        (val !== null && val !== '') || 'Hãy điền số tiền đánh',
                      (val) => val > 0 || 'Hãy điền số lớn hơn 0',
                    ]"
                  >
                  </q-input>
                </div>
                <div class="col">
                  <q-btn
                    size="22px"
                    class="q-px-xl q-py-xs bg-red-13 q-mb-md"
                    label="Giảm"
                    icon-right="trending_down"
                    v-on:click="onSubmit(`DOWN`)"
                    :disable="isDisableDown"
                  />
                </div>
              </div>
            </q-card-section>
            <q-card-section> </q-card-section>
          </q-card>
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
    const isDisableUp = ref(false);
    const isDisableDown = ref(false);
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
    async function onSubmit(value) {
      $q.loading.show({
        spinner: QSpinnerFacebook,
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
        let response = await api.post('/trade/v1/bet', data);
        if (response.data.ok === false) {
          if (response.data.d?.err_code === 'betsession_is_invalid') {
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
          if(value === 'UP') {
            isDisableUp.value = true
            $q.loading.hide();
            await wait(30);
            isDisableUp.value = false
          } else if (value === 'DOWN') {
            isDisableDown.value = true
            $q.loading.hide();
            await wait(30);
            isDisableDown.value = false
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
      } catch (error) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Hãy đăng nhập vào sàn trước khi đánh lệnh',
          icon: 'report_problem',
        });
        console.log(1);
        $router.push('/admin/login-exchange');
      }
    }
    async function wait(timeout) {
      return new Promise((resolve) => setTimeout(resolve,timeout*1000));
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
      isDisableDown
    };
  },
};
</script>
