<template>
    <!-- <q-layout container style="height: 600px"> -->
    <q-layout class="justify-center">
        <q-page-container class="window-height">
            <div class="
          q-pa-md
          fit
          wrap
          justify-center
          items-end
          content-center
          rounded-borders
          relative-position
        ">
                <div class="q-md">
                    <div class="row">
                            <div :class="`${$q.screen.width > 768 ? 'col-4' : 'col-12 q-mt-md'}`">
                                    <q-card class="q-md" style="background: linear-gradient(to right, #2980b9, #2c3e50);">
                                        <q-card-section>
                                            <div class="text-h5">
                                                <q-icon name="assignment_ind" color="white" size="3rem" /> Biệt danh chuyên gia
                                            </div>
                                        </q-card-section>

                                        <q-card-section :class="'q-pt-none txt-18'">
                                            {{ nickName }}
                                        </q-card-section>
                                    </q-card>
                                </div>
                        <div :class="`${$q.screen.width > 768 ? 'col-4' : 'col-12 q-mt-md'}`">
                            <q-card :class="`${$q.screen.width > 768 ? 'q-ml-md' : ''}`" style="background: linear-gradient(to right, #5c258d, #4389a2);">
                                <q-card-section>

                                    <div class="text-h5">
                                        <q-icon name="account_circle" color="white" size="3rem" /> Loại tài khoản</div>
                                </q-card-section>

                                <q-card-section :class="'q-pt-none txt-18'">
                                    Tài khoản
                                    <q-badge color="info" text-color="black" :label="accountType" />
                                </q-card-section>
                            </q-card>
                        </div>
                        <div :class="`${$q.screen.width > 768 ? 'col-4' : 'col-12 q-mt-md'}`">
                            <q-card :class="`${$q.screen.width > 768 ? 'q-ml-md' : ''}`" style="background: linear-gradient(to right, #134e5e, #71b280);">
                                <q-card-section>
                                    <div class="text-h5">
                                        <q-icon name="account_balance_wallet" color="white" size="3rem" /> Số dư ban đầu
                                    </div>
                                </q-card-section>

                                <q-card-section :class="'q-pt-none txt-18'">
                                    {{ capital }}
                                </q-card-section>
                            </q-card>
                        </div>
                        <div :class="`${$q.screen.width > 768 ? 'col-4 q-mt-md' : 'col-12 q-mt-md'}`">
                            <q-card class="q-md" style="background: linear-gradient(to right, #2bc0e4, #eaecc6);">
                                <q-card-section>
                                    <div class="text-h5">
                                        <q-icon name="account_balance" color="white" size="3rem" /> Số dư hiện tại</div>
                                </q-card-section>

                                <q-card-section :class="'q-pt-none txt-18'">
                                    {{ availableBalance }}
                                </q-card-section>
                            </q-card>
                        </div>
                        <div :class="`${$q.screen.width > 768 ? 'col-4 q-mt-md' : 'col-12 q-mt-md'}`">
                            <q-card :class="`${$q.screen.width > 768 ? 'q-ml-md' : ''}`" style="background: linear-gradient(to right, #4776e6, #8e54e9);">
                                <q-card-section>
                                    <div class="text-h5">
                                        <q-icon name="paid" color="white" size="3rem" /> Lợi nhuận</div>
                                </q-card-section>

                                <q-card-section :class="'q-pt-none txt-18'">
                                    {{ incomeAmount }}
                                </q-card-section>
                            </q-card>
                        </div>
                        <div :class="`${$q.screen.width > 768 ? 'col-4 q-mt-md' : 'col-12 q-mt-md'}`">
                            <q-card :class="`${$q.screen.width > 768 ? 'q-ml-md' : ''}`" style="background: linear-gradient(to right, #dd5e89, #f7bb97);">
                                <q-card-section>
                                    <div class="text-h5">
                                        <q-icon name="flag" color="white" size="3rem" /> Lệnh thắng thua
                                    </div>
                                </q-card-section>
                                <q-card-section :class="'q-pt-none txt-18'">
                                        {{ winLose ? winLose : '0/0' }}
                                </q-card-section>
                            </q-card>
                        </div>

                    </div>
                </div>

                <q-separator color="dark" class="q-mt-md q-mb-md" inset />

                <div :class="`${$q.screen.width > 768 ? 'col-12' : 'col-12 q-mt-md'}`">
                    <MontlyExport />
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
            const winLose = ref('');
            const rows = ref([]);
            const nickName = ref('');

            async function getSportBalance() {
                try {
                    let token = localStorage.getItem('jwt');
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    let responseContent = await api.get('/users/spot-balance');
                    availableBalance.value = `${responseContent.data.balance} $`;
                    capital.value = `${responseContent.data.capital} $`;
                    incomeAmount.value = `${responseContent.data.incomeAmount}$`;
                    accountType.value = `${responseContent.data.userType}`;
                } catch (error) {
                    capital.value = 'Chưa có thông tin';
                    availableBalance.value = 'Chưa có thông tin';
                    incomeAmount.value = 'Chưa có thông tin';
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
                    if (user.data.botId) {
                        $q
                            .dialog({
                                title: 'Thông báo',
                                message: 'Bạn đang follow theo bot. Bạn chắc chắn muốn dừng follow bot và tự đánh lệnh ?',
                                html: true,
                                cancel: true,
                                persistent: true,
                            })
                            .onOk(async () => {
                                await api.put('/user-setting/unfolow-bot');
                            })
                            .onCancel(() => {
                                $router.push('/admin/information-bot');
                            });
                    }
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
                winLose,
                accountType,
                logout,
                nickName
            };
        },
    };
</script>

<style>
    .txt-18 {
        font-size: 18px;
        font-weight: 500
    }
</style>