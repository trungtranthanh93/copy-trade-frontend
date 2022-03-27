<template>
  <!-- <q-layout container style="height: 600px"> -->
  <q-layout class="justify-center">
    <q-page-container class="window-height relative-position">
      <div
        :class="{'q-pa-md row justify-center rounded-borders dark': true}"
      >
        <form class="q-gutter-x-xs q-gutter-y-lg" style="width: 100%">
            <div class="row">
                <div :class="`${$q.screen.width > 768 ? 'col-6 q-pa-md' : 'col-12'}`">
                  <q-card class="q-pa-md">
                    <div class="row q-mb-md">
                      <div class="col">
                          <q-label class="text-h5-title">Cấu Hình Quản Lý Vốn </q-label>
                      </div>
                      <!-- <q-checkbox v-model="cboxChildInterest" label="Lãi con" /> -->
                    </div>
                    <q-separator />
                    <div class="q-pa-md">
                        <q-item-label class="q-mb-sm">Tên cấu hình (*)</q-item-label>
                        <q-input filled type="text" v-model="settingName" placeholder="VD: KingAI 01"/>
                    </div>
                    <div v-if="cboxChildInterest" class="q-pa-md">
                        <q-item-label class="q-mb-sm">Giá trị lãi con ($)</q-item-label>
                        <q-input filled type="number" v-model="childInterest" placeholder="Nhập giá trị lãi con" suffix="$"/>
                      </div>
                    <div class="q-pa-md">
                      <q-item-label class="q-mb-sm">Loại tài khoản (*)</q-item-label>
                      <q-select filled v-model="accountType" emit-value option-label="label" map-options :options="optionAccount" />
                    </div>
                    <div class="q-pa-md">
                        <q-item-label class="q-mb-sm">Mức chốt lãi % (*)</q-item-label>
                        <q-input type="number" min="1" max="100" filled v-model="takeProfit" suffix="%" />
                    </div>
                    <div class="q-pa-md">
                        <q-item-label class="q-mb-sm">Mức cắt lỗ % (*)</q-item-label>
                        <q-input type="number" min="1" max="100" filled v-model="stopLoss" suffix="%" />
                    </div>
                    <div class="q-pa-md">
                      <q-item-label class="q-mb-sm">Quản lý vốn (*)</q-item-label>
                      <q-select filled v-model="balanceManagement" emit-value option-label="label" map-options :options="optionCapital" @update:model-value="val => changeBalanceManagement(val)"/>
                    </div>
                    <div class="q-pa-md">
                        <q-item-label class="q-mb-sm">Giá trị vào lệnh (*)</q-item-label>
                        <q-input type="textarea" autogrow filled v-model="orderPrice" placholder=""/>
                    </div>
                    <div v-if="balanceManagement === 'MARTINGALE'" class="q-pa-md">
                        <q-item-label class="q-mb-sm">Hình thức tăng giá trị</q-item-label>
                        <q-select filled v-model="increaseWin" emit-value option-label="label" map-options :options="increaseWinType" />
                      </div>
                  </q-card>
                </div>
                <div :class="`${$q.screen.width > 768 ? 'col-6 q-pa-md' : 'col-12 q-mt-md'}`">
                  <q-card class="q-pa-md">
                    <q-label class="text-h5-title">Cấu Hình Phương Pháp</q-label>
                    <q-separator class="q-mt-md" />
                    <div class="q-pa-md">
                      <q-item-label class="q-mb-sm">Tính năng sử dụng (*)</q-item-label>
                      <q-select filled v-model="optionId" label="Chọn tính năng sử dụng" :options="optionBotV2" option-value="value" emit-value option-label="label" map-options :disable="isEnalbeMultiple"  @update:model-value="val => changeMethods(val)" />
                      <!--<q-toggle :false-value="false" label="Chọn nhiều phương pháp" :true-value="true" color="positive"
                        v-model="isEnalbeMultiple" />-->
                    </div>
                    <div v-if="optionId == 'NORMAL'" class="q-pa-md">
                      <q-item-label class="q-mb-sm">Chọn phương pháp (*)</q-item-label>
                      <q-select filled v-model="botId" label="Chọn phương pháp" :options="optionBot" option-value="value" emit-value option-label="label" map-options :disable="isEnalbeMultiple" />
                    </div>
                    <div v-if="optionId == 'MIX'" class="q-pa-md">
                      <q-item-label class="q-mb-sm">Các phương pháp muốn MIX (*)</q-item-label>
                      <q-select filled v-model="botId" label="Chọn phương pháp muốn MIX" :options="optionBot" option-value="value" emit-value option-label="label" map-options multiple use-chips :disable="isEnalbeMultiple" />
                    </div>
                    <div v-if="optionId == 'CHANGE_BOT'" class="q-pa-md">
                        <q-item-label class="q-mb-sm">Chọn phương pháp (*)</q-item-label>
                        <q-select filled v-model="botId" label="Chọn phương pháp" :options="optionBot" option-value="value" emit-value option-label="label" map-options :disable="isEnalbeMultiple" />
                    </div>
                    <div v-if="optionId == 'CHANGE_BOT'" class="q-pa-md">
                        <q-item-label class="q-mb-sm">Chọn phương pháp muốn đổi (*)</q-item-label>
                        <q-select filled v-model="botIdChange" label="Chọn phương pháp muốn đổi" :options="optionBot" option-value="value" emit-value option-label="label" map-options multiple use-chips :disable="isEnalbeMultiple" />
                    </div>
                    <div v-if="optionId == 'WIN_LOSE_WAIT'" class="q-pa-md">
                        <q-item-label class="q-mb-sm">Các phương pháp sử dụng (*)</q-item-label>
                        <q-select filled v-model="botId" label="Chọn phương pháp sử dụng" :options="optionBot" option-value="value" emit-value option-label="label" map-options multiple use-chips :disable="isEnalbeMultiple" />
                    </div>
                    <div v-if="optionId == 'CHANGE_BOT' || optionId == 'WIN_LOSE_WAIT'">
                        <div class="q-pa-md">
                            <q-item-label class="q-mb-sm">Số Lệnh Dương Liên Tiếp {{ optionId == 'CHANGE_BOT' ? 'Muốn Đổi' : '' }}</q-item-label>
                            <q-select filled v-model="winOrdersNum" :options="optionSelect3"/>
                        </div>
                        <div class="q-pa-md">
                            <q-item-label class="q-mb-sm">Số Lệnh Âm Liên Tiếp {{ optionId == 'CHANGE_BOT' ? 'Muốn Đổi' : '' }}</q-item-label>
                            <q-select filled v-model="loseOrdersNum" :options="optionSelect3"/>
                        </div>
                        <div v-if="optionId == 'CHANGE_BOT'" class="q-pa-md">
                          <q-item-label class="q-mb-sm">Mục tiêu chốt lãi đổi phương pháp ($)</q-item-label>
                          <q-input type="number" filled v-model="winPercent" suffix="$"/>
                      </div>
                      <div v-if="optionId == 'CHANGE_BOT'" class="q-pa-md">
                        <q-item-label class="q-mb-sm">Mục tiêu cắt lỗ đổi phương pháp ($)</q-item-label>
                        <q-input type="number" filled v-model="losePercent" suffix="$"/>
                    </div>
                    </div>
                    <div v-if="optionId == 'WIN_LOSE_WAIT'">
                      <div class="q-pa-md">
                        <q-item-label class="q-mb-sm">Mục tiêu chốt lãi muốn chờ ($)</q-item-label>
                        <q-input type="number" filled v-model="takeIncome" suffix="$" />
                    </div>
                    <div class="q-pa-md">
                      <q-item-label class="q-mb-sm">Mục tiêu cắt lỗ muốn chờ ($)</q-item-label>
                      <q-input type="number" filled v-model="loseIncome" suffix="$" />
                  </div>
                  </div>
                  </q-card>
              </div>
            </div>
          <div class="row justify-center q-mb-md">
            <div :class="`${$q.screen.width > 768 ? 'q-mr-md' : 'col-6 q-mr-md'}`">
                <q-btn
                class="full-width bg-positive"
                @click="onSetting()"
                label="Cài đặt"
                style="width: 200px"
              />
            </div>
            <div class="`${$q.screen.width > 768 ? 'col-2' : 'col-6'}`">
                <q-btn
                class="full-width bg-positive"
                @click="onSave()"
                label="Lưu cấu hình"
                style="width: 100%; max-width: 150px"
              />
            </div>
            </div>
        </form>
        <div class="w-100 q-pa-md">
            <q-card class="q-pa-md">
                <q-label class="text-h5-title">Cấu hình cài đặt</q-label>
                <q-separator class="q-mt-md" />
                <q-table color="primary" flat bordered title="" :rows="rows" :columns="columns" row-key="name"
                    :pagination="pagination">
                    <template v-slot:body="props">
                        <q-tr :props="props">
                          <q-td key="stt" :props="props">
                            {{ props.row.stt }}
                          </q-td>
                          <q-td key="settingName" :props="props">
                            {{ props.row.settingName }}
                          </q-td>
                          <q-td key="takeProfit" :props="props">
                            {{ props.row.takeProfit }}%
                          </q-td>
                          <q-td key="stopLoss" :props="props">
                            {{ props.row.stopLoss }}%
                          </q-td>
                          <q-td key="nameMethod" :props="props">
                            {{ props.row.nameMethod }}
                          </q-td>
                          <q-td key="" :props="props">
                            <div class="row justify-center">
                                <q-btn v-on:click="applySetting(props.row)" :class="`${$q.screen.width > 768 ? 'q-mr-sm' : 'q-mb-sm'}`" icon="auto_fix_high" color="primary" label="">
                                    <q-tooltip class="bg-accent">Áp dụng</q-tooltip>
                                </q-btn>
                                <q-btn v-on:click="viewSetting(props.row)" :class="`${$q.screen.width > 768 ? 'q-mr-sm' : 'q-mb-sm'}`" icon="info" color="info" label="">
                                    <q-tooltip class="bg-accent">Chi tiết</q-tooltip>
                                </q-btn>
                                <q-btn v-on:click="deleteSetting(props.row.id)" icon="delete" color="red" label="">
                                    <q-tooltip class="bg-accent">Xoá</q-tooltip>
                                </q-btn>
                            </div>
                          </q-td>
                        </q-tr>
                    </template>
                </q-table>
            </q-card>
          </div>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { useQuasar, QSpinnerIos } from 'quasar';
