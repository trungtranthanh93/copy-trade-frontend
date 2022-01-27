
<template>
  <q-layout view="hHh Lpr lFf">
    <q-header reveal elevated class="bg-dark">
      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="drawerLeft = !drawerLeft" />
        <div v-if="!$q.platform.is.mobile">
          <img class="absolute-top-right" src="logo.png" style="height: 60px" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerLeft" :width="250" :breakpoint="500">
      <q-scroll-area style="height: 100%; border-right: 1px solid #ddd">
        <div v-if="$q.platform.is.mobile">
          <img class="top-left" src="logo.png" style="height: 40px" />
        </div>
        <q-list padding>
          <MenuItem :key="menuLinks[0].title" v-bind="menuLinks[0]" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <div class="q-pa-md">
        <h4>Màn hình danh sách chuyên gia</h4>
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
          <template v-slot:body-cell-user_name="props">
            <q-td :props="props">
              <q-item-label
                >{{ props.row.user_name }}
                <q-btn
                  flat
                  round
                  color="green"
                  icon="info"
                  @click="showInfo(props.row)"
                ></q-btn
              ></q-item-label>
            </q-td>
          </template>
          <template v-slot:body-cell-viewMonthly="props">
            <q-td :props="props">
              <q-btn color="green" dense @click="viewMonthly(props.row)"
                >Xem Thống kê tháng</q-btn
              >
            </q-td>
          </template>
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn color="green" dense @click="editUser(props.row)">Sửa</q-btn>
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
                      <q-item-label
                        >{{ col.label }}
                        <q-btn
                          v-if="col.name === 'user_name'"
                          flat
                          round
                          color="green"
                          icon="info"
                          @click="showInfo(props.row)"
                        ></q-btn
                      ></q-item-label>
                    </q-item-section>

                    <q-item-section side class="justify-center">
                      <q-btn
                        v-if="col.name === 'action'"
                        dense
                        class="full-width"
                        color="green"
                        field="edit"
                        label="Sửa"
                        @click="editUser(props.row)"
                      ></q-btn>
                      <q-btn
                        v-else-if="col.name === 'viewMonthly'"
                        dense
                        class="full-width"
                        color="green"
                        field="edit"
                        label="Xem Thống kê tháng"
                        @click="viewMonthly(props.row)"
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
      <q-dialog v-model="card">
        <q-card class="my-card">
          <q-list>
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label> {{ masterInfo.username }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator />
            <q-item clickable>
              <q-item-section avatar>
                <q-icon color="orange" name="phone" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Số điện thoại</q-item-label>
                <q-item-label caption>{{
                  masterInfo.tel ? masterInfo.tel : 'Đang cập nhật'
                }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable>
              <q-item-section avatar>
                <q-icon color="orange" name="facebook" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Facebook</q-item-label>
                <q-item-label caption>{{
                  masterInfo.facebook ? masterInfo.facebook : 'Đang cập nhật'
                }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable>
              <q-item-section avatar>
                <q-icon color="orange" name="email" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Email</q-item-label>
                <q-item-label caption>{{
                  masterInfo.email ? masterInfo.email : 'Đang cập nhật'
                }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable>
              <q-item-section avatar>
                <q-icon color="orange" name="local_movies" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Target ngày (Lãi)</q-item-label>
                <q-item-label caption>{{
                  masterInfo.takeProfitTaget
                    ? masterInfo.takeProfitTaget
                    : 'Đang cập nhật'
                }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section avatar>
                <q-icon color="orange" name="local_movies" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Target ngày (Lỗ)</q-item-label>
                <q-item-label caption>{{
                  masterInfo.stopLossTarget
                    ? masterInfo.stopLossTarget
                    : 'Đang cập nhật'
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </q-dialog>
      <q-dialog
        v-model="viewMonthlyDialog"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Màn hình chi tiết tháng</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            <MonthlyExportVue :userId="userSelected"></MonthlyExportVue>
          </q-card-section>
        </q-card>
      </q-dialog>
      <q-dialog v-model="editMasterDialog">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Sửa thông tin chuyên gia</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            <form
              class="q-gutter-x-xs q-gutter-y-lg"
              style="max-width: 295px; width: 100%"
            >
              <div>
                <q-item-label class="q-mb-sm">Số điện thoại</q-item-label>
                <q-input
                  dark
                  outlined
                  v-model="phoneNumber"
                  style="width: 295px"
                  placeholder="Điền sdt"
                >
                </q-input>
              </div>
              <div>
                <q-item-label class="q-mb-sm">Facebook</q-item-label>
                <q-input
                  dark
                  outlined
                  v-model="facebookLink"
                  style="width: 295px"
                  placeholder="Điền link facebook"
                >
                </q-input>
              </div>
              <div>
                <q-item-label class="q-mb-sm">Target lãi</q-item-label>
                <q-input
                  dark
                  outlined
                  v-model="takeProfitTaget"
                  style="width: 295px"
                  placeholder="Điền Target lãi"
                >
                </q-input>
              </div>
              <div>
                <q-item-label class="q-mb-sm">Target lỗ</q-item-label>
                <q-input
                  dark
                  outlined
                  v-model="stopLossTarget"
                  style="width: 295px"
                  placeholder="Điền link target lỗ"
                >
                </q-input>
              </div>
              <div>
                <q-item-label class="q-mb-sm"
                  >Trạng thái tài khoản</q-item-label
                >

                <q-btn-toggle
                  v-model="isActive"
                  push
                  glossy
                  toggle-color="primary"
                  :options="[
                    { label: 'Hoạt động', value: true },
                    { label: 'Khóa tài khoản', value: false },
                  ]"
                />
              </div>
              <q-btn
                class="full-width bg-positive"
                @click="onUpdate()"
                label="Cập nhật"
                style=""
              />
            </form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>
<script>
const columns = [
  {
    name: 'user_name',
    label: 'Chuyên gia',
    field: 'user_name',
    sortable: true,
    align: 'center',
    classes: 'text-weight-bolder',
  },
  {
    name: 'totalOptionQuantity',
    label: 'Tổng lệnh',
    field: 'totalOptionQuantity',
    sortable: true,
    align: 'center',
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
    label: '% Lợi nhuận',
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
    name: 'viewMonthly',
    label: 'Thống kê tháng',
    field: 'viewMonthly',
    sortable: true,
    align: 'center',
  },
  {
    name: 'action',
    label: 'Sửa',
    field: 'action',
    align: 'center',
  },
];

import { useQuasar } from 'quasar';
import { api } from 'boot/axios';
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import MonthlyExportVue from 'src/components/MonthlyExport.vue';
import MenuItem from 'components/MenuItem.vue';

const linksData = [
  {
    title: 'Đăng xuất',
    caption: '',
    icon: 'logout',
    iconColor: 'orange',
    link: '/logout',
    separator: false,
  },
];
export default {
  components: {
    MonthlyExportVue,
    MenuItem,
  },
  setup() {
    const $router = useRouter();
    const $q = useQuasar();
    const rows = ref([]);
    const filter = ref('');
    const card = ref(false);
    const viewMonthlyDialog = ref(false);
    const masterInfo = ref(null);
    const userSelected = ref(null);
    const editMasterDialog = ref(false);
    const menuLinks = ref(linksData); // Structure du menu
    const pagination = ref({
      rowsPerPage: 10, // current rows per page being displayed
    });
    const isActive = ref(false);
    const phoneNumber = ref(null);
    const facebookLink = ref(null);
    const takeProfitTaget = ref(null);
    const stopLossTarget = ref(null);
    const leftDrawerOpen = ref(false);
    async function showInfo(row) {
      try {
        let token = localStorage.getItem('jwt');
        // // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        let data = await api.get('/users/' + row.id);
        masterInfo.value = data.data;
        card.value = true;
        $q.loading.value = false;
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
              $router.push('/user/setting-follow');
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
    async function onUpdate() {
        let data = {
        isActive: isActive.value,
        phoneNumber: phoneNumber.value,
        facebookLink: facebookLink.value,
        takeProfitTaget: takeProfitTaget.value,
        stopLossTarget:stopLossTarget.value
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      try {
        let response = await api.put('/users/'+ userSelected.value, data);
        if (response.status !== 200 && response.status !== 201) {
          throw new Error();
        }
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Đăng ký thành công',
          position: 'top',
        });
      } catch (error) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Đăng ký thất bại!',
          icon: 'report_problem',
        });
      } finally {
      }
    }
    function viewMonthly(row) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      try {
        (viewMonthlyDialog.value = true); (userSelected.value = row.id);
      } catch (error) {
      } finally {
      }
    }
    async function editUser(row) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      try {
        let token = localStorage.getItem('jwt');
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        let data = await api.get('/users/' + row.id);
        isActive.value = data.data.isActive;
        phoneNumber.value = data.data.phoneNumber;
        facebookLink.value = data.data.facebookLink;
        takeProfitTaget.value = data.data.takeProfitTaget;
        stopLossTarget.value = data.data.stopLossTarget;
        editMasterDialog.value = true;
        userSelected.value = row.id;
      } catch (error) {
        console.log(error)
      } finally {
      }
    }
    async function getListMaster() {
      let token = localStorage.getItem('jwt');
      // // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      let responseContent = await api.get('users/masters');
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
    function logout() {
      $router.push('/logout');
    }
    onBeforeMount(getListMaster);
    return {
      columns,
      rows,
      showInfo,
      filter,
      pagination,
      logout,
      card,
      masterInfo,
      userSelected,
      viewMonthly,
      viewMonthlyDialog,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      menuLinks,
      drawerLeft: ref($q.screen.width > 500),
      editMasterDialog,
      editUser,
      onUpdate,
      isActive,
      phoneNumber,
      facebookLink,
      takeProfitTaget,
      stopLossTarget
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