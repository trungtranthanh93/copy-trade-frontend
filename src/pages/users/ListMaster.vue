<template>
  <div class="q-pa-md">
    <div class="mb-5">
          <q-btn
      color="negative"
      icon-right="cancel"
      style=""
      dense
      @click="unfollow(props.row)"
      >Dừng follow</q-btn
    >
    </div>

    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="name"
      dark
      color="amber"
    >
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn
            color="positive"
            icon-right="add_shopping_cart"
            dense
            @click="follow(props.row)"
            >FOLLOW</q-btn
          >
        </q-td>
      </template>
    </q-table>
  </div>
</template>
<script>
const columns = [
  {
    name: 'user_name',
    label: 'Chuyên gia',
    field: 'user_name',
    sortable: true,
    align: 'center',
  },
  {
    name: 'totalOptionQuantity',
    label: 'Tổng lệnh',
    field: 'totalOptionQuantity',
    sortable: true,
    align: 'center',
  },
  {
    name: 'winOptionQuantity',
    label: 'Số lệnh thắng',
    field: 'winOptionQuantity',
    sortable: true,
    align: 'center',
  },
  {
    name: 'action',
    label: 'Follow',
    field: 'action',
    align: 'center',
  }
];

const rows = [
  {
    id: 2,
    user_name: 'KhangNV',
    password: '$2b$10$8AQiR0VqieRiNQArl2Nob.fnekSMNlqbaPA2aTIOKuZc6qNVbS6X6',
    email: 'khangnvph045133@gmail.com',
    is_active: 1,
    refresh_token: null,
    access_token: null,
    is_token_valid: null,
    master_id: null,
    created_at: '2021-09-21T15:40:42.321Z',
    updated_at: '2021-09-21T15:40:42.321Z',
    created_by: null,
    updated_by: null,
    role: 1,
    totalOptionQuantity: '2',
    winOptionQuantity: '2',
    loseOptionQuantity: '1',
  },
  {
    id: 2,
    user_name: 'KhangNV1',
    password: '$2b$10$8AQiR0VqieRiNQArl2Nob.fnekSMNlqbaPA2aTIOKuZc6qNVbS6X6',
    email: 'khangnvph045133@gmail.com',
    is_active: 1,
    refresh_token: null,
    access_token: null,
    is_token_valid: null,
    master_id: null,
    created_at: '2021-09-21T15:40:42.321Z',
    updated_at: '2021-09-21T15:40:42.321Z',
    created_by: null,
    updated_by: null,
    role: 1,
    totalOptionQuantity: '3',
    winOptionQuantity: '1',
    loseOptionQuantity: '1',
  },
];
import { useQuasar, QSpinnerFacebook } from 'quasar';
import { api } from 'boot/axios';
export default {
  setup() {
    const $q = useQuasar();

    async function follow(props) {
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
        let token = localStorage.getItem('jwt');
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let responseContent = await api.post('/users/valid-token', data);
        if (responseContent.status !== 200 && responseContent.status !== 201) {
          throw new Error();
        }
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Hãy điền tiếp mã Authenticator ',
          position: 'top',
        });
        $q.loading.value = false;
      } catch (error) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Follow thất bại',
          icon: 'report_problem',
        });
      } finally {
        $q.loading.hide();
      }
    }
    function unfollow() {
      $q.notify({
        color: 'negative',
        position: 'top',
        message: 'Follow thất bại',
        icon: 'report_problem',
      });
    }
    return {
      columns,
      rows,
      follow,
      unfollow,
    };
  },
};
</script>
<style lang="sass" scoped>
  .mb-5
    margin-bottom: 5px
</style>