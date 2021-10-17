
<template>
  <q-layout view="hhh lpR lff">

    <q-header reveal elevated class="bg-dark">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <div v-if="!$q.platform.is.mobile">
          <img class="absolute-top-right" src="logo.png" style="height: 60px" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay elevated 
      show-if-above
      :width="250"
      :breakpoint="500">
      <!-- Calcule la place pour l'image du profil -->
      <q-scroll-area style="height: 100%; border-right: 1px solid #ddd">
        <div v-if="$q.platform.is.mobile">
          <img class="top-left" src="logo.png" style="height: 40px" />
        </div>
        <q-list padding>
          <MenuItem v-for="link in menuLinks" :key="link.title" v-bind="link" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import MenuItem from 'components/MenuItem.vue';

const linksData = [
  {
    title: 'Copy Trader',
    caption: 'Đánh lệnh theo chuyên gia',
    icon: 'account_balance',
    iconColor: 'orange',
    link: '/user',
    separator: true,
  },
  {
    title: 'Auto Trader',
    caption: 'Đánh lệnh theo Bot',
    icon: 'history',
    iconColor: 'orange',
    link: '/user/auto-bot',
    separator: false,
  },
  {
    title: 'Đăng nhập sàn',
    caption: 'Đăng nhập vào sàn để đồng bộ lệnh đánh',
    icon: 'login',
    iconColor: 'orange',
    link: '/user/login-exchange',
    separator: false,
  },
  {
    title: 'Đăng xuất',
    caption: '',
    icon: 'logout',
    iconColor: 'orange',
    link: '/logout',
    separator: false,
  },
];
export default {
  setup () {
    const leftDrawerOpen = ref(false)
    const menuLinks = ref(linksData); // Structure du menu
    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      menuLinks,
    }
  },
  components: {
    MenuItem,
  },
}
</script>