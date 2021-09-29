<template>
  <div class="q-pa-md">
    <div
      :class="{
        'row justify-between q-gutter-md': !$q.platform.is.mobile,
        'row justify-center q-gutter-md': $q.platform.is.mobile,
      }"
    >
      <template v-if="!$q.platform.is.mobile">
        <div class="row justify-center">
          <q-card class="bg-primary q-ml-md">
            <q-card-section>
              <div class="text-h6">Số dư ban đầu</div>
            </q-card-section>

            <q-card-section :class="'q-pt-none'">
              {{ capital }}
            </q-card-section>
          </q-card>
          <q-card class="bg-indigo-14 q-ml-md">
            <q-card-section>
              <div class="text-h6">Số dư hiện tại</div>
            </q-card-section>

            <q-card-section :class="'q-pt-none'">
              {{ availableBalance }}
            </q-card-section>
          </q-card>
          <q-card class="bg-purple-14 q-ml-md">
            <q-card-section>
              <div class="text-h6">Lợi nhuận</div>
            </q-card-section>

            <q-card-section :class="'q-pt-none'">
              {{ incomeAmount }}
            </q-card-section>
          </q-card>
        </div>
      </template>
      <template v-else>
        <q-card class="bg-primary q-ml-md">
          <q-card-section>
            <div class="text-h6">Số dư ban đầu</div>
          </q-card-section>

          <q-card-section :class="'q-pt-none'">
            {{ capital }}
          </q-card-section>
        </q-card>
        <q-card class="bg-indigo-14 q-ml-md">
          <q-card-section>
            <div class="text-h6">Số dư hiện tại</div>
          </q-card-section>

          <q-card-section :class="'q-pt-none'">
            {{ availableBalance }}
          </q-card-section>
        </q-card>
        <q-card class="bg-purple-14 q-ml-md">
          <q-card-section>
            <div class="text-h6">Lợi nhuận</div>
          </q-card-section>

          <q-card-section :class="'q-pt-none'">
            {{ incomeAmount }}
          </q-card-section>
        </q-card>
      </template>
      <q-card
        :class="{
          'my-card justify-left': true,
          'order-first': $q.platform.is.mobile,
        }"
      >
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
          <div class="absolute-bottom text-subtitle2 text-center">
            CopyTrade App Logo
          </div>
        </q-img>
      </q-card>
    </div>
    <q-separator color="black q-mt-md q-mb-md" inset />
    <div class="row items-center q-gutter-md justify-center">
      <q-btn
        color="negative"
        icon-right="cancel"
        style=""
        dense
        @click="unfollow()"
        >Dừng follow</q-btn
      >
      <q-btn
        color="positive"
        icon-right="cancel"
        style=""
        dense
        @click="continueFollow()"
        >Tiếp tục</q-btn
      >
    </div>
    <q-separator color="black q-mt-md q-mb-md" inset />
    <div class="row items-center justify-center q-gutter-md">
      Hiện thị lịch sử lệnh
    </div>
  </div>
</template>
<script>
import { api } from 'boot/axios';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { ref, onMounted } from 'vue';
export default {
  setup() {
    const $q = useQuasar();
    const $router = useRouter();
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
        if (responseContent.data.isTakeProfit) {
          $q.dialog({
            title: 'Thông báo',
            message: `Lợi nhuận hiện tại: <span class="text-green">${incomeAmount.value}</span> đã đạt giới hạn [Chốt lãi:<span class="text-green">${incomeAmount.value}</span>]. Hệ thống copy trade đã tự động dừng`,
            html: true
          })
            .onOk(() => {
              return;
            })
            .onCancel(() => {
              return;
            })
            .onDismiss(() => {
              // console.log('I am triggered on both OK and Cancel')
            });
          return;
        } else if (responseContent.data.isStopLoss) {
          $q.dialog({
            title: 'Thông báo',
            message: `Lợi nhuận hiện tại: <span class="text-red">${incomeAmount.value}</span> đã đạt giới hạn [Cắt lỗ: <span class="text-red">${incomeAmount.value}</span>]. Hệ thống copy trade đã tự động dừng`,
            html: true
          })
            .onOk(() => {
              return;
            })
            .onCancel(() => {
              return;
            })
            .onDismiss(() => {
              // console.log('I am triggered on both OK and Cancel')
            });
        }
        return;
      } catch (error) {
        $router.push('user/list-master');
      }
    }
    async function unfollow() {
      try {
        let token = localStorage.getItem('jwt');
        // // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        await api.put('users/unfolow');
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Đã dừng follow chuyên gia',
          position: 'top',
        });
        $router.push('/user/list-master');
      } catch (error) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Có lỗi . Hãy liên hệ admin để được hỗ trợ',
          icon: 'report_problem',
        });
      }
    }
    function continueFollow() {
      $router.push('/user/setting-follow');
    }
    onMounted(getSportBalance);
    return {
      capital,
      availableBalance,
      incomeAmount,
      unfollow,
      continueFollow,
    };
  },
};
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
