<template>
  <!-- <q-layout container style="height: 600px"> -->
  <q-layout view="hHh Lpr fff" class="shadow-10 rounded-borders" style="background: linear-gradient(135deg, #ea5c54 0%, #bb6dec 100%)">
    <!-- Header : barre du haut -->
    <q-header elevated class="bg-blue-9">
      <q-toolbar class="glossy">
        <q-btn
          flat
          round
          dense
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <!-- Titre de l'appli -->
        <q-toolbar-title style="color-text: red">
          <router-link
            to="/"
            class="text-white text-bold"
            style="text-decoration: none"
            >Màn hình người dùng</router-link
          >
        </q-toolbar-title>

        <!-- Remplissage d'espaces dans le DOM flexbox -->
        <q-space />
      </q-toolbar>
    </q-header>

    <!-- Menu latÃ©ral gauche -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      :breakpoint="500"
    >
      <!-- Calcule la place pour l'image du profil -->
      <q-scroll-area style="height: 100%; border-right: 1px solid #ddd">
        <q-list padding>
          <q-item-label header class="text-grey-8">Menu</q-item-label>
          <MenuItem v-for="link in menuLinks" :key="link.title" v-bind="link" />
        </q-list>
      </q-scroll-area>
      <!-- Bouton de repli (can be anything) qui replie le menu en mini-mode (Icone seule) -->
    </q-drawer>

    <q-page-container>
      <!-- Effet de transition entre les pages du contenu 
      <transition :name="transitionName">
      --> 
      <div class="text-right text-h6">{{message}}</div>
       <q-separator />
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
import MenuItem from 'components/MenuItem.vue';
import { api } from 'boot/axios';

const linksData = [
  {
    title: 'Kết quả',
    caption: 'Số dư tài khoản',
    icon: 'account_balance',
    iconColor: 'blue',
    link: '/user',
    separator: true,
  },
  {
    title: 'Chuyên gia',
    caption: 'Danh sách các chuyên gia',
    icon: 'format_list_numbered',
    iconColor: 'pink',
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
    title: 'Đăng nhập sàn',
    caption: 'Trước khi follow theo chuyên gia cần thực hiện đăng nhập vào sàn',
    icon: 'login',
    iconColor: 'black',
    link: '/user/login-exchange',
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
];

export default {
  name: 'MainLayout',
  components: {
    MenuItem,
  },
  data() {
    return {
      leftDrawerOpen: false,
      miniState: false,
      menuLinks: linksData, // Structure du menu
      transitionName: 'rotateOut', // Effet de transition entre les pages du <q-page-container> : https://quasar.dev/options/transitions
      // Suppose la dÃ©claration de la transition dans quasar.conf.js : https://quasar.dev/options/animations
      message: ''
    };
  },

  methods: {
    drawerClick(e) {
      // if in "mini" state and user click on drawer, we switch it to "normal" mode
      if (this.miniState) {
        this.miniState = false;
        // notice we have registered an event with capture flag;
        // we need to stop further propagation as this click is
        // intended for switching drawer to "normal" mode only
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        e.stopPropagation();
      }
    },
    async getSportBalance(){
      try {
        let token = localStorage.getItem('jwt');
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let responseContent = await api.get('/users/spot-balance');
        // Sau này sẽ thay bằng tài khoản thực
        this.message = `Số dư tài khoản của bạn là ${responseContent.data.demoBalance}$`
      } catch (error) {
        this.message = "Chưa có thông tin do chưa kết nối với sàn"
      }

    }
  },
  async beforeMount() {
    await this.getSportBalance()
  },
};
</script>
<style lang="sass" scoped>
.menu-list .q-item
    border-radius: 0 32px 32px 0
</style>