<template>
  <div class="column">
    <div class="row justify-center items-center">
      <q-card
        square
        dark
        class="q-pa-md q-ma-none no-shadow bg-grey-10"
        style="width: 320px"
        align="center"
      >
        <q-card-section class="q-mb-md"> </q-card-section>
        <q-card-section class="q-mt-xl q-mb-md">
          <p class="text-weight-bolder text-grey-2 text-center text-h6">
            Màn hình đánh lệnh
          </p>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md justify-center items-center">
            <div></div>
            <q-btn
              size="22px"
              class="q-px-xl q-py-xs"
              color="purple"
              label="Tăng"
              v-on:click="onSubmit(`UP`)"
            />
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
            <q-btn
              size="22px"
              class="q-px-xl q-py-xs"
              color="purple"
              label="Giảm"
              v-on:click="onSubmit(`DOWN`)"
            />
          </q-form>
        </q-card-section>
        <q-card-section> </q-card-section>
      </q-card>
    </div>
  </div>
</template>


<script>
import { useQuasar, QSpinnerFacebook } from 'quasar';
import { ref, onBeforeMount } from 'vue';
import { api } from 'boot/axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const $q = useQuasar();
    const $router = useRouter();
    const putOptions = ref('UP');
    const money = ref(null);
    const loading = ref(false);
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
        if (
          response.data.ok === false &&
          response.data.d?.err_code === 'betsession_is_invalid'
        ) {
          $q.notify({
            color: 'negative',
            position: 'top',
            message:
              'Chưa đến thời điểm đánh lệnh. Hãy đánh đúng thời điểm đánh lệnh',
            icon: 'report_problem',
          });
        } else if (response.data.ok === true){
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
        $q.loading.hide()
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
        $router.push('/admin/login-exchange');
      }
    }
    onBeforeMount(onCheckValid);
    return {
      putOptions,
      money,
      loading,
      onSubmit,
    };
  },
};
</script>
