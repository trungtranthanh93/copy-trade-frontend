<template>
  <!-- <q-layout container style="height: 600px"> -->
  <q-layout class="justify-center">
    <q-page-container class="window-height relative-position">
      <div
        :class="{
          'q-pa-md row justify-center rounded-borders dark': true,
        }"
        style=""
      >
        <h5 class="text-weight-bolder">Cài đặt lệnh theo bot</h5>
        <form class="q-gutter-x-xs q-gutter-y-lg" style="width: 100%">
          <div class="row justify-around items-center">
            <div style="width: 100%; max-width: 250px">
              <q-item-label class="q-mb-sm">Loại tài khoản*</q-item-label>
              <q-select filled v-model="accountType" :options="optionAccount" />
            </div>
            <div style="width: 100%; max-width: 250px">
              <DialogSwapMoney />
            </div>
          </div>
          <div class="row justify-around">
            <div style="width: 100%; max-width: 250px">
              <q-item-label class="q-mb-sm">Mức chốt lãi*</q-item-label>
              <q-select filled v-model="takeProfit" :options="optionsProfit" />
            </div>
            <div style="width: 100%; max-width: 250px">
              <q-item-label class="q-mb-sm">Mức cắt lỗ*</q-item-label>
              <q-select filled v-model="stopLoss" :options="optionsLost" />
            </div>
          </div>
          <div class="row justify-around">
            <div style="width: 100%; max-width: 250px">
              <q-item-label class="q-mb-sm">Hệ số*</q-item-label>
              <q-select
                filled
                v-model="coefficient"
                :options="optionsCoefficient"
              />
            </div>
            <div style="width: 100%; max-width: 250px">
              <q-item-label class="q-mb-sm">Phương pháp*</q-item-label>
              <q-select
                filled
                v-model="botId"
                :options="optionBot"
                :disable="isEnalbeMultiple"
              />
              <q-toggle
                :false-value="false"
                label="Chọn nhiều phương pháp"
                :true-value="true"
                color="positive"
                v-model="isEnalbeMultiple"
              />
            </div>
          </div>
          <div class="row justify-around">
            <div style="width: 100%; max-width: 250px">
              <q-item-label class="q-mb-sm">Phương pháp nâng cao*</q-item-label>
              <q-select
                filled
                v-model="listBotId"
                multiple
                :options="optionBot"
                use-chips
                stack-label
                :disable="!isEnalbeMultiple"
              />
            </div>
            <div style="width: 100%; max-width: 250px">
              <q-item-label class="q-mb-sm">Số phiên âm liên tiếp*</q-item-label>
              <q-select
                filled
                v-model="modelSession"
                :options="optionSession"
                :disable="!isEnalbeMultiple"
              />
            </div>
          </div>
          <div class="row justify-center">
            <q-btn
              class="full-width bg-positive q-mb-md"
              @click="onSetting()"
              label="Cài đặt"
              style="width: 100%; max-width: 250px"
            />
          </div>
        </form>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { useQuasar, QSpinnerFacebook } from 'quasar';
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import { useRouter } from 'vue-router';
import DialogSwapMoney from 'layouts/DialogSwapMoney.vue';
import _ from 'lodash';

