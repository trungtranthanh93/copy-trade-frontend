<template>
  <q-layout view="hHh Lpr lFf">
    <q-header reveal elevated class="bg-dark">
      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="drawerLeft = !drawerLeft" />
        <div>
          <img class="absolute-top-right logo" src="logo.png" :style="`${$q.screen.width > 768 ? 'height: 60px; margin-right: 1%' : 'height: 60px; margin-right: 3%'}`" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawerLeft"
      :width="250"
      :breakpoint="500"
    >
      <q-scroll-area style="height: 100%; border-right: 1px solid #ddd">
        <!-- <div v-if="$q.platform.is.mobile">
          <img class="top-left" src="logo.png" style="height: 40px; margin-right: 2%;" />
        </div> -->
        <q-list padding>
        <MenuItem title='Trang chủ' caption='' icon='home' iconColor='orange' link='/admin/home' />

        <q-separator />
          <q-expansion-item :content-inset-level="0.5">
            <template v-slot:header>
              <q-item-section avatar>
                <q-icon name="groups" color="orange" />
              </q-item-section>
              <q-item-section>Copy Trade</q-item-section>
            </template>
            <MenuItem
              v-for="link in groupLinks"
              :key="link.title"
              v-bind="link"
            />
          </q-expansion-item>
          <q-separator />
          <q-expansion-item :content-inset-level="0.5">
            <template v-slot:header>
              <q-item-section avatar>
                <q-icon name="smart_toy" color="orange" />
              </q-item-section>
              <q-item-section>Auto Trade</q-item-section>
            </template>
            <MenuItem
              title= 'Bot có sẵn'
              caption= ''
              icon= 'auto_fix_high'
              iconColor= 'orange'
              link= '/admin/setting-bot'
            />
            <q-expansion-item :content-inset-level="0.5">
            <template v-slot:header>
              <q-item-section avatar>
                <q-icon name="telegram" color="orange" />
              </q-item-section>
              <q-item-section>Bot Telegram</q-item-section>
            </template>
            <MenuItem
              title= 'Tham gia nhóm'
              caption= ''
              icon= 'add_box'
              iconColor= 'orange'
              link= '/admin/telegram-bot'
            />
            <MenuItem
              title= 'Cài đặt'
              caption= ''
              icon= 'settings_suggest'
              iconColor= 'orange'
              link= '/admin/setting-bot-telegram'
            />
            </q-expansion-item>

          </q-expansion-item>
          <q-separator />
          <MenuItem title='Chuyển tiền' caption='' icon='account_balance_wallet' iconColor='orange' link='/admin/wallet' />
        <q-expansion-item :content-inset-level="0.5">
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon name="phonelink_setup" color="orange" />
            </q-item-section>
            <q-item-section>Lịch sử cài đặt</q-item-section>
          </template>
          <!-- <MenuItem title='Copy Trade' caption='' icon='' iconColor='orange' link='/admin/setting-history-copytrade' /> -->
          <MenuItem title='Auto Trade' caption='' icon='' iconColor='orange' link='/admin/setting-history-autotrade' />
        </q-expansion-item>
        <q-separator />
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
import { ref, onBeforeMount } from 'vue';
import MenuItem from 'components/MenuItem.vue';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';
import _ from 'lodash';
const linksData = [
  // {
  //   title: 'Ví',
  //   caption: '',
  //   icon: 'account_balance_wallet',
  //   iconColor: 'orange',
  //   link: '/admin/information-bot',
  //   separator: false,
  // },
  // {
  //   title: 'Thống kê',
  //   caption: 'Thống kê lãi từng ngày trong tháng',
  //   icon: 'analytics',
  //   iconColor: 'orange',
  //   link: '/admin/montly-export',
  //   separator: true,
  // },
  {
    title: 'Kết nối sàn',
    caption: 'Kết nối vào sàn để đồng bộ lệnh đánh',
    icon: 'login',
    iconColor: 'orange',
    link: '/admin/login-exchange',
    separator: true,
  },
  {
    title: 'Đăng xuất',
    caption: '',
    icon: 'logout',
    iconColor: 'orange',
    link: '/logout',
    separator: true,
  },
];

export default {
  setup() {
    const $q = useQuasar();
    const leftDrawerOpen = ref(false);
    const menuLinks = ref(linksData); // Structure du menu
    const groupLinks = ref(null);
    async function getListGroup() {
      let token = localStorage.getItem('jwt');
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      let responseContent = await api.get('/group/all');
      let data = responseContent.data;
      let links = [
        {
          title: 'Solo',
          caption: 'Đánh lệnh theo chuyên gia',
          icon: 'person',
          iconColor: 'orange',
          link: '/admin/solo',
          separator: true,
        },
      ];
      _.each(data, (obj) => {
        links.push({
          title: obj.groupName,
          link: '/admin/group/' + obj.id,
          icon: 'group',
          iconColor: 'orange',
          separator: true,
        });
      });
      groupLinks.value = links;
    }
    onBeforeMount(getListGroup);

    let autoTradeLinks =  [
      {
        title: 'Bot có sẵn',
        caption: '',
        icon: 'settings',
        iconColor: 'orange',
        link: '/',
        separator: false
      },
      {
        title: 'Bot Telegram',
        caption: '',
        icon: 'telegram',
        iconColor: 'orange',
        link: '/',
        separator: false
      }
    ];

    return {
      leftDrawerOpen: ref(false),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      menuLinks,
      groupLinks,
      autoTradeLinks,
      drawerLeft: ref($q.screen.width > 500),
    };
  },

  components: {
    MenuItem,
  },
};
</script>
