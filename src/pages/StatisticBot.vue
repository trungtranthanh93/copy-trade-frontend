<template>
  <div class="col-8 q-pa-md">
    <q-card class="q-pa-md">
        <q-label class="text-h6">Thống Kê BOT</q-label>
        <q-separator class="q-mt-md" />
        <q-table color="primary" flat bordered title="" :rows="rows" :columns="columns" row-key="name"
            :pagination="pagination">
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td key="stt" :props="props">
                            {{ props.row.stt }}
                    </q-td>
                    <q-td key="botName" :props="props">
                            {{ props.row.botName }}
                    </q-td>
                    <q-td key="alwayWin" :props="props">
                        <q-chip square size="14px" color="green">
                            {{ props.row.winStreak }}
                        </q-chip> /
                        <q-chip square size="14px" color="green">
                            {{ props.row.winStreakCountDay }}
                        </q-chip> /
                        <q-chip square size="14px" color="blue-grey">
                            {{ props.row.winStreakCount }}
                        </q-chip>
                    </q-td>
                    <q-td key="alwayLose" :props="props">
                        <q-chip square size="14px" color="negative">
                            {{ props.row.loseStreak }}
                        </q-chip> /
                        <q-chip square size="14px" color="negative">
                            {{ props.row.loseStreakCountDay }}
                        </q-chip> /
                        <q-chip square size="14px" color="blue-grey">
                            {{ props.row.loseStreakCount }}
                        </q-chip>
                    </q-td>
                    <q-td key="winLoseInDay" :props="props">
                        <q-chip square size="14px" color="green">
                            {{ props.row.winCountDay }}
                        </q-chip> /
                        <q-chip square size="14px" color="red">
                            {{ props.row.loseCountDay }}
                        </q-chip> /
                        <q-chip square size="14px" color="blue-grey">
                            {{ props.row.winCountDay - props.row.loseCountDay }}
                        </q-chip>
                    </q-td>
                    <q-td key="winRate" :props="props">
                        <q-chip square size="14px" color="primary">
                            {{ props.row.winRate }}
                        </q-chip>
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </q-card>
  </div>
</template>
<script>
const columns = [
    { name: 'stt', align: 'center', label: 'STT', field: 'stt', sortable: true },
    { name: 'botName', align: 'center', label: 'Tên phương pháp', field: 'botName', sortable: true },
    { name: 'alwayWin', align: 'center', label: 'Chuỗi lệnh win liên tiếp', field: 'alwayWin', sortable: true },
    { name: 'alwayLose', align: 'center', label: 'Chuỗi lệnh lose liên tiếp', field: 'alwayLose', sortable: true },
    { name: 'winLoseInDay', align: 'center', label: 'Chuỗi lệnh Win/Lose ngày', field: 'winLoseInDay' },
    { name: 'winRate', align: 'center', label: 'Tỉ lệ thắng', field: 'winRate' },
]

// import { useQuasar, QSpinnerIos } from 'quasar';
import { ref, onMounted, onBeforeMount } from 'vue';
import { api } from 'boot/axios';

export default {
    setup () {
        // const $q = useQuasar();
        const rows = ref([]);
        const pagination = ref({
            rowsPerPage: 10, // current rows per page being displayed
        });

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
                let responseContent = await api.get('/bot-stastistics');
                let data = responseContent.data;
                let index = 1;
                rows.value = data.map((obj) => {
                    obj.stt = index;
                    index++;
                    obj.winRate = Math.round(obj.winCountDay /(obj.winCountDay + obj.loseCountDay) *100)+' %';
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
            }, 60000);
        })

        return {
            columns,
            rows,
            pagination
        }
    }
}
</script>