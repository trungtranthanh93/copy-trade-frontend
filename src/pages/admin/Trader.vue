<template>
  <q-layout>
    <q-page-container class="bg-primary text-white">
      <q-page
        class="window-height window-width row justify-center items-center"
      >
        <div class="q-pa-md q-gutter-sm">
          <div class="row">
            <label class="text-h5">Màn hình đánh lệnh của admin</label>
          </div>
          <q-form @submit="onSubmit">
            <div>
              <q-radio
                keep-color
                v-model="putOptions"
                val="UP"
                label="Tăng"
                color="green-14"
              />
              <q-radio
                keep-color
                v-model="putOptions"
                val="DOWN"
                label="Giảm"
                color="red-10"
              />
            </div>
            <q-input
              outlined
              input-class="text-right"
              bg-color="grey-5"
              type="number"
              v-model="money"
              label="Nhập số tiền đánh"
              lazy-rules
              suffix="$"
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'Hãy điền số tiền đánh',
                (val) => val > 0 || 'Hãy điền số lớn hơn 0',
              ]"
            >
              <template v-slot:before>
                <q-icon name="paid" color="grey-1" />
              </template>
            </q-input>
            <div>
              <q-btn :loading="loading" color="orange-8" type="submit">
                Đánh lệnh
                <template v-slot:loading>
                  <q-spinner-facebook color="light-blue" />
                </template>
              </q-btn>
            </div>
          </q-form>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { api } from 'boot/axios';

export default {
  setup() {
    const $q = useQuasar();
    const putOptions = ref('UP');
    const money = ref(null);
    const loading = ref(false);
    return {
      putOptions,
      money,
      loading,
      onSubmit() {
        loading.value = true;
        let data = {
          betType: putOptions.value,
          betAmount: Number(money.value),
        };
        api
          .post('/api/v1/bet', data)
          .then((response) => {
            // tslint:disable-next-line:no-unsafe-member-access
            if (response.data.ok === false) {
              $q.notify({
                color: 'negative',
                position: 'top',
                message:
                  'Lệnh đánh thất bại. Vui lòng liên hệ admin để được support',
                icon: 'report_problem',
              });
            }
            $q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Lệnh đánh thành công',
              position: 'top',
            });
            console.log(response);
          })
          .catch(() => {
            $q.notify({
              color: 'negative',
              position: 'top',
              message:
                'Lệnh đánh thất bại. Vui lòng liên hệ admin để được support',
              icon: 'report_problem',
            });
          })
          .finally(() => {
            loading.value = false;
          });
      },
    };
  },
};
</script>