import { ref, onBeforeMount, onMounted } from 'vue';
import { api } from 'boot/axios';
import { useRouter } from 'vue-router';
// import DialogSwapMoney from 'layouts/DialogSwapMoney.vue';
import _ from 'lodash';

const columns = [
    { name: 'stt', align: 'center', label: 'STT', field: 'stt', sortable: true },
    { name: 'settingName', align: 'center', label: 'Tên cấu hình', field: 'settingName', sortable: true },
    { name: 'takeProfit', align: 'center', label: 'Mức chốt lãi', field: 'takeProfit', sortable: true },
    { name: 'stopLoss', align: 'center', label: 'Mức cắt lỗ', field: 'stopLoss', sortable: true },
    { name: 'nameMethod', align: 'center', label: 'Tính năng', field: 'nameMethod', sortable: true },
    { name: '', align: 'center', label: 'Hành động', field: '', sortable: true }
]

export default {
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
    const balanceManagement = ref(null);
    const optionId = ref(null);
    const winOrdersNum = ref(null);
    const loseOrdersNum = ref(null);
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
    const winPercent = ref(null);
    const losePercent = ref(null);
    const botIdChange = ref(null);
    const cboxChildInterest = ref(false);
    const childInterest = ref(null);
    const settingName = ref(null);
    const orderPrice = ref(null);
    const increaseWin = ref('LOSE');
    const takeIncome = ref(null);
    const loseIncome = ref(null);
    const rows = ref([]);
    const pagination = ref({
        rowsPerPage: 10, // current rows per page being displayed
    });
    const checkUser = ref(null)

    async function onSetting() {
      let token = localStorage.getItem('jwt');
      // // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      let user = await api.get('/users/get-profile');
      if (user.data.botId) {
        $q.dialog({
          title: 'Thông báo',
          message: 'Bạn đang cài Auto Trade. Bạn có chắc chắn dừng?',
          cancel: true,
          persistent: true,
        })
          .onOk(async () => {
            await api.put('/user-setting/unfolow-bot');
            // $router.push('/user/list-master');
            return
          })
          .onCancel(() => {
            let data = JSON.parse(localStorage.getItem('user'));
            if (data.role == 0) {
              $router.push('/user/information-bot');
            } else if (data.role == 1) {
              $router.push('/admin/information-bot');
            }
            return
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
        return
      }
        if (!settingName.value) {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Hãy nhập tên cấu hình!',
            icon: 'report_problem',
          });
          return;
        }
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
            message: 'Hãy nhập Mức chốt lãi!',
            icon: 'report_problem',
          });
          return;
        }
        if (!stopLoss.value) {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Hãy nhập Mức cắt lỗ!',
            icon: 'report_problem',
          });
          return;
        }
        if (!balanceManagement.value) {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Chọn 1 giá trị Quản lý vốn!',
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
        if (this.optionId == 'MIX' && this.botId.length > 5) {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Vui lòng chọn tối đa 5 phương pháp',
            icon: 'report_problem',
          });
          return;
        }

        if (this.optionId == 'CHANGE_BOT' && this.botIdChange.length > 5) {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Vui lòng chọn tối đa 5 phương pháp muốn đổi',
            icon: 'report_problem',
          });
          return;
        }

        if (this.optionId == 'WIN_LOSE_WAIT' && this.botId.length > 5) {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Vui lòng chọn tối đa 5 phương pháp',
            icon: 'report_problem',
          });
          return;
        }

        $q.loading.show({
          spinner: QSpinnerIos,
          spinnerColor: 'yellow',
          spinnerSize: 140,
          backgroundColor: 'purple',
          message: 'Đang xử lý ....',
          messageColor: 'black',
        });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        try {
          let botIds
          if (this.optionId == 'NORMAL' || this.optionId == 'CHANGE_BOT') {
            botIds = [botId.value]
          } else {
            botIds = JSON.parse(JSON.stringify(this.botId))
          }
          let orderPriceList
          if (!((orderPrice.value).toString()).indexOf('-') > 0) {
            orderPriceList = [orderPrice.value]

          } else {
            orderPriceList = (orderPrice.value.toString()).split('-');
          }

          let data = {
            settingName: settingName.value ? settingName.value : null,
            accountType: accountType.value.value ? accountType.value.value : accountType.value,
            maxAmount: 10,
            minAmount: 1,
            stopLoss: stopLoss.value ? stopLoss.value : null,
            takeProfit: takeProfit.value ? takeProfit.value : null,
            balanceManagement: balanceManagement.value ? balanceManagement.value : null,
            method: optionId.value ? optionId.value : null,
            methodSetting: {
              winOrdersNum: winOrdersNum.value ? winOrdersNum.value.value : null,
              loseOrdersNum: loseOrdersNum.value ? loseOrdersNum.value.value : null,
              botList: botIds,
              takeIncome: takeIncome.value ? takeIncome.value : null,
              loseIncome: loseIncome.value ? loseIncome.value : null
            },
            balanceSetting: {
              orderPriceList: orderPriceList.map(Number),
              increaseCondition: increaseWin.value
            }
          }
          const formatData = JSON.parse(JSON.stringify(data),
            (key, value) => value === null || value === '' ? undefined : value);
          let token = localStorage.getItem('jwt');
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          let responseContent = await api.put('/user-setting/bot', formatData);
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
                'Không đủ vốn, Folow thất bại',
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

      async function onSave() {
        if (!settingName.value) {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Hãy nhập tên cấu hình!',
            icon: 'report_problem',
          });
          return;
        }
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
            message: 'Hãy nhập Mức chốt lãi!',
            icon: 'report_problem',
          });
          return;
        }
        if (!stopLoss.value) {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Hãy nhập Mức cắt lỗ!',
            icon: 'report_problem',
          });
          return;
        }
        if (!balanceManagement.value) {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Chọn 1 giá trị Quản lý vốn!',
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
        if (this.optionId == 'MIX' && this.botId.length > 5) {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Vui lòng chọn tối đa 5 phương pháp',
            icon: 'report_problem',
          });
          return;
        }

        if (this.optionId == 'CHANGE_BOT' && this.botIdChange.length > 5) {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Vui lòng chọn tối đa 5 phương pháp muốn đổi',
            icon: 'report_problem',
          });
          return;
        }

        if (this.optionId == 'WIN_LOSE_WAIT' && this.botId.length > 5) {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Vui lòng chọn tối đa 5 phương pháp',
            icon: 'report_problem',
          });
          return;
        }

        $q.loading.show({
          spinner: QSpinnerIos,
          spinnerColor: 'yellow',
          spinnerSize: 140,
          backgroundColor: 'purple',
          message: 'Đang xử lý ....',
          messageColor: 'black',
        });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        try {
          let botIds
          if (this.optionId == 'NORMAL' || this.optionId == 'CHANGE_BOT') {
            botIds = [botId.value]
          } else {
            botIds = JSON.parse(JSON.stringify(this.botId))
          }
          let orderPriceList
          if (!((orderPrice.value).toString()).indexOf('-') > 0) {
            orderPriceList = [orderPrice.value]

          } else {
            orderPriceList = (orderPrice.value.toString()).split('-');
          }

          let data = {
            settingName: settingName.value ? settingName.value : null,
            accountType: accountType.value.value ? accountType.value.value : accountType.value,
            maxAmount: 10,
            minAmount: 1,
            stopLoss: stopLoss.value ? stopLoss.value : null,
            takeProfit: takeProfit.value ? takeProfit.value : null,
            balanceManagement: balanceManagement.value ? balanceManagement.value : null,
            method: optionId.value ? optionId.value : null,
            methodSetting: {
              winOrdersNum: winOrdersNum.value ? winOrdersNum.value.value : null,
              loseOrdersNum: loseOrdersNum.value ? loseOrdersNum.value.value : null,
              botList: botIds,
              takeIncome: takeIncome.value ? takeIncome.value : null,
              loseIncome: loseIncome.value ? loseIncome.value : null
            },
            balanceSetting: {
              orderPriceList: orderPriceList.map(Number),
              increaseCondition: increaseWin.value
            }
          }
          // console.log(data)
          const formatData = JSON.parse(JSON.stringify(data),
            (key, value) => value === null || value === '' ? undefined : value);
          let token = localStorage.getItem('jwt');
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          let responseContent = await api.put('/bot-setting-config', formatData);
          if (responseContent.status !== 200 && responseContent.status !== 201) {
            throw new Error();
          }
          $q.loading.value = false;
          $q.notify({
            color: 'green-4',
            position: 'top',
            message: 'Lưu thành công cấu hình cài đặt',
            icon: 'cloud_done',
          });
          $router.go()
        } catch (error) {
          if (
            error.response.status === 400 &&
            error.response.data.message === 'notEnough.Amount'
          ) {
            $q.notify({
              color: 'negative',
              position: 'top',
              message:
                'Không đủ vốn, Folow thất bại',
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

    function changeMethods() {
      this.botId = null
    }

    function changeBalanceManagement(val) {
      if (val === 'MARTINGALE') {
        this.orderPrice = '1-2-4-8-17-35';
      } else if (val === 'FIBO' || val === 'FIBO2') {
        this.orderPrice = '1-2-3-5-8-13-21-34-55-89-144';
      } else {
        this.orderPrice = 1;
      }
    }

    async function getListSetting() {
      let token = localStorage.getItem('jwt');
      // // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      let responseContent = await api.get('bot-setting-config');
      let data = responseContent.data;
      let index = 1;
      let option = [
        {
          label: 'Phương pháp thủ công',
          value: 'NORMAL',
        },
        {
          label: 'Mix phương pháp',
          value: 'MIX',
        },
        {
          label: 'Tự động đổi phương pháp',
          value: 'CHANGE_BOT',
        },
        {
          label: 'Wait Signal (Đợi Win, Lose,...)',
          value: 'WIN_LOSE_WAIT',
        },
      ];
      rows.value = data.map((obj) => {
          obj.stt = index;
          index++;
          let found = option.find(element => element.value === obj.method);
          obj.nameMethod = found.label
          return obj;
      });
    }

    function applySetting(config) {
      window.scrollTo(0, 0);
      if(config.settingName) {
        settingName.value = config.settingName
      }
      if(config.accountType) {
        accountType.value = config.accountType
      }
      if(config.takeProfit) {
        takeProfit.value = config.takeProfit
      }
      if(config.stopLoss) {
        stopLoss.value = config.stopLoss
      }
      if(config.balanceManagement) {
        balanceManagement.value = config.balanceManagement
      }
      if(config.balanceSetting.orderPriceList) {
        if(config.balanceSetting.orderPriceList.length == 1){
          this.orderPrice = config.balanceSetting.orderPriceList
        } else {
          this.orderPrice = config.balanceSetting.orderPriceList.join('-')
        }
      }
      if(config.balanceSetting.increaseCondition) {
        increaseWin.value = config.balanceSetting.increaseCondition
      }
      if(config.method) {
        this.optionId = config.method
      }
      if(config.methodSetting.botList) {
        if (config.methodSetting.botList.length > 1){
          botId.value = config.methodSetting.botList
        }else {
          botId.value = config.methodSetting.botList[0]
        }
      }
      if(config.methodSetting.winOrdersNum) {
        winOrdersNum.value = config.methodSetting.winOrdersNum
      }
      if(config.methodSetting.loseOrdersNum) {
        loseOrdersNum.value = config.methodSetting.loseOrdersNum
      }
      if(config.methodSetting.takeIncome) {
        takeIncome.value = config.methodSetting.takeIncome
      }
      if(config.methodSetting.loseIncome) {
        loseIncome.value = config.methodSetting.loseIncome
      }
    }

    async function deleteSetting(botId) {
      let token = localStorage.getItem('jwt');
      // // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      let responseContent = await api.delete(`bot-setting-config/${botId}`);
      if (responseContent.status == 200){
        $q.notify({
          color: 'green-4',
          position: 'top',
          message: 'Xoá thành công cấu hình cài đặt',
          icon: 'cloud_dome',
        });
        $router.go()
      }
    }

    function viewSetting (data) {
      let orderPriceList
      if (data.balanceSetting.orderPriceList.length == 1) {
        orderPriceList = data.balanceSetting.orderPriceList[0]
      } else {
        orderPriceList = data.balanceSetting.orderPriceList.join('-')
      }
      let lstBot = []
      for (let i = 0; i < data.methodSetting.botList.length; i++) {
        for (let j = 0; j < optionBot.value.length; j++) {
          if(data.methodSetting.botList[i] == optionBot.value[j].value) {
            lstBot.push(optionBot.value[j].label)
          }
        }
      }
      lstBot = lstBot.join(', ')
      let options = [
        {
          label: 'Đều lệnh',
          value: 'NORMAL',
        },
        {
          label: 'Gấp thếp',
          value: 'MARTINGALE',
        },
        {
          label: 'Fibo 1',
          value: 'FIBO',
        },
        {
          label: 'Fibo 2',
          value: 'FIBO2',
        },
      ]
      let balanceManagementName = options.find(element => element.value === data.balanceManagement);
      $q.dialog({
                title: '<p class="text-center">Chi tiết cấu hình cài đặt</p>',
                message: `
                    <p class="text-left">Tên cấu hình: ${data.settingName || ''}</p>
                    <p class="text-left text-uppercase text-weight-bold">Cấu hình quản lý vốn</p>
                    <p class="text-left">Loại tài khoản: ${data.accountType || ''}</p>
                    <div class="row">
                        <div class="col-md-6">
                            <p class="text-left">Mức chốt lãi: ${data.takeProfit || 0}%</p>
                        </div>
                        <div class="col-md-6">
                            <p class="text-left">Mức cắt lỗ: ${data.stopLoss || 0}%</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <p class="text-left">Quản lý vốn: ${balanceManagementName.label || ''}</p>
                        </div>
                        <div class="col-md-6">
                            <p class="text-left">Giá trị vào lệnh: ${orderPriceList}</p>
                        </div>
                    </div>
                    <p class="text-left text-uppercase text-weight-bold">Cấu hình phương pháp</p>
                    <p class="text-left">Tính năng: ${data.nameMethod || ''}</p>
                    <p class="text-left">Phương pháp: ${lstBot || ''}</p>
                    <p class="text-left">Số lệnh dương liên tiếp: ${data.methodSetting.winOrdersNum || ''}</p>
                    <p class="text-left">Số lệnh âm liên tiếp: ${data.methodSetting.loseOrdersNum || ''}</p>
                    <p class="text-left">Mục tiêu chốt lãi muốn chờ: ${data.methodSetting.takeIncome || ''}%</p>
                    <p class="text-left">Mục tiêu cắt lỗ muốn chờ: ${data.methodSetting.loseIncome || ''}%</p>
                `,
                html: true,
            })
            // .onOk(() => {
            //     return;
            // })
            .onCancel(() => {
                return;
            })
            .onDismiss(() => {
                // console.log('I am triggered on both OK and Cancel')
            });
            return;
    }
    onBeforeMount(async () => {
      let token = localStorage.getItem('jwt');
      // // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      let user = await api.get('/users/get-profile');
      if (user.data.masterId) {
        $q.dialog({
          title: 'Thông báo',
          message:
            'Bạn đang Follow CG. Bạn có chắc chắn dừng?',
          cancel: true,
          persistent: true,
        })
          .onOk(async () => {
            await api.put('/user-setting/unfolow');
            $router.push('/user/list-master');
            return
          })
          .onCancel(() => {
            $router.push('/user/infomation-copy-trader');
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      }
      if (user.data.botId) {
        return
      }

      if(user.data.groupId) {
        $q.dialog({
          title: 'Thông báo',
          message:
            'Bạn đang Follow theo nhóm CG. Bạn có chắc chắn dừng?',
          cancel: true,
          persistent: true,
        })
          .onOk(async () => {
            await api.put('/user-setting/unfolow');
            $router.push('/user/list-master');
            return
          })
          .onCancel(() => {
            $router.push('/user/infomation-copy-group');
            return
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      }
      // $router.push('/user/list-master');
    });

    onMounted(async () => {
      accountType.value = optionAccount.value[0];
      await getListBot();
      await getListSetting();
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
      optionCapital: [
        {
          label: 'Đều lệnh',
          value: 'NORMAL',
        },
        {
          label: 'Gấp thếp',
          value: 'MARTINGALE',
        },
        {
          label: 'Fibo 1',
          value: 'FIBO',
        },
        {
          label: 'Fibo 2',
          value: 'FIBO2',
        },
      ],
      optionBotV2: [
        {
          label: 'Phương pháp thủ công',
          value: 'NORMAL',
        },
        {
          label: 'Mix phương pháp',
          value: 'MIX',
        },
        // {
        //   label: 'Tự động đổi phương pháp',
        //   value: 'CHANGE_BOT',
        // },
        {
          label: 'Wait Signal (Đợi Win, Lose,...)',
          value: 'WIN_LOSE_WAIT',
        },
      ],
      balanceManagement,
      optionId,
      winOrdersNum,
      loseOrdersNum,
      optionSelect3: [
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
        },
        {
          label: '6',
          value: 6,
        },
        {
          label: '7',
          value: 7,
        },
        {
          label: '8',
          value: 8,
        },
        {
          label: '9',
          value: 9,
        },
        {
          label: '10',
          value: 10,
        },
        {
          label: '11',
          value: 11,
        },
        {
          label: '12',
          value: 12,
        },
        {
          label: '13',
          value: 13,
        },
        {
          label: '14',
          value: 14,
        },
        {
          label: '15',
          value: 15,
        },
        {
          label: '16',
          value: 16,
        },
        {
          label: '17',
          value: 17,
        },
        {
          label: '18',
          value: 18,
        },
        {
          label: '19',
          value: 19,
        },
        {
          label: '20',
          value: 20,
        },
      ],
      winPercent,
      losePercent,
      percentOpSelect: [
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
      botIdChange,
      changeMethods,
      cboxChildInterest,
      childInterest,
      settingName,
      orderPrice,
      increaseWinType: [
        {
          label: 'Gấp khi WIN',
          value: 'WIN'
        },
        {
          label: 'Gấp khi LOSE',
          value: 'LOSE'
        },
        {
          label: 'Luôn gấp',
          value: 'ALWAYS'
        }
      ],
      increaseWin,
      takeIncome,
      loseIncome,
      changeBalanceManagement,
      onSave,
      columns,
      rows,
      pagination,
      getListSetting,
      applySetting,
      deleteSetting,
      viewSetting,
      checkUser
    };
  },
};
</script>
<style>
.w-100 {
  width: 100%
}
</style>
