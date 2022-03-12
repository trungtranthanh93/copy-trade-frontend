<template>
  <!-- <q-layout container style="height: 600px"> -->
  <q-layout class="justify-center">
    <q-page-container class="window-height">
      <div
        class="
          q-pa-md
          fit
          wrap
          justify-center
          items-end
          content-center
          rounded-borders
          relative-position
        "
      >
        <div>
          <!-- <img class="relative-top-left" src="logo.png" style="height: 80px" /> -->
        </div>
        <div class="row items-center q-gutter-md justify-left">
          <q-btn
            color="positive"
            icon="arrow_back"
            style=""
            dense
            @click="backTraderPages()"
            >Trở lại màn đánh lệnh</q-btn
          >
        </div>
        <q-separator color="dark" class="q-mt-md q-mb-md" inset />
        <div class="q-pa-md">
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
          <q-btn color="red" icon="delete" dense @click="deleteUserFollow(props.row)"
            >Xóa</q-btn
          >
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
                    color="red"
                    field="edit"
                    label="Xóa"
                    @click="deleteUserFollow(props.row)"
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
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
const columns = [
  { name: 'stt', align: 'center', label: 'STT', field: 'stt' },
  {
    name: 'username',
    align: 'center',
    label: 'ID khách hàng',
    field: 'username',
  },
  { name: 'accountType', align: 'center', label: 'Loại tài khoản', field: 'accountType' },
  { name: 'capital', align: 'center', label: 'Vốn', field: 'capital' },
  {
    name: 'balance',
    align: 'center',
    label: 'Số dư',
    field: 'balance',
  },
  { name: 'income', align: 'center', label: 'Lãi lỗ', field: 'income' },
  { name: 'ali', align: 'center', label: 'Ali', field: 'ali' },
  {
    name: 'action',
    label: 'Xóa',
    field: 'action',
    align: 'center',
  },
];

import { api } from 'boot/axios';
import { useRouter } from 'vue-router';
import { useQuasar, QSpinnerIos } from 'quasar';
import { ref, onMounted } from 'vue';
export default {
  setup() {
    const $q = useQuasar();
    const $router = useRouter();
    const capital = ref('');
    const availableBalance = ref('');
    const incomeAmount = ref('');
    const rows = ref([]);
    const pagination = ref({
      rowsPerPage: 10, // current rows per page being displayed
    });
    function backTraderPages() {
      $router.push('/admin/solo');
    }
    async function getFollowingUserList() {
      let token = localStorage.getItem('jwt');
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      let responseContent = await api.get('/users/folowing-users');
      let data = responseContent.data;
      let index = 1;
      rows.value = data.map((obj) => {
        obj.stt = index;
        index++;
        return obj;
      });
    }
    async function deleteUserFollow(row){
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
        await api.put('/users/unfolowing-users/' + row.id);
        await getFollowingUserList();
        $q.loading.value = false;
      } catch (error) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Có lỗi xảy ra! Vui lòng liên hệ admin !',
          icon: 'report_problem',
        });
      } finally {
        $q.loading.hide();
      }
    }
    onMounted(async () => {
      await getFollowingUserList();
    });
    return {
      capital,
      availableBalance,
      incomeAmount,
      backTraderPages,
      columns,
      rows,
      pagination,
      deleteUserFollow
    };
  },
};
</script>
<style lang="sass" scoped>
.my-card
    width: 100%
    max-width: 250px
</style>
