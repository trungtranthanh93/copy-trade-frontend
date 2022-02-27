<template>
  <q-layout view="hHh Lpr lFf">
    <q-header reveal elevated class="bg-dark">
      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="drawerLeft = !drawerLeft" />
        <div v-if="!$q.platform.is.mobile">
          <img class="absolute-top-right" src="logo.png" style="height: 60px" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerLeft" :width="250" :breakpoint="500">
      <q-scroll-area style="height: 100%; border-right: 1px solid #ddd">
        <div v-if="$q.platform.is.mobile">
          <img class="top-left" src="logo.png" style="height: 40px" />
        </div>
        <q-list padding>
          <MenuItem :key="menuLinks[0].title" v-bind="menuLinks[0]" />
          <MenuItem :key="menuLinks[1].title" v-bind="menuLinks[1]" />
          <MenuItem :key="menuLinks[2].title" v-bind="menuLinks[2]" />
          <!-- <q-expansion-item :content-inset-level="0.5">
            <template v-slot:header>
              <q-item-section avatar>
                <q-icon name="star" color="orange" />
              </q-item-section>
              <q-item-section>Bot Vip</q-item-section>
            </template>
            <MenuItem :key="menuLinks[6].title" v-bind="menuLinks[6]" />
            <MenuItem :key="menuLinks[7].title" v-bind="menuLinks[7]" />
            <MenuItem :key="menuLinks[8].title" v-bind="menuLinks[8]" />
          </q-expansion-item> -->
          <MenuItem :key="menuLinks[4].title" v-bind="menuLinks[4]" />
          <MenuItem :key="menuLinks[3].title" v-bind="menuLinks[3]" />
          <MenuItem :key="menuLinks[5].title" v-bind="menuLinks[5]" />
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
    link: '/user/infomation-copy-trader',
    separator: false,
  },
  {
    title: 'Group Trader',
    caption: 'Đánh lệnh theo nhóm chuyên gia',
    icon: 'groups',
    iconColor: 'orange',
    link: '/user/infomation-copy-group',
    separator: false,
  },
  {
    title: 'Auto Trader',
    caption: 'Đánh lệnh theo Bot',
    icon: 'smart_toy',
    iconColor: 'orange',
    link: '/user/information-bot',
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
    title: 'Thống kê',
    caption: 'Thống kê lãi từng ngày trong tháng',
    icon: 'analytics',
    iconColor: 'orange',
    link: '/user/montly-export',
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
  {
    title: 'Bot Vip 30',
    caption: 'Đánh lệnh theo bot.Tài khoản tối thiểu 30$',
    icon: 'stars',
    iconColor: 'orange',
    link: '/bot-vip-30',
    separator: false,
  },
  {
    title: 'Bot Vip 50',
    caption: 'Đánh lệnh theo bot.Tài khoản tối thiểu 50$',
    icon: 'stars',
    iconColor: 'orange',
    link: '/bot-vip-50',
    separator: false,
  },
  {
    title: 'Bot Vip 60',
    caption: 'Đánh lệnh theo bot.Tài khoản tối thiểu 60$',
    icon: 'stars',
    iconColor: 'orange',
    link: '/bot-vip-60',
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
      drawerLeft: ref($q.screen.width > 500),
    };
  },
  components: {
    MenuItem,
  },
};
</script>