export default {
  components: {
    DialogSwapMoney,
  },
  setup() {
    const $router = useRouter();
    const $q = useQuasar();
    const coefficient = ref(null);
    const stopLoss = ref(null);
    const takeProfit = ref(null);
    const accountType = ref(null);
    const listBotId = ref(null);
    const modelSession = ref(null);
    const isEnalbeMultiple = ref(false);
    const botId = ref(null);
    const optionBot = ref([]);
    const optionAccount = ref([
      {
        label: 'Tài khoản thực',
        value: 'LIVE',
      },
      {
        label: 'Tài khoản demo',
        value: 'DEMO',
      },
    ]);
    async function onSetting() {
      if (!accountType.value) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Hãy chọn Loại tài khoản!',
          icon: 'report_problem',
        });
        return;
      }
      if (!takeProfit.value) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Hãy chọn Mức chốt lãi!',
          icon: 'report_problem',
        });
        return;
      }
      if (!stopLoss.value) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Hãy chọn Mức cắt lỗ!',
          icon: 'report_problem',
        });
        return;
      }
      if (!coefficient.value) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Hãy chọn Hệ số!',
          icon: 'report_problem',
        });
        return;
      }
      if (!isEnalbeMultiple.value && !botId.value) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Hãy chọn phương pháp',
          icon: 'report_problem',
        });
        return;
      }
      if (isEnalbeMultiple.value && !listBotId.value) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Hãy chọn phương pháp nâng cao',
          icon: 'report_problem',
        });
        return;
      }
      if (isEnalbeMultiple.value && !modelSession.value) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Hãy chọn số phiên âm liên tiếp',
          icon: 'report_problem',
        });
        return;
      }
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
          accountType: accountType.value.value,
          coefficient: coefficient.value.value,
          stopLoss: stopLoss.value.value,
          takeProfit: takeProfit.value.value,
          isSelectMutilBot: isEnalbeMultiple.value,
          listBotId: isEnalbeMultiple.value
            ? listBotId.value.map((obj) => obj.value)
            : null,
          botId: !isEnalbeMultiple.value? botId.value.value : null,
          modelSession: isEnalbeMultiple.value
            ? modelSession.value.value
            : null,
        };
        console.log(data);
        let token = localStorage.getItem('jwt');
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let responseContent = await api.put('/user-setting/bot', data);
        if (responseContent.status !== 200 && responseContent.status !== 201) {
          throw new Error();
        }
        $q.loading.value = false;
        autoClose();
      } catch (error) {
        if (
          error.response.status === 400 &&
          error.response.data.message === 'notEnough.Amount'
        ) {
          $q.notify({
            color: 'negative',
            position: 'top',
            message:
              'Không đủ vốn, folow thất bại. Quý khách vui lòng nâng vốn thối thiểu là 1000 đô để tiến hành folow',
            icon: 'report_problem',
          });
          return;
        }
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Cài đặt thất bại. Vui lòng cài đặt lại',
          icon: 'report_problem',
        });
      } finally {
        $q.loading.hide();
      }
    }
    function autoClose() {
      let seconds = 3;
      let path = $router.currentRoute.value.path;
      let message = `Đã follow bot thành công! Sẽ chuyển sang màn hình kết quả sau ${seconds} giây.`;
      let to = '';
      if (path.includes('admin')) {
        to = '/admin/information-bot';
      } else if (path.includes('user')) {
        to = '/user/information-bot';
      }
      const dialog = $q
        .dialog({
          title: 'Thông báo',
          message: message,
          html: true,
        })
        .onOk(() => {
          $router.push(to);
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          clearTimeout(timer);
          // console.log('I am triggered on both OK and Cancel')
        });

      const timer = setInterval(() => {
        seconds--;

        if (seconds > 0) {
          dialog.update({
            message: message,
          });
        } else {
          clearInterval(timer);
          $router.push(to);
          dialog.hide();
        }
      }, 1000);
    }
    async function getListBot() {
      try {
        let token = localStorage.getItem('jwt');
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let data = await api.get('/bot/list');
        optionBot.value = _.map(data.data, (obj) => {
          return {
            label: obj.botName,
            value: obj.id,
          };
        });
      } catch (error) {}
    }
    onMounted(async () => {
      accountType.value = optionAccount.value[0];
      await getListBot();
    });
    return {
      accountType,
      stopLoss,
      takeProfit,
      onSetting,
      coefficient,
      optionAccount,
      botId,
      optionsCoefficient: [
        {
          label: '1',
          value: 1,
        },
        {
          label: '2',
          value: 2,
        },
        {
          label: '3',
          value: 3,
        },
        {
          label: '4',
          value: 4,
        },
        {
          label: '5',
          value: 5,
        }
      ],
      optionsProfit: [
        {
          label: '1%',
          value: 1,
        },
        {
          label: '2%',
          value: 2,
        },
        {
          label: '3%',
          value: 3,
        },
        {
          label: '4%',
          value: 4,
        },
        {
          label: '5%',
          value: 5,
        },
        {
          label: '6%',
          value: 6,
        },
        {
          label: '7%',
          value: 7,
        },
        {
          label: '8%',
          value: 8,
        },
        {
          label: '9%',
          value: 9,
        },
        {
          label: '10%',
          value: 10,
        },
        {
          label: '11%',
          value: 11,
        },
        {
          label: '12%',
          value: 12,
        },
        {
          label: '13%',
          value: 13,
        },
        {
          label: '14%',
          value: 14,
        },
        {
          label: '15%',
          value: 15,
        },
        {
          label: '16%',
          value: 16,
        },
        {
          label: '17%',
          value: 17,
        },
        {
          label: '18%',
          value: 18,
        },
        {
          label: '19%',
          value: 19,
        },
        {
          label: '20%',
          value: 20,
        },
        {
          label: '25%',
          value: 25,
        },
        {
          label: '30%',
          value: 30,
        },
        {
          label: '35%',
          value: 35,
        },
        {
          label: '40%',
          value: 40,
        },
        {
          label: '45%',
          value: 45,
        },
        {
          label: '50%',
          value: 50,
        },
        {
          label: '55%',
          value: 55,
        },
        {
          label: '60%',
          value: 60,
        },
        {
          label: '65%',
          value: 65,
        },
        {
          label: '70%',
          value: 70,
        },
        {
          label: '75%',
          value: 75,
        },
        {
          label: '80%',
          value: 80,
        },
        {
          label: '85%',
          value: 85,
        },
        {
          label: '90%',
          value: 90,
        },
        {
          label: '95%',
          value: 95,
        },
        {
          label: '100%',
          value: 100,
        },
        {
          label: '200%',
          value: 200,
        },
        {
          label: '300%',
          value: 300,
        },
        {
          label: '500%',
          value: 500,
        },
      ],
      optionsLost: [
        {
          label: '-1%',
          value: 1,
        },
        {
          label: '-2%',
          value: 2,
        },
        {
          label: '-3%',
          value: 3,
        },
        {
          label: '-4%',
          value: 4,
        },
        {
          label: '-5%',
          value: 5,
        },
        {
          label: '-6%',
          value: 6,
        },
        {
          label: '-7%',
          value: 7,
        },
        {
          label: '-8%',
          value: 8,
        },
        {
          label: '-9%',
          value: 9,
        },
        {
          label: '-10%',
          value: 10,
        },
        {
          label: '-11%',
          value: 11,
        },
        {
          label: '-12%',
          value: 12,
        },
        {
          label: '-13%',
          value: 13,
        },
        {
          label: '-14%',
          value: 14,
        },
        {
          label: '-15%',
          value: 15,
        },
        {
          label: '-16%',
          value: 16,
        },
        {
          label: '-17%',
          value: 17,
        },
        {
          label: '-18%',
          value: 18,
        },
        {
          label: '-19%',
          value: 19,
        },
        {
          label: '-20%',
          value: 20,
        },
        {
          label: '-21%',
          value: -21,
        },
        {
          label: '-22%',
          value: 22,
        },
        {
          label: '-23%',
          value: 23,
        },
        {
          label: '-24%',
          value: 24,
        },
        {
          label: '-25%',
          value: 25,
        },
        {
          label: '-26%',
          value: 26,
        },
        {
          label: '-27%',
          value: 27,
        },
        {
          label: '-28%',
          value: 28,
        },
        {
          label: '-29%',
          value: 29,
        },
        {
          label: '-30%',
          value: 30,
        },
        {
          label: '-40%',
          value: 40,
        },
        {
          label: '-50%',
          value: 50,
        },
        {
          label: '-60%',
          value: 60,
        },
        {
          label: '-70%',
          value: 70,
        },
      ],
      listBotId,
      isEnalbeMultiple,
      optionBot,
      modelSession,
      optionSession: [
        {
          label: '10',
          value: 10,
        },
        {
          label: '20',
          value: 20,
        },
        {
          label: '30',
          value: 30,
        },
        {
          label: '40',
          value: 40,
        },
        {
          label: '50',
          value: 50,
        },
      ],
    };
  },
};
</script>
<style></style>
