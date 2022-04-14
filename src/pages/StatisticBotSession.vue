<template>
  <div class="col-8 q-pa-md">
    <q-card class="q-pa-md">
        <q-label class="text-h6">Thống Kê BOT Phiên</q-label>
        <q-separator class="q-mt-md" />
        <q-table color="primary" flat bordered title="" :columns="columns" :rows="rows" row-key="name"
            :pagination="pagination">
            <template v-slot:header="">
                <q-tr>
                    <q-th rowspan="2" colspan="1"><span class="text-body2">Tên BOT</span></q-th>
                    <q-th rowspan="2" colspan="1"><span class="text-body2">Tổng Phiên</span></q-th>
                    <q-th rowspan="2" colspan="1"><span class="text-body2">Phiên Thắng</span></q-th>
                    <q-th rowspan="2" colspan="1"><span class="text-body2">Phiên Cháy</span></q-th>
                    <q-th rowspan="1" colspan="5"><span class="text-body2">Phiên Cháy Liên Tiếp</span></q-th>
                    <q-th rowspan="2" colspan="1"><span class="text-body2">?</span></q-th>
                </q-tr>
                <q-tr>
                    <q-th colspan="1"><span class="text-body2">1</span></q-th>
                    <q-th colspan="1"><span class="text-body2">2</span></q-th>
                    <q-th colspan="1"><span class="text-body2">3</span></q-th>
                    <q-th colspan="1"><span class="text-body2">4</span></q-th>
                    <q-th colspan="1"><span class="text-body2">5</span></q-th>
                </q-tr>
            </template>
            <template v-slot:body="props">
                <q-tr>
                    <q-td key="botName" :props="props">
                        <a :href="props.row.link" target="_blank" rel="noopener noreferrer" class="text-white txt-no-line text-body1">{{ props.row.botName }}</a>
                    </q-td>
                    <q-td key="total" :props="props">
                            <span class="text-body1">{{ props.row.total }}</span>
                    </q-td>
                    <q-td key="totalWin" :props="props">
                            <span class="text-body1">{{ props.row.totalWin }}</span>
                    </q-td>
                    <q-td key="totalLose" :props="props">
                            <span class="text-body1">{{ props.row.totalLose }}</span>
                    </q-td>
                    <q-td key="lose1" :props="props">
                            <span class="text-body1">{{ props.row.lose1 }}</span>
                    </q-td>
                    <q-td key="lose2" :props="props">
                            <span class="text-body1">{{ props.row.lose2 }}</span>
                    </q-td>
                    <q-td key="lose3" :props="props">
                            <span class="text-body1">{{ props.row.lose3 }}</span>
                    </q-td>
                    <q-td key="lose4" :props="props">
                            <span class="text-body1">{{ props.row.lose4 }}</span>
                    </q-td>
                    <q-td key="lose5" :props="props">
                            <span class="text-body1">{{ props.row.lose5 }}</span>
                    </q-td>
                    <q-td key="totalWinMin" :props="props">
                            <span class="text-body1">{{ props.row.totalWinMin }}</span>
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
    { name: 'total', align: 'center', label: 'Tổng Phiên', field: 'total', sortable: true },
    { name: 'totalWin', align: 'center', label: 'Phiên Thắng', field: 'totalWin', sortable: true },
    { name: 'totalLose', align: 'center', label: 'Phiên Cháy', field: 'totalLose' },
    { name: 'lose1', align: 'center', label: '1', field: 'lose1' },
    { name: 'lose2', align: 'center', label: '2', field: 'lose2' },
    { name: 'lose3', align: 'center', label: '3', field: 'lose3' },
    { name: 'lose4', align: 'center', label: '4', field: 'lose4' },
    { name: 'lose5', align: 'center', label: '5', field: 'lose5' },
    { name: 'totalWinMin', align: 'center', label: '?', field: 'totalWinMin' }
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
                let responseContent = await api.get('/bot-stastistics/4-wait-lose-signal');
                let data = responseContent.data;
                rows.value = data.map((obj) => {
                    obj.link = (teleBotLink.value).find(el => el.id == obj.botId)['link']
                    if (obj.totalWinMin === -1) {
                        obj.totalWinMin = '-'
                    }
                    return obj;
                });

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