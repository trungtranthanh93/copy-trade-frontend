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
          <p class="text-weight-bolder text-grey-2 text-center text-h6 ">
            Màn hình đánh lệnh
          </p>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md justify-center items-center">
             <div>
              
            </div>
            <q-btn
              size="22px"
              class="q-px-xl q-py-xs"
              color="purple"
              label="Tăng"
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
            />
          </q-form>
        </q-card-section>
        <q-card-section> </q-card-section>
      </q-card>
    </div>
  </div>
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
