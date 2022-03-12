<template>
  <div class="q-pa-md">
    <template v-if="!isActive">
      <div class="q-pa-md q-gutter-sm">
        <q-banner rounded class="bg-red text-white">
          Tài khoản của bạn chưa được kích hoạt . Hãy liên hệ admin để được kích
          hoạt tài khoản.
        </q-banner>
      </div>
    </template>
    <q-table
      :grid="$q.platform.is.mobile"
      title=""
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      :pagination="pagination"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn color="green" icon="sensors" dense @click="follow(props.row)"> FOLLOW</q-btn>
        </q-td>
      </template>
      <template v-slot:item="props">
        <div
          class="
            q-pa-xs
            col-xs-12 col-sm-6 col-md-4 col-lg-3
            grid-style-transition
            bg-blue-grey-9
          "
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card :class="props.selected ? 'bg-grey-2' : ''">
            <q-list dense>
              <q-item v-for="col in props.cols" :key="col.name">
                <q-item-section v-if="col.name !== 'action'">
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side class="justify-center">
                  <q-btn
                    v-if="col.name === 'action'"
                    dense
                    class="full-width"
                    color="green"
                    field="edit"
                    label="Follow"
                    @click="follow(props.row)"
                  ></q-btn>
                  <q-item-label
                    v-else
                    caption
                    :class="col.classes ? col.classes : ''"
                    >{{ col.value }}</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
</template>
<script>
const columns = [
  {
    name: 'groupName',
    label: 'Nhóm chuyên gia',
    field: 'groupName',
    sortable: true,
    align: 'center',
    classes: 'text-weight-bolder',
  },
  {
    name: 'monthlyTotalIncome',
    label: 'Lợi nhuận tháng',
    field: 'monthlyTotalIncome',
    sortable: true,
    align: 'center',
    classes: 'text-green',
  },
  {
    name: 'monthlyIncomePercent',
    label: '% Lợi nhuận Tháng',
    field: 'monthlyIncomePercent',
    sortable: true,
    align: 'center',
  },
  {
    name: 'userFolowQuantity',
    label: 'Người Follow',
    field: 'userFolowQuantity',
    sortable: true,
    align: 'center',
  },
  {
    name: 'action',
    label: 'Follow',
    field: 'action',
    align: 'center',
  },
];

import { useQuasar, QSpinnerIos } from 'quasar';
import { api } from 'boot/axios';
import { ref, onBeforeMount, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const $router = useRouter();
    const $q = useQuasar();
    const rows = ref([]);
    const filter = ref('');
    const isActive = ref(false);
    const pagination = ref({
      rowsPerPage: 10, // current rows per page being displayed
    });
    async function follow(row) {
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
        let token = localStorage.getItem('jwt');
        // // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        if (!isActive.value) {
          $q.dialog({
            title: 'Thông báo',
            message:
              'Tài khoản của bạn chưa được kích hoạt . Hãy liên hệ admin để được kích hoạt tài khoản.',
          })
            .onOk(() => {
              // console.log('OK')
            })
            .onCancel(() => {
              // console.log('Cancel')
            })
            .onDismiss(() => {
              // console.log('I am triggered on both OK and Cancel')
            });
            return;
        }
        let isVaildSuccess = await onCheckValid();
        if (!isVaildSuccess) {
          return;
        }
        $router.push('/user/setting-group/' + row.id);
      } catch (error) {
        if (error.response.status === 404) {
          $q.dialog({
            title: 'Thông báo',
            message:
              'Hãy cài đặt thông tin đánh lệnh trước khi follow theo chuyên gia. Nhấn OK để chuyển sang màn hình cài đặt chuyên gia',
            cancel: true,
            persistent: true,
          })
            .onOk(() => {
              $router.push('/user/setting-group');
            })
            .onCancel(() => {
              return;
            })
            .onDismiss(() => {
              // console.log('I am triggered on both OK and Cancel')
            });
        }
      } finally {
        $q.loading.hide();
      }
    }
    async function checkActive() {
      let token = localStorage.getItem('jwt');
      // // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      let user = await api.get('/users/get-profile');
      isActive.value = user.data.isActive;
    }
    async function getListGroup() {
      let token = localStorage.getItem('jwt');
      // // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      let responseContent = await api.get('group/all');
      if (responseContent.status !== 200 && responseContent.status !== 201) {
        throw new Error();
      }
      let data = responseContent.data;
      rows.value = data.map((obj) => {

        if (obj.is_token_valid === 1) {
          obj.is_token_valid = 'ONLINE';
        } else {
          obj.is_token_valid = 'OFF';
        }
        return obj;
      });
    }
    async function goLoginExchange() {
      try {
        await api.post('/users/valid-token');
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Bạn đã đăng nhập sàn rồi!',
          position: 'top',
        });
      } catch (error) {
        $router.push('/user/login-exchange');
      }
    }
    function logout() {
      $router.push('/logout');
    }
    async function onCheckValid() {
      try {
        let token = localStorage.getItem('jwt');
        // // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        await api.post('/users/valid-token');
        return true;
      } catch (error) {
        if (
          error.response.data.status === 404 &&
          error.response.data.message === 'token.notFound'
        ) {
          $q.dialog({
            title: 'Thông báo',
            message:
              'Hãy đăng nhập vào sàn trước khi follow theo chuyên gia.Nhấn OK để chuyển sang màn hình đăng nhập sàn',
            cancel: true,
            persistent: true,
          })
            .onOk(() => {
              $router.push('/user/login-exchange');
            })
            .onCancel(() => {
              return;
            })
            .onDismiss(() => {
              // console.log('I am triggered on both OK and Cancel')
            });
        } else {
          $q.dialog({
            title: 'Thông báo',
            message:
              'Bạn đã đăng nhập trên sàn chính nên bạn cần đăng nhập lại sàn ở đây.Nhấn OK để chuyển sang màn hình đăng nhập sàn',
            cancel: true,
            persistent: true,
          })
            .onOk(() => {
              $router.push('/user/login-exchange');
            })
            .onCancel(() => {
              return;
            })
            .onDismiss(() => {
              // console.log('I am triggered on both OK and Cancel')
            });
        }
        return false;
      }
    }
    onBeforeMount(getListGroup);
    onMounted(checkActive);
    return {
      columns,
      rows,
      follow,
      filter,
      goLoginExchange,
      isActive,
      pagination,
      logout
    };
  },
};
</script>
<style lang="sass" scoped>
.mb-5
  margin-bottom: 5px
.ml-5
  margin-left: 5px
</style>