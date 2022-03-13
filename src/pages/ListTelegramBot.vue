<template>
  <!-- <q-layout container style="height: 600px"> -->
  <q-layout class="justify-center">
    <q-page-container class="window-height">
      <q-card class="q-pa-md">
            <q-label class="text-h5-title">Danh sách BOT Telegram</q-label>
            <q-separator class="q-mt-md" />
        <div class="row q-mt-md">
            <div v-for="bot in listBot" :class="`${$q.screen.width > 768 ? 'col-3' : 'col-12 q-mt-md'}`" :key="bot.id">
                <q-card v-if="bot.link" class="bg-box q-pa-md q-ma-xs">
                   <div class="txt-14">ID: <span class="text-weight-bold">{{bot.id}}</span></div>
                   <div class="txt-14">Tên Bot: <span class="text-weight-bold">{{bot.botName}}</span></div>
                   <div class="q-mt-md text-center">
                        <q-btn class="q-px-xl q-py-xs bg-btn" label="Tham gia nhóm" icon="account_tree"
                        v-on:click="joinGroup(bot.link)" />
                   </div>
                </q-card>
            </div>
        </div>
      </q-card>
    </q-page-container>
    <router-view />
  </q-layout>
</template>
<script>

import { api } from 'boot/axios';
// import { useRouter } from 'vue-router';
// import { useQuasar, QSpinnerIos } from 'quasar';
import { ref, onMounted } from 'vue';
export default {
  setup() {
    // const $q = useQuasar();
    // const $router = useRouter();
    const listBot = ref([]);


    async function getTelegramBotList() {
      let token = localStorage.getItem('jwt');
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      let responseContent = await api.get('/bot/list');
      let data = responseContent.data;
      let index = 1;
      listBot.value = data.map((obj) => {
        obj.stt = index;
        index++;
        return obj;
      });
    }

    function joinGroup(link){
        window.location.href = link
    }

    onMounted(async () => {
      await getTelegramBotList();
    });
    return {
        listBot,
        joinGroup
    };
  },
};
</script>
<style lang="css" scoped>
.bg-box {
    background: #3a7bd5; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #3a7bd5, #3a6073); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #3a7bd5, #3a6073);
}
.bg-btn {
    background: linear-gradient(to right, #dd5e89, #C4E0E5);
}
.txt-14 {
    font-size: 14px;
}
</style>
