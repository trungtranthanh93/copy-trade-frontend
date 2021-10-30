
<template>
  <q-layout
    view="hHh Lpr lFf"
  >
    <q-header reveal elevated class="bg-dark">
      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="drawerLeft = !drawerLeft" />
        <div v-if="!$q.platform.is.mobile">
          <img class="absolute-top-right" src="logo.png" style="height: 60px" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawerLeft"
      :width="250"
      :breakpoint="500"
      behavior="desktop"
    >
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
import { ref } from 'vue';
import MenuItem from 'components/MenuItem.vue';
import { useQuasar } from 'quasar';
const linksData = [
  {
    title: 'Copy Trader',
    caption: 'Đánh lệnh theo chuyên gia',
    icon: 'account_balance',
    iconColor: 'orange',
    link: '/admin',
    separator: true,
  },
  {
    title: 'Auto Trader',
    caption: 'Đánh lệnh theo Bot',
    icon: 'smart_toy',
    iconColor: 'orange',
    link: '/admin/information-bot',
    separator: false,
  },
  {
    title: 'Đăng nhập sàn',
    caption: 'Đăng nhập vào sàn để đồng bộ lệnh đánh',
    icon: 'login',
    iconColor: 'orange',
    link: '/admin/login-exchange',
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
  setup() {
    const $q = useQuasar();
    const leftDrawerOpen = ref(false);
    const menuLinks = ref(linksData); // Structure du menu
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      menuLinks,
      drawerLeft: ref($q.screen.width > 700),
    };
  },
  components: {
    MenuItem,
  },
};
</script>