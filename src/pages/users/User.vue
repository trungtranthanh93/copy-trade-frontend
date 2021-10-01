<template>
  <!-- <q-layout container style="height: 600px"> -->
  <q-layout view="hHh Lpr fff" class="shadow-10 rounded-borders" style="">
    <q-page-container>
      <!-- Effet de transition entre les pages du contenu 
      <transition :name="transitionName">
      -->
      <transition
        appear
        enter-active-class="animated fadeOut"
        leave-active-class="animated rotateOut"
        :duration="300"
      >
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>
<script>
import { api } from 'boot/axios';
import { useRouter } from 'vue-router';
import {ref, onMounted} from 'vue';

const linksData = [
  {
    title: 'Kết quả',
    caption: 'Số dư tài khoản',
    icon: 'account_balance',
    iconColor: 'black',
    link: '/user',
    separator: true,
  },
  {
    title: 'Chuyên gia',
    caption: 'Danh sách các chuyên gia',
    icon: 'format_list_numbered',
    iconColor: 'black',
    link: '/user/list-master',
    separator: false,
  },
  {
    title: 'Lịch sử',
    caption: 'Lịch sử vào lệnh',
    icon: 'history',
    iconColor: 'orange',
    link: '/user/history-trading',
    separator: false,
  },
  {
    title: 'Màn hình cài đặt lệnh',
    caption: 'Cài đặt số tiền chốt lãi , số tiền chốt lỗ,..',
    icon: 'settings',
    iconColor: 'black',
    link: '/user/setting-follow',
    separator: false,
  },
  {
    title: 'Đăng xuất',
    caption: '',
    icon: 'logout',
    iconColor: 'black',
    link: '/logout',
    separator: false,
  },
];

export default {
  setup() {
    const $router = useRouter();
    const leftDrawerOpen = ref(false);
    const  miniState = ref(false);
    const  menuLinks = ref(linksData) // Structure du menu
    const  transitionName =  ref('rotateOut'); // Effet de transition entre les pages du <q-page-container> : https://quasar.dev/options/transitions
      // Suppose la dÃ©claration de la transition dans quasar.conf.js : https://quasar.dev/options/animations
    const  message =  ref('');
    
    function drawerClick(e) {
      // if in "mini" state and user click on drawer, we switch it to "normal" mode
      if (this.miniState) {
        this.miniState = false;
        // notice we have registered an event with capture flag;
        // we need to stop further propagation as this click is
        // intended for switching drawer to "normal" mode only
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        e.stopPropagation();
      }
    }
    async function checkLoginExchange() {
      try {
        let user = localStorage.getItem('user');
        if(user.masterId === null) {
          throw new Error();
        }
        await api.post('/users/valid-token');
        //TODO follow theo chuyên gia
      } catch (error) {
        console.log(error)
        $router.push('/user/list-master');
      }
    }
    onMounted(checkLoginExchange)
    return {
      leftDrawerOpen,
      miniState,
      menuLinks,
      transitionName,
      message,
      drawerClick
    }
  },
}
</script>
<style lang="sass" scoped>
.menu-list .q-item
  border-radius: 0 32px 32px 0
</style>