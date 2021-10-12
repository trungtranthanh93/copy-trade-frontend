<template>
  <q-btn label="Chuyển tiền" color="primary" @click="card = true" />

  <q-dialog v-model="card">
    <q-card class="my-card">
      <q-card-section>
        <div class="row no-wrap q-pa-md">
          <div class="column col-5">
            <div class="q-mb-md">{{ firstWallet }}</div>
            <div>{{ firstWalletValue }}$</div>
          </div>
          <div class="">
            <q-btn
              push
              color="primary"
              flat
              icon="sync_alt"
              @click="swapWallet"
            />
          </div>
          <div class="column col-5 q-ml-md">
            <div class="q-mb-md">{{ secondWallet }}</div>
            <div>{{ secondWalletValue }}$</div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pt-none q-mt-md">
        <q-input outlined placeholder="Nhập số tiền" v-model="moneySwap">
          <template v-slot:append>
            <q-btn label="Tất cả" @click="selectAllWalletValue"></q-btn>
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions>
        <q-btn
          class="full-width bg-positive"
          label="Chuyển tiền"
          @click="moveUsdt"
        >
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import { useQuasar, QSpinnerFacebook} from 'quasar';
export default {
  setup() {
    const $q = useQuasar();
    const firstWallet = ref('Tài khoản thực');
    const secondWallet = ref('USDT Wallet');
    const firstWalletValue = ref(null);
    const secondWalletValue = ref(null);
    const moneySwap = ref(null);
    ref;
    function swapWallet() {
      let firstWalletCopy = firstWallet.value;
      let firstWalletValueCopy = firstWalletValue.value;
      firstWallet.value = secondWallet.value;
      firstWalletValue.value = secondWalletValue.value;
      secondWallet.value = firstWalletCopy;
      secondWalletValue.value = firstWalletValueCopy;
    }
    async function getSportBalance() {
      try {
        let token = localStorage.getItem('jwt');
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let responseContent = await api.get('/users/spot-balance');
        firstWalletValue.value = responseContent.data.availableBalance;
        secondWalletValue.value = responseContent.data.usdtAvailableBalance;
      } catch (error) {
        console.log(error);
      }
    }
    function selectAllWalletValue() {
      moneySwap.value = firstWalletValue.value;
    }
    async function moveUsdt() {
      $q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'yellow',
        spinnerSize: 140,
        backgroundColor: 'purple',
        message: 'Đang xử lý ....',
        messageColor: 'black',
      });
      try {
        let token = localStorage.getItem('jwt');
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let data = {
          amount: moneySwap.value,
          confirmed: true,
          type: firstWallet.value === 'USDT Wallet' ? 'USDT_BO' : 'BO_USDT',
        };
        let response = await api.post('/trade/v1/move-usdt', data);
        if (response.status !== 201) {
          throw new Error();
        }
        if (response.data.ok === false) {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Số tiền chuyển nhập quá số tiền hiện có!',
            icon: 'report_problem',
          });
        } else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Chuyển tiền thành công!',
            position: 'top',
          });
          await getSportBalance();
        }
      } catch (error) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Chuyển tiền thất bại!',
          icon: 'report_problem',
        });
      } finally {
        $q.loading.hide();
      }
    }
    onMounted(getSportBalance);
    return {
      firstWallet,
      secondWallet,
      firstWalletValue,
      secondWalletValue,
      card: ref(false),
      swapWallet,
      selectAllWalletValue,
      moneySwap,
      moveUsdt,
    };
  },
};
</script>
