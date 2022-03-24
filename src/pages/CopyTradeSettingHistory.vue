<template>
    <div class="col-8 q-pa-md">
        <q-card class="q-pa-md">
            <q-label class="text-h6">Lịch sử cài đặt Copy Trade</q-label>
            <q-separator class="q-mt-md" />
            <q-table color="primary" flat bordered title="" :rows="rows" :columns="columns" row-key="name"
                :pagination="pagination">
                <template v-slot:body="props">
                    <q-tr :props="props">
                        <q-td key="stt" :props="props">
                            {{ props.row.stt }}
                        </q-td>
                        <q-td key="createdAt" :props="props">
                            {{ props.row.createdAt }}
                        </q-td>
                        <q-td key="endDate" :props="props">
                            {{ props.row.endDate }}
                        </q-td>
                        <q-td key="masterName" :props="props">
                            {{ props.row.masterName }}
                        </q-td>
                        <q-td key="reason" :props="props">
                            {{ props.row.reason }}
                        </q-td>
                        <q-td class="text-center">
                                <q-btn color="green" icon="info" size="11px" label="Chi tiết" style="width: 110px" v-on:click="viewDetail(props.row)" />
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
    { name: 'createdAt', align: 'center', label: 'Thời gian bắt đầu', field: 'createdAt', sortable: true },
    { name: 'endDate', align: 'center', label: 'Thời gian kết thúc', field: 'endDate', sortable: true },
    { name: 'masterName', align: 'center', label: 'Tên chuyên gia', field: 'masterName', sortable: true },
    // { name: 'benefit', label: 'Lợi nhuận', field: 'benefit' },
    { name: 'reason', align: 'center', label: 'Lí do', field: 'reason', sortable: true },
    { name: 'action', align: 'center', label: 'Hành động', field: '', sortable: true }
]

import { useQuasar, QSpinnerIos, date } from 'quasar';
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios';

export default {
    setup () {
        const $q = useQuasar();
        const rows = ref([]);
        const pagination = ref({
            rowsPerPage: 10, // current rows per page being displayed
        });

        async function getCopyTradeHistory() {
            $q.loading.show({
                spinner: QSpinnerIos,
                spinnerColor: 'yellow',
                spinnerSize: 140,
                backgroundColor: 'purple',
                message: 'Đang xử lý ....',
                messageColor: 'black',
            });
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            try {
                let token = localStorage.getItem('jwt');
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                let responseContent = await api.get('user-setting/history');
                let data = responseContent.data;
                let index = 1;
                let reason = {
                    0: 'CG xoá khỏi danh sách Follow',
                    1: 'Dừng Follow',
                    2: 'Đạt giới hạn ',
                    3: 'Văng sàn',
                }
                rows.value = data.map((obj) => {
                    obj.stt = index;
                    index++;
                    obj.createdAt = date.formatDate(obj.createdAt,
                        'DD/MM/YYYY HH:mm:ss'
                    );
                    obj.endDate = date.formatDate(obj.endDate,
                        'DD/MM/YYYY HH:mm:ss'
                    );
                    obj.masterName = obj.masterName;
                    obj.reason = reason[obj.reasonCode];
                    return obj;
                });
            } catch (error) {
                console.log(error);
            } finally {
                $q.loading.hide();
            }
        }

        function viewDetail(data) {
            $q.dialog({
                title: '<p class="text-center">Chi tiết lịch sử cài đặt</p>',
                message: `
                    <div class="row">
                        <div class="col-6 text-left">Tên CG: ${data.masterName || ''}</div>
                        <div class="col-6 text-left">Hệ số: ${data.coefficient || 0}</div>
                    </div>
                    <div class="row q-mt-sm">
                        <div class="col-6 text-left">Lệnh tối thiểu: ${data.minAmount || 0}</div>
                        <div class="col-6 text-left">Lệnh tối đa: ${data.maxAmount || 0}</div>
                    </div>
                    <div class="row q-mt-sm">
                        <div class="col-6 text-left">Mức chốt lãi: ${data.takeProfit || 0}%</div>
                        <div class="col-6 text-left">Mức cắt lỗ: ${data.stopLoss || 0 }%</div>
                    </div>
                `,
                html: true
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

        onMounted(async () => {
            await getCopyTradeHistory();
        })

    return {
        columns,
        rows,
        pagination,
        getCopyTradeHistory,
        viewDetail
    }
    }
}
</script>