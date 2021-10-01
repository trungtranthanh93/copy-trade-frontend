<template>
  <div class="column">
    <div class="row justify-center items-center">
      <q-card square class="q-pa-md q-ma-none" style="width: 320px">
        <q-card-section class="">
          <p class="text-weight-bolder text-center text-h6">
            Màn hình cài đặt lệnh
          </p>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md">
            <q-select
              filled
              v-model="maxAmount"
              :options="optionsAmount"
              :rules="[(val) => !!val || 'Hãy chọn % lệnh tối đa']"
              label="Lệnh tối đa"
            />
            <q-select
              filled
              v-model="minAmount"
              :options="optionsAmount"
              :rules="[(val) => !!val || 'Hãy chọn % lệnh tối thiểu']"
              label="Lệnh tối thiểu"
            />
            <q-select
              filled
              v-model="takeProfit"
              :options="optionsProfit"
              label="Mức chốt lãi"
              :rules="[(val) => !!val || 'Hãy chọn % mức chốt lãi']"
            />
            <q-select
              filled
              v-model="stopLoss"
              :options="optionsLost"
              label="Mức cắt lỗ"
              :rules="[(val) => !!val || 'Hãy chọn % mức cắt lỗ']"
            />
          </q-form>
        </q-card-section>
        <q-card-actions>
          <div class="row full-width items-center">
            <div class="col-6">
              <q-btn
                outline
                size="md"
                class="full-width bg-accent"
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
          maxAmount: maxAmount.value.value,
          minAmount: minAmount.value.value,
          stopLoss: stopLoss.value.value,
          takeProfit: takeProfit.value.value,
        };
        let token = localStorage.getItem('jwt');
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let responseContent = await api.put('/user-setting', data);
        if (responseContent.status !== 200 && responseContent.status !== 201) {
          throw new Error();
        }
        $q.loading.value = false;
        autoClose();
      } catch (error) {
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
    function autoClose () {
      let seconds = 3

      const dialog = $q.dialog({
        title: 'Thông báo',
        message: `Đã follow theo chuyên gia thành công! Sẽ chuyển sang màn hình kết quả sau ${seconds} giây.`,
        html: true
      }).onOk(() => {
        $router.push('/user/');
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        clearTimeout(timer)
        // console.log('I am triggered on both OK and Cancel')
      })

      const timer = setInterval(() => {
        seconds--

        if (seconds > 0) {
          dialog.update({
            message: `Đã follow theo chuyên gia thành công! Sẽ chuyển sang màn hình kết quả sau ${seconds} giây.`
          })
        }
        else {
          clearInterval(timer)
          $router.push('/user/');
          dialog.hide()
        }
      }, 1000)
    }
    return {
      percentAmount,
      maxAmount,
      minAmount,
      stopLoss,
      takeProfit,
      onSetting,
      optionsAmount: [
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
          label: '21%',
          value: 21,
        },
        {
          label: '22%',
          value: 22,
        },
        {
          label: '23%',
          value: 23,
        },
        {
          label: '24%',
          value: 24,
        },
        {
          label: '25%',
          value: 25,
        },
        {
          label: '26%',
          value: 26,
        },
        {
          label: '27%',
          value: 27,
        },
        {
          label: '28%',
          value: 28,
        },
        {
          label: '29%',
          value: 29,
        },
        {
          label: '30%',
          value: 30,
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
      ],
    };
  },
};
</script>
<style></style>
