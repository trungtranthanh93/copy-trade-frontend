<template>
  <div class="column">
    <div class="row items-center q-gutter-md">
      <q-card class="my-card bg-primary">
        <q-card-section>
          <div class="text-h6">Số dư ban đầu</div>
        </q-card-section>

        <q-card-section :class="'q-pt-none'">
          {{ capital }}
        </q-card-section>
      </q-card>
      <q-card class="my-card bg-indigo-14">
        <q-card-section>
          <div class="text-h6">Số dư hiện tại</div>
        </q-card-section>

        <q-card-section :class="'q-pt-none'">
          {{ availableBalance }}
        </q-card-section>
      </q-card>
      <q-card class="my-card bg-purple-14">
        <q-card-section>
          <div class="text-h6">Lợi nhuận</div>
        </q-card-section>

        <q-card-section :class="'q-pt-none'">
          {{ incomeAmount }}
        </q-card-section>
      </q-card>
    </div>
    <q-separator color="black q-mt-md q-mb-md" inset />
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
                class="q-px-xl q-py-xs bg-accent q-mb-md"
                label="Tăng"
                v-on:click="onSubmit(`UP`)"
              />
            </div>
            <div class="col">
              <q-input
                outlined
                input-class="text-right"
                bg-color="grey-5"
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
                class="q-px-xl q-py-xs bg-accent q-mb-md"
                label="Giảm"
                v-on:click="onSubmit(`DOWN`)"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section> </q-card-section>
      </q-card>
    </div>
    <q-separator color="black q-mt-md q-mb-md" inset />
    <div class="q-pa-md">
      <q-table
        color="primary"
        flat
        bordered
        title="Kết quả(Tính năng đang phát triển)"
        :rows="rows"
        :columns="columns"
        row-key="name"
      />
    </div>
  </div>
</template>


<script>
const columns = [
  { name: 'betType', align: 'center', label: 'Lệnh đánh', field: 'betType' },
  {
    name: 'valueMoney',
    align: 'center',
    label: 'Số tiền',
    field: 'valueMoney',
  },
  { name: 'result', align: 'center', label: 'Kết quả', field: 'result' },
  { name: 'time', align: 'center', label: 'Thời gian', field: 'time' },
];
const rows = [
  {
    betType: 'UP',
    valueMoney: 159,
    result: 6.0,
    time: 24,
  },
  {
    betType: 'Down',
    valueMoney: 159,
    result: 6.0,
    time: 24,
  },
  {
    betType: 'UP',
    valueMoney: 159,
    result: 6.0,
    time: 24,
  },
  {
    betType: 'UP',
    valueMoney: 159,
    result: 6.0,
    time: 24,
  },
];
import { useQuasar, QSpinnerFacebook } from 'quasar';
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
    async function getSportBalance() {
      try {
        let token = localStorage.getItem('jwt');
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let responseContent = await api.get('/users/spot-balance');
        // Sau này sẽ thay bằng tài khoản thực
        // availableBalance.value = `${responseContent.data.availableBalance}$`;
        availableBalance.value = `${responseContent.data.demoBalance}$`;
        capital.value = `${responseContent.data.capital}$`;
        incomeAmount.value = `${responseContent.data.incomeAmount}$`;
      } catch (error) {
        capital.value = 'Chưa có thông tin';
        availableBalance.value = 'Chưa có thông tin';
        incomeAmount.value = 'Chưa có thông tin';
      }
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
              message: response.data.d?.message,
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
        }
      } catch (error) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Chưa đánh được lệnh. Hãy thử lại hoặc liên hệ admin',
          icon: 'report_problem',
        });
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
        console.log(1)
        $router.push('/admin/login-exchange');
      }
    }
    onBeforeMount(onCheckValid);
    onMounted(getSportBalance);
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
    };
  },
};
</script>
