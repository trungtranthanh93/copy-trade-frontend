<template>
  <div class="col-8 q-pa-md">
    <q-card class="q-pa-md">
        <q-label class="text-h6">Thống Kê Lệnh</q-label>
        <q-separator class="q-mt-md" />
        <q-table color="primary" flat bordered title="" :columns="columns" :rows="rows" row-key="name"
            :pagination="pagination">
            <template v-slot:header="">
                <q-tr>
                    <q-th rowspan="2" colspan="1"><span class="text-body2">Tên BOT</span></q-th>
                    <q-th rowspan="2" colspan="1"><span class="text-body2">Tổng Lệnh</span></q-th>
                    <q-th rowspan="2" colspan="1"><span class="text-body2">Lệnh 1</span></q-th>
                    <q-th rowspan="2" colspan="1"><span class="text-body2">Lệnh 2</span></q-th>
                    <q-th rowspan="2" colspan="1"><span class="text-body2">Lệnh 3</span></q-th>
                    <q-th rowspan="2" colspan="1"><span class="text-body2">Lệnh 4</span></q-th>
                    <q-th rowspan="2" colspan="1"><span class="text-body2">Lệnh 5</span></q-th>
                    <q-th rowspan="2" colspan="1"><span class="text-body2">Lệnh cháy</span></q-th>
                </q-tr>
            </template>
            <template v-slot:body="props">
                <q-tr>
                    <q-td key="botName" :props="props">
                        <a :href="props.row.link" target="_blank" rel="noopener noreferrer" class="text-white txt-no-line text-body1">{{ props.row.botName }}</a>
                    </q-td>
                    <q-td key="tongLenh" :props="props">
                            <span class="text-body1">{{ props.row.tongLenh }}</span>
                    </q-td>
                    <q-td key="lenh_1" :props="props">
                            <span class="text-body1">{{ props.row.lenh_1 }}</span>
                    </q-td>
                    <q-td key="lenh_2" :props="props">
                            <span class="text-body1">{{ props.row.lenh_2 }}</span>
                    </q-td>
                    <q-td key="lenh_3" :props="props">
                            <span class="text-body1">{{ props.row.lenh_3 }}</span>
                    </q-td>
                    <q-td key="lenh_4" :props="props">
                            <span class="text-body1">{{ props.row.lenh_4 }}</span>
                    </q-td>
                    <q-td key="lenh_5" :props="props">
                            <span class="text-body1">{{ props.row.lenh_5 }}</span>
                    </q-td>
                    <q-td key="lenh_chay" :props="props">
                            <span class="text-body1">{{ props.row.lenh_chay }}</span>
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </q-card>
  </div>
</template>
<script>
const columns = [
    { name: 'botName', align: 'center', label: 'Tên BOT', field: 'botName', sortable: true },
    { name: 'tongLenh', align: 'center', label: 'Tổng lệnh', field: 'tongLenh'},
    { name: 'lenh_1', align: 'center', label: 'Lệnh 1', field: 'lenh_1' },
    { name: 'lenh_2', align: 'center', label: 'Lệnh 2', field: 'lenh_2' },
    { name: 'lenh_3', align: 'center', label: 'Lệnh 3', field: 'lenh_3' },
    { name: 'lenh_4', align: 'center', label: 'Lệnh 4', field: 'lenh_4' },
    { name: 'lenh_5', align: 'center', label: 'Lệnh 5', field: 'lenh_5' },
    { name: 'lenh_chay', align: 'center', label: 'Lệnh cháy', field: 'lenh_chay' },
]

// import { useQuasar, QSpinnerIos } from 'quasar';
import { ref, onMounted, onBeforeMount } from 'vue';
import { api } from 'boot/axios';

export default {
    setup () {
        // const $q = useQuasar();
        const rows = ref([]);
        const pagination = ref({
            rowsPerPage: 20, // current rows per page being displayed
        });
        const teleBotLink = ref([]);

        async function getStatistic() {
            // $q.loading.show({
            //     spinner: QSpinnerIos,
            //     spinnerColor: 'yellow',
            //     spinnerSize: 140,
            //     backgroundColor: 'purple',
            //     message: 'Đang xử lý ....',
            //     messageColor: 'black',
            // });
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            try {
                let token = localStorage.getItem('jwt');
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                let responseContent = await api.get('/bot-stastistics/summary-win');
                let data = responseContent.data;
                rows.value = data

            } catch (error) {
                console.log(error);
            } finally {
                // $q.loading.hide();
            }
        }

        async function getListBotLoseSession() {
            try {
                let token = localStorage.getItem('jwt');
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                let data = await api.get('/bot/list?type=WIN_LOSE_WAIT');
                teleBotLink.value = _.map(data.data, (obj) => {
                    return {
                        id: obj.id,
                        botName: obj.botName,
                        link: obj.link,
                    };
                });
            } catch (error) { }
        }

        onBeforeMount(async () => {
            await getListBotLoseSession();
            await getStatistic();
        })

        onMounted(() => {
            setInterval(async () => {
                await getStatistic();
            }, 60000);
        })

        return {
            columns,
            rows,
            pagination,
            teleBotLink,
            getListBotLoseSession
        }
    }
}
</script>
<style scoped>
.txt-no-line {
    text-decoration: none
}
tbody tr:nth-child(even) {
  background-color: #3498db14 !important;
}
</style>