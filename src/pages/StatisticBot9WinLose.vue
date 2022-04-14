<template>
  <div class="col-8 q-pa-md">
    <q-card class="q-pa-md">
        <q-label class="text-h6">Thống Kê Chuỗi Lệnh</q-label>
        <q-separator class="q-mt-md" />
        <q-table color="primary" flat bordered title="" :columns="[]" :rows="[]"
            :pagination="pagination" hide-no-data>
            <template v-slot:header="">
                <q-tr>
                    <q-th rowspan="2" colspan="4"><span class="text-body2">Tên BOT</span></q-th>
                    <q-th rowspan="1" colspan="10"><span class="text-body2">Chuỗi Lệnh</span></q-th>
                </q-tr>
                <q-tr>
                        <q-th colspan="1"><span class="text-body2"></span></q-th>
                        <q-th colspan="1"><span class="text-body2">1</span></q-th>
                        <q-th colspan="1"><span class="text-body2">2</span></q-th>
                        <q-th colspan="1"><span class="text-body2">3</span></q-th>
                        <q-th colspan="1"><span class="text-body2">4</span></q-th>
                        <q-th colspan="1"><span class="text-body2">5</span></q-th>
                        <q-th colspan="1"><span class="text-body2">6</span></q-th>
                        <q-th colspan="1"><span class="text-body2">7</span></q-th>
                        <q-th colspan="1"><span class="text-body2">8</span></q-th>
                        <q-th colspan="1"><span class="text-body2">9</span></q-th>
                    </q-tr>
                    <q-tr>
                            <q-th rowspan="2" colspan="4"><span class="text-body2">Mặt Xanh</span></q-th>
                            <q-th rowspan="1" colspan="1"><span class="text-body2">Thắng</span></q-th>
                            <q-th key="win1"><span class="text-body1">{{ rows.win1 === -1 ? '-' : rows.win1}}</span></q-th>
                            <q-th key="win2"><span class="text-body1">{{ rows.win2 === -1 ? '-' : rows.win2 }}</span></q-th>
                            <q-th key="win3"><span class="text-body1">{{ rows.win3 === -1 ? '-' : rows.win3 }}</span></q-th>
                            <q-th key="win4"><span class="text-body1">{{ rows.win4 === -1 ? '-' : rows.win4 }}</span></q-th>
                            <q-th key="win5"><span class="text-body1">{{ rows.win5 === -1 ? '-' : rows.win5 }}</span></q-th>
                            <q-th key="win6"><span class="text-body1">{{ rows.win6 === -1 ? '-' : rows.win6 }}</span></q-th>
                            <q-th key="win7"><span class="text-body1">{{ rows.win7 === -1 ? '-' : rows.win7 }}</span></q-th>
                            <q-th key="win8"><span class="text-body1">{{ rows.win8 === -1 ? '-' : rows.win8 }}</span></q-th>
                            <q-th key="win9"><span class="text-body1">{{ rows.win9 === -1 ? '-' : rows.win9 }}</span></q-th>
                        </q-tr>
                        <q-tr>
                            <q-th rowspan="1" colspan="1"><span class="text-body2">Thua</span></q-th>
                            <q-th key="lose1"><span class="text-body1">{{ rows.lose1 === -1 ? '-' : rows.lose1}}</span></q-th>
                            <q-th key="lose2"><span class="text-body1">{{ rows.lose2 === -1 ? '-' : rows.lose2 }}</span></q-th>
                            <q-th key="lose3"><span class="text-body1">{{ rows.lose3 === -1 ? '-' : rows.lose3 }}</span></q-th>
                            <q-th key="lose4"><span class="text-body1">{{ rows.lose4 === -1 ? '-' : rows.lose4 }}</span></q-th>
                            <q-th key="lose5"><span class="text-body1">{{ rows.lose5 === -1 ? '-' : rows.lose5 }}</span></q-th>
                            <q-th key="lose6"><span class="text-body1">{{ rows.lose6 === -1 ? '-' : rows.lose6 }}</span></q-th>
                            <q-th key="lose7"><span class="text-body1">{{ rows.lose7 === -1 ? '-' : rows.lose7 }}</span></q-th>
                            <q-th key="lose8"><span class="text-body1">{{ rows.lose8 === -1 ? '-' : rows.lose8 }}</span></q-th>
                            <q-th key="lose9"><span class="text-body1">{{ rows.lose9 === -1 ? '-' : rows.lose9 }}</span></q-th>
                        </q-tr>
            </template>
        </q-table>
    </q-card>
  </div>
  <div class="col-8 q-pa-md">
        <q-card class="q-pa-md">
                <q-label class="text-h6">Thống Kê Theo Khung Giờ</q-label>
                <q-separator class="q-mt-md" />
                <q-table color="primary" flat bordered title="" :columns="columns" :rows="rowsData" row-key="name"
                    :pagination="pagination">
                    <template v-slot:body="props">
                        <q-tr>
                            <q-td key="botName" :props="props">
                                    <span class="text-body1">Mặt Xanh</span></q-td>
                            <q-td key="time" :props="props">
                                    <span class="text-body1">{{ props.row.time }}</span>
                            </q-td>
                            <q-td key="win" :props="props">
                                    <span class="text-body1">{{ props.row.win }}</span>
                            </q-td>
                            <q-td key="lose" :props="props">
                                    <span class="text-body1">{{ props.row.lose }}</span>
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
        { name: 'time', align: 'center', label: 'Thời gian', field: 'time', sortable: true },
        { name: 'win', align: 'center', label: 'Chuỗi Thắng Lớn Nhất', field: 'win', sortable: true },
        { name: 'lose', align: 'center', label: 'Chuỗi Thua Lớn Nhất', field: 'lose', sortable: true },
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
        const rowsData = ref([]);

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
                let responseContent = await api.get('/bot-stastistics/9-win-lose');
                let data = responseContent.data;
                rows.value = data
                let dataByTime = responseContent.data.countWinLoseByTime;
                let timer = ['00:00 - 02:00', '02:00 - 04:00', '04:00 - 06:00', '06:00 - 08:00', '08:00 - 10:00', '10:00 - 12:00', '12:00 - 14:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00', '20:00 - 22:00', '22:00 - 00:00']
                let index = 0
                rowsData.value = dataByTime.map((obj) => {
                    obj.time = timer[index]
                    obj.win = obj.winValue && obj.winCount != -1 ? `${obj.winValue} (${obj.winCount})` : '-'
                    obj.lose = obj.loseValue && obj.loseCount != -1 ? `${obj.loseValue} (${obj.loseCount})` : '-'
                    index ++
                    return obj;
                });
            } catch (error) {
                console.log(error);
            } finally {
                // $q.loading.hide();
            }
        }

        onBeforeMount(async () => {
            await getStatistic();
        })

        onMounted(() => {
            setInterval(async () => {
                await getStatistic();
            }, 10000);
        })

        return {
            columns,
            rows,
            pagination,
            rowsData
        }
    }
}
</script>