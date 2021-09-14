<template>
  <q-layout>
    <q-page-container class="bg-primary text-white">
      <q-page class="row justify-center items-center">
        <div class="q-pa-md q-gutter-sm">
          <div class="">
            <div class="text-h4">Màn hình kết quả</div>
            <div class="text">Số dư tài khoản của bạn là {{ balance }}</div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from 'quasar';
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios';

export default {
  setup() {
    const $q = useQuasar();
    const balance = ref(0);

    async function getBalance() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      try {
        let response = await api.get('/api/v1/spot-balance');
        if (response.status !== 200) {
          throw new Error();
        }
        // tslint:disable-next-line:no-unsafe-member-access
        balance.value = response.data.d.demoBalance;
      } catch (error) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Lấy dữ liệu tiền thất bại',
          icon: 'report_problem',
        });
      }
    }
    onMounted(getBalance);
    return {
      balance,
      getBalance,
    };
  },
};
</script>
