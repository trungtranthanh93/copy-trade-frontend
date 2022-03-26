<template>
        <q-layout class="justify-center">
            <q-page-container class="window-height relative-position">
                <div class="row justify-center">
                    <div :class="`${$q.screen.width > 768 ? 'col-5 q-ma-md' : 'col-12 q-pa-md '}`">
                        <q-card class="q-pa-md">
                            <q-label class="text-h5-title">Ví tiền</q-label>
                            <q-separator class="q-mt-md" />
                            <q-card-section>
                                    <div class="row no-wrap q-pa-md">
                                      <div class="column col-5">
                                        <div class="q-mb-md">{{ firstWallet }}</div>
                                        <div>{{ firstWalletValue }}$</div>
                                      </div>
                                      <div class="">
                                        <q-btn
                                          push
                                          color="primary"
                                          flat
                                          icon="sync_alt"
                                          @click="swapWallet"
                                        />
                                      </div>
                                      <div class="column col-5 q-ml-md">
                                        <div class="q-mb-md">{{ secondWallet }}</div>
                                        <div>{{ secondWalletValue }}$</div>
                                      </div>
                                    </div>
                                  </q-card-section>
                                  <q-separator />
                                  <q-card-section class="q-pt-none q-mt-md">
                                    <q-input outlined placeholder="Nhập số tiền" v-model="moneySwap">
                                      <template v-slot:append>
                                        <q-btn class="bg-positive" label="Tất cả" @click="selectAllWalletValue"></q-btn>
                                      </template>
                                    </q-input>
                                  </q-card-section>
                                  <q-card-actions>
                                    <q-btn
                                      class="full-width bg-positive"
                                      label="Chuyển tiền"
                                      @click="moveUsdt"
                                    >
                                    </q-btn>
                                  </q-card-actions>
                        </q-card>
                    </div>
                </div>
            </q-page-container>
        </q-layout>
</template>
<script>
    import { ref, onBeforeMount, onMounted } from 'vue';
    import { api } from 'boot/axios';
    import { useQuasar, QSpinnerIos } from 'quasar';
    import { useRouter } from 'vue-router';
    // import DialogSwapMoney from 'layouts/DialogSwapMoney.vue';
    export default {
        setup() {
            const $router = useRouter();
            const $q = useQuasar();
            const firstWallet = ref('Tài khoản thực');
            const secondWallet = ref('USDT Wallet');
            const firstWalletValue = ref(null);
            const secondWalletValue = ref(null);
            const moneySwap = ref(null);
            ref;
            function swapWallet() {
                let firstWalletCopy = firstWallet.value;
                let firstWalletValueCopy = firstWalletValue.value;
                firstWallet.value = secondWallet.value;
                firstWalletValue.value = secondWalletValue.value;
                secondWallet.value = firstWalletCopy;
                secondWalletValue.value = firstWalletValueCopy;
            }
            async function getSportBalance() {
                try {
                    let token = localStorage.getItem('jwt');
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    let responseContent = await api.get('/users/spot-balance');
                    firstWalletValue.value = responseContent.data.availableBalance;
                    secondWalletValue.value = responseContent.data.usdtAvailableBalance;
                } catch (error) {
                    console.log(error);
                }
            }
            function selectAllWalletValue() {
                moneySwap.value = firstWalletValue.value;
            }
            async function moveUsdt() {
                $q.loading.show({
                    spinner: QSpinnerIos,
                    spinnerColor: 'yellow',
                    spinnerSize: 140,
                    backgroundColor: 'purple',
                    message: 'Đang xử lý ....',
                    messageColor: 'black',
                });
                try {
                    let token = localStorage.getItem('jwt');
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    let data = {
                        amount: moneySwap.value,
                        confirmed: true,
                        type: firstWallet.value === 'USDT Wallet' ? 'USDT_BO' : 'BO_USDT',
                    };
                    let response = await api.post('/trade/v1/move-usdt', data);
                    if (response.status !== 201) {
                        throw new Error();
                    }
                    if (response.data.ok === false) {
                        $q.notify({
                            color: 'negative',
                            position: 'top',
                            message: 'Số tiền chuyển nhập quá số tiền hiện có!',
                            icon: 'report_problem',
                        });
                    } else {
                        $q.notify({
                            color: 'green-4',
                            textColor: 'white',
                            icon: 'cloud_done',
                            message: 'Chuyển tiền thành công!',
                            position: 'top',
                        });
                        await getSportBalance();
                    }
                } catch (error) {
                    if (
                        error.response.status === 400 &&
                        error.response.data.message === 'user.isFolowing'
                    )
                        $q.notify({
                            color: 'negative',
                            position: 'top',
                            message:
                                'Chuyển tiền thất bại. Hãy dừng folow để có thể chuyển tiền!',
                            icon: 'report_problem',
                        });
                    else {
                        $q.notify({
                            color: 'negative',
                            position: 'top',
                            message: 'Chuyển tiền thất bại!',
                            icon: 'report_problem',
                        });
                    }
                } finally {
                    $q.loading.hide();
                }
            }
            onMounted(getSportBalance);

            onBeforeMount(async () => {
                let token = localStorage.getItem('jwt');
                // // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                let user = await api.get('/users/get-profile');
                if (user.data.masterId) {
                    $q.dialog({
                        title: 'Thông báo',
                        message:
                            'Bạn đang sử dụng Copy Trade. Bạn có muốn chuyển tiền?',
                        cancel: true,
                        persistent: true,
                    })
                        .onOk(async () => {
                            await api.put('/user-setting/unfolow');
                            $router.push('/user/list-master');
                            return
                        })
                        .onCancel(() => {
                            $router.push('/user/infomation-copy-trader');
                        })
                        .onDismiss(() => {
                            // console.log('I am triggered on both OK and Cancel')
                        });
                }
                if (user.data.botId) {
                    $q.dialog({
                        title: 'Thông báo',
                        message: 'Bạn đang sử dụng Auto Trade. Bạn có muốn chuyển tiền?',
                        cancel: true,
                        persistent: true,
                    })
                        .onOk(async () => {
                            await api.put('/user-setting/unfolow');
                            // $router.push('/user/list-master');
                            return
                        })
                        .onCancel(() => {
                            let data = JSON.parse(localStorage.getItem('user'));
                            console.log('data', data)
                            if (data.role == 0) {
                                $router.push('/user/information-bot');
                            } else if (data.role == 1) {
                                $router.push('/admin/information-bot');
                            }
                            return
                        })
                        .onDismiss(() => {
                            // console.log('I am triggered on both OK and Cancel')
                        });
                }
            })
            return {
                firstWallet,
                secondWallet,
                firstWalletValue,
                secondWalletValue,
                card: ref(false),
                swapWallet,
                selectAllWalletValue,
                moneySwap,
                moveUsdt,
            };
        },
    };
</script>