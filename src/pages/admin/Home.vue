<template>
    <!-- <q-layout container style="height: 600px"> -->
    <q-layout class="justify-center">
        <q-page-container class="window-height">
            <div class="q-pa-md
            fit
            wrap
            justify-center
            items-end
            content-center
            rounded-borders
            relative-position">
                <div class="row">
                    <div class="col-12 col-lg-4 col-md-6">
                        <q-card class="q-ma-sm"
                            style="background: linear-gradient(to right, #2980b9, #2c3e50);">
                            <div class="q-pt-md q-pb-md">
                                <div class="row items-center">
                                    <div class="col-3 q-pl-md">
                                        <q-icon name="assignment_ind" color="white" size="4rem" />
                                    </div>
                                    <div class="col-9">
                                        <h6 class="text-muted font-semibold q-ma-sm">Biệt Danh </h6>
                                        <h4 class="font-extrabold mb-0 q-ma-sm nickname elipses">{{ nickName || '' }}</h4>
                                    </div>
                                </div>
                            </div>
                        </q-card>
                    </div>
                    <div class="col-12 col-lg-4 col-md-6">
                        <q-card class="q-ma-sm"
                            style="background: linear-gradient(to right, #2980b9, #2c3e50);">
                            <div class="q-pt-md q-pb-md">
                                <div class="row items-center">
                                    <div class="col-3 q-pl-md">
                                        <q-icon name="account_circle" color="white" size="4rem" />
                                    </div>
                                    <div class="col-9">
                                        <h6 class="text-muted font-semibold q-ma-sm">Loại Tài Khoản</h6>
                                        <h4 class="font-extrabold mb-0 q-ma-sm">{{ accountType || '' }}</h4>
                                    </div>
                                </div>
                            </div>
                        </q-card>
                    </div>
                    <div class="col-12 col-lg-4 col-md-6">
                        <q-card class="q-ma-sm"
                            style="background: linear-gradient(to right, #134e5e, #71b280);">
                            <div class="q-pt-md q-pb-md">
                                <div class="row items-center">
                                    <div class="col-3 q-pl-md">
                                        <q-icon name="paid" color="white" size="4rem" />
                                    </div>
                                    <div class="col-9">
                                        <h6 class="text-muted font-semibold q-ma-sm">Số Dư Ban Đầu</h6>
                                        <h4 class="font-extrabold mb-0 q-ma-sm">{{ capital || '' }}</h4>
                                    </div>
                                </div>
                            </div>
                        </q-card>
                    </div>
                    <div class="col-12 col-lg-4 col-md-6">
                        <q-card class="q-ma-sm"
                            style="background: linear-gradient(to right, #2bc0e4, #eaecc6);">
                            <div class="q-pt-md q-pb-md">
                                <div class="row items-center">
                                    <div class="col-3 q-pl-md">
                                        <q-icon name="account_balance" color="white" size="4rem" />
                                    </div>
                                    <div class="col-9">
                                        <h6 class="text-muted font-semibold q-ma-sm">Số Dư Hiện Tại</h6>
                                        <h4 class="font-extrabold mb-0 q-ma-sm">{{ availableBalance || '' }}</h4>
                                    </div>
                                </div>
                            </div>
                        </q-card>
                    </div>
                    <div class="col-12 col-lg-4 col-md-6">
                        <q-card class="q-ma-sm"
                            style="background: linear-gradient(to right, #4776e6, #8e54e9);">
                            <div class="q-pt-md q-pb-md">
                                <div class="row items-center">
                                    <div class="col-3 q-pl-md">
                                        <q-icon name="savings" color="white" size="4rem" />
                                    </div>
                                    <div class="col-9">
                                        <h6 class="text-muted font-semibold q-ma-sm">Lợi Nhuận</h6>
                                        <h4 class="font-extrabold mb-0 q-ma-sm">{{ incomeAmount || 0 }}$</h4>
                                    </div>
                                </div>
                            </div>
                        </q-card>
                    </div>
                    <div class="col-12 col-lg-4 col-md-6">
                        <q-card class="q-ma-sm"
                            style="background: linear-gradient(to right, #dd5e89, #f7bb97);">
                            <div class="q-pt-md q-pb-md">
                                <div class="row items-center">
                                    <div class="col-3 q-pl-md">
                                        <q-icon name="import_export" color="white" size="4rem" />
                                    </div>
                                    <div class="col-9">
                                        <h6 class="text-muted font-semibold q-ma-sm">Thắng / Thua</h6>
                                        <h4 class="font-extrabold mb-0 q-ma-sm">{{ winOrderQuan ? winOrderQuan: '0'}} /
                                            {{loseOrderQuan? loseOrderQuan : '0' }}</h4>
                                    </div>
                                </div>
                            </div>
                        </q-card>
                    </div>
                </div>

                <q-separator color="dark" class="q-mt-md q-mb-md" inset />

                <div :class="`${$q.screen.width > 768 ? 'col-12' : 'col-12 q-mt-md'}`">
                    <MontlyExport @updateWinLose="updateWinLose" />
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
            name: 'createdDatetime',
            align: 'center',
            label: 'Thời gian',
            field: 'createdDatetime',
        },
        { name: 'betType', align: 'center', label: 'Lệnh đánh', field: 'betType' },
        {
            name: 'betAmount',
            align: 'center',
            label: 'Số tiền',
            field: 'betAmount',
        },
        { name: 'winAmount', align: 'center', label: 'Kết quả', field: 'winAmount' },
    ];

    import { useQuasar, date } from 'quasar';
    import { ref, onBeforeMount, onMounted } from 'vue';
    import { api } from 'boot/axios';
    import { useRouter } from 'vue-router';
    import MontlyExport from '../MontlyExport.vue';

    export default {
        components: {
            MontlyExport
        },
        setup() {
            const $q = useQuasar();
            const $router = useRouter();
            const putOptions = ref('UP');
            const loading = ref(false);
            const capital = ref('');
            const availableBalance = ref('');
            const incomeAmount = ref('');
            const accountType = ref('');
            const winOrderQuan = ref('');
            const loseOrderQuan = ref('');
            const rows = ref([]);
            const nickName = ref('');
            async function getSportBalance() {
                try {
                    let token = localStorage.getItem('jwt');
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    let responseContent = await api.get('/users/spot-balance');
                    availableBalance.value = `${responseContent.data.balance}$`;
                    capital.value = `${responseContent.data.capital}$`;
                    // incomeAmount.value = `${responseContent.data.incomeAmount}$`;
                    accountType.value = `${responseContent.data.userType}`;
                } catch (error) {
                    capital.value = 'Chưa có thông tin';
                    availableBalance.value = 'Chưa có thông tin';
                    // incomeAmount.value = 'Chưa có thông tin';
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
                    let user = await api.get('/users/get-profile');
                    nickName.value = user.data.username;
                    // if (user.data.botId) {
                    //     $q
                    //         .dialog({
                    //             title: 'Thông báo',
                    //             message: 'Bạn đang follow theo bot. Bạn chắc chắn muốn dừng follow bot và tự đánh lệnh ?',
                    //             html: true,
                    //             cancel: true,
                    //             persistent: true,
                    //         })
                    //         .onOk(async () => {
                    //             await api.put('/user-setting/unfolow-bot');
                    //         })
                    //         .onCancel(() => {
                    //             $router.push('/admin/information-bot');
                    //         });
                    // }
                } catch (error) {
                    $q.notify({
                        color: 'negative',
                        position: 'top',
                        message: 'Hãy đăng nhập vào sàn trước khi đánh lệnh',
                        icon: 'report_problem',
                    });
                    $router.push('/admin/login-exchange');
                }
            }
            //   async function wait(timeout) {
            //     return new Promise((resolve) => setTimeout(resolve, timeout * 1000));
            //   }
            async function getStatistic() {
                let token = localStorage.getItem('jwt');
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                let responseContent = await api.get('/statistics');
                let data = responseContent.data;
                let index = 1;
                rows.value = data.map((obj) => {
                    obj.stt = index;
                    index++;
                    if (obj.winAmount === 0) {
                        obj.winAmount = '$0';
                    } else {
                        obj.winAmount = `+$${obj.winAmount}`;
                    }
                    obj.createdDatetime = date.formatDate(
                        Number(obj.createdDatetime),
                        'DD/MM/YYYY HH:mm:ss'
                    );
                    return obj;
                });
            }
            function updateWinLose(data) {
                winOrderQuan.value = data.winOrderQuan,
                loseOrderQuan.value = data.loseOrderQuan
                incomeAmount.value = data.monthlyTotalIncome
            }
            onBeforeMount(onCheckValid);
            onMounted(async () => {
                await getSportBalance(), await getStatistic();
            });
            return {
                putOptions,
                loading,
                capital,
                availableBalance,
                incomeAmount,
                columns,
                rows,
                accountType,
                logout,
                nickName,
                updateWinLose,
                winOrderQuan,
                loseOrderQuan
            };
        },
    };
</script>

<style scoped>
</style>