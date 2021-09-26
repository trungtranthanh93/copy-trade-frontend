<template>
  <div class="q-pa-md">
    <div class="mb-5">
          <q-btn
      color="negative"
      icon-right="cancel"
      style=""
      dense
      @click="unfollow()"
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

import { useQuasar, QSpinnerFacebook } from 'quasar';
import { api } from 'boot/axios';
import {ref,onBeforeMount}  from 'vue';
import { useRouter } from 'vue-router'

export default {
  setup() {
    const $router = useRouter();
    const $q = useQuasar();
    const rows = ref([]);
    async function follow(row) {
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
        // // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        await api.post('/users/valid-token');
        await api.put('/users/folowing-master/'+ row.id);
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Đã follow theo chuyên gia',
          position: 'top',
        });
        $q.loading.value = false;
      } catch (error) {
        if(error.response.status === 401) {
            $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Hãy đăng nhập vào sàn trước khi follow theo chuyên gia',
          icon: 'report_problem',
        });
        $router.push('/user/login-exchange')
        } else if (error.response.status === 404) {
          $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Hãy cài đặt thông tin đánh lệnh trước khi follow theo chuyên gia',
          icon: 'report_problem',
        });
        $router.push('/user/setting-follow')
        }
         
      } finally {
        $q.loading.hide();
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
          message: 'Đã unfollow chuyên gia',
          position: 'top',
        });
      } catch (error) {
         $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Có lỗi . Hãy liên hệ admin để được hỗ trợ',
          icon: 'report_problem',
        });
      }

    }
    async function getListMaster(){
        let token = localStorage.getItem('jwt');
        // // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        let responseContent = await api.get('users/masters');
        if (responseContent.status !== 200 && responseContent.status !== 201) {
          throw new Error();
        }
        rows.value = responseContent.data
    }
    onBeforeMount(getListMaster)
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