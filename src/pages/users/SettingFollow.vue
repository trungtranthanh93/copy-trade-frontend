<template>
  <div class="column">
    <div class="row justify-center items-center">
      <q-card
        square
        dark
        class="q-pa-md q-ma-none no-shadow bg-grey-10"
        style="width: 320px"
      >
        <q-card-section class="">
          <p class="text-weight-bolder text-grey-2 text-center text-h6">
            Màn hình cài đặt lệnh
          </p>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input
              dark
              dense
              square
              filled
              clearable
              v-model="percentAmount"
              type="text"
              label="Phần trăm lệnh theo chuyên gia"
              lazy-rules
            >
            </q-input>
            <q-input
              dark
              dense
              square
              filled
              clearable
              v-model="maxAmount"
              type="text"
              label="Lệnh tối đa"
              :rules="[
                (val) => !!val || 'Hãy điền giá trị tiền tối đa của một lệnh ',
              ]"
              lazy-rules
            >
            </q-input>
            <q-input
              dark
              dense
              square
              filled
              clearable
              v-model="minAmount"
              type="text"
              label="Lệnh tối thiểu"
              :rules="[
                (val) =>
                  !!val || 'Hãy điền giá trị tiền tối thiểu của một lệnh ',
              ]"
              lazy-rules
            >
            </q-input>
            <q-input
              dark
              dense
              square
              filled
              clearable
              v-model="stopLoss"
              type="text"
              label="Mức chốt lãi"
              :rules="[(val) => !!val || 'Hãy điền Mức chốt lãi']"
              lazy-rules
            >
            </q-input>
            <q-input
              dark
              dense
              square
              filled
              clearable
              v-model="takeProfit"
              type="text"
              label="Mức cắt lỗ"
              :rules="[(val) => !!val || 'Hãy điền Mức cắt lỗ']"
              lazy-rules
            >
            </q-input>
          </q-form>
        </q-card-section>
        <q-card-actions>
          <div class="row full-width items-center">
            <div class="col-6">
              <q-btn
                outline
                rounded
                size="md"
                color="deep-orange"
                class="full-width text-white"
                label="Bắt đầu follow"
                @click="onSetting()"
              />
            </div>
          </div>
        </q-card-actions>
        <q-card-section> </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
import { useQuasar, QSpinnerFacebook } from 'quasar';
import { ref } from 'vue';
import { api } from 'boot/axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const $router = useRouter();
    const $q = useQuasar();
    const percentAmount = ref(null);
    const maxAmount = ref(null);
    const minAmount = ref(null);
    const stopLoss = ref(null);
    const takeProfit = ref(null);
    async function onSetting() {
      $q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'yellow',
        spinnerSize: 140,
        backgroundColor: 'purple',
        message: 'Đang xử lý ....',
        messageColor: 'black',
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      try {
        let data = {
          percentAmount: percentAmount.value,
          maxAmount: maxAmount.value,
          minAmount: minAmount.value,
          stopLoss: stopLoss.value,
          takeProfit: takeProfit.value,
        };
        let token = localStorage.getItem('jwt');
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let responseContent = await api.put('/user-setting', data);
        if (responseContent.status !== 200 && responseContent.status !== 201) {
          throw new Error();
        }
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Cài đặt lệnh thành công ',
          position: 'top',
        });
        $q.loading.value = false;
        $router.push('/user/list-master')
      } catch (error) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Đăng nhập thất bại ! Vui lòng đăng nhập lại',
          icon: 'report_problem',
        });
        isShowAuthenticator.value = false;
      } finally {
        $q.loading.hide();
      }
    }
    return {
      percentAmount,
      maxAmount,
      minAmount,
      stopLoss,
      takeProfit,
      onSetting,
    };
  },
};
</script>
<style></style>
