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
        <MenuItem title='Trang Chủ' caption='' icon='home' iconColor='orange' link='/admin/home' />

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
            <q-expansion-item :content-inset-level="0.5">
              <template v-slot:header>
                <q-item-section avatar>
                  <q-icon name="celebration" color="orange" />
                </q-item-section>
                <q-item-section>Nổ Hũ</q-item-section>
              </template>
              <MenuItem title='MH Kết Quả' caption='' icon='task' iconColor='orange' link='/admin/information-bot' />
              <MenuItem title='Cài Đặt' caption='' icon='settings' iconColor='orange' link='/admin/setting-bot' />
              <q-separator />
              <MenuItem title='Thống Kê' caption='' icon='sticky_note_2' iconColor='orange'
                link='/admin/statistic-bot-9-win-lose' />
            </q-expansion-item>
            <q-expansion-item :content-inset-level="0.5">
              <template v-slot:header>
                <q-item-section avatar>
                  <q-icon name="import_export" color="orange" />
                </q-item-section>
                <q-item-section>Né Lose</q-item-section>
              </template>
              <MenuItem title='MH Kết Quả' caption='' icon='task' iconColor='orange' link='/admin/information-bot-winlose' />
              <MenuItem title='Cài Đặt' caption='' icon='settings' iconColor='orange' link='/admin/setting-bot-winlose' />
              <q-separator />
              <MenuItem title='Thống Kê' caption='' icon='sticky_note_2' iconColor='orange' link='/admin/session-statistic-bot' />
            </q-expansion-item>
            <!-- <MenuItem title='Lịch Sử Cài Đặt' caption='' icon='auto_fix_high' iconColor='orange' link='/admin/setting-history-autotrade' /> -->
          </q-expansion-item>
          <q-separator />
          <MenuItem title='Chuyển Tiền' caption='' icon='account_balance_wallet' iconColor='orange' link='/admin/wallet' />
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
    title: 'Kết Nối Sàn',
    caption: 'Kết nối vào sàn để đồng bộ lệnh đánh',
    icon: 'login',
    iconColor: 'orange',
    link: '/admin/login-exchange',
    separator: true,
  },
  {
    title: 'Đăng Xuất',
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

    let linksTelegram =  [
    {
        title: 'KINGAI 1.3',
        caption: '',
        icon: 'arrow_right',
        iconColor: 'orange',
        link: 'https://t.me/kingai13',
        separator: true
      },
      {
        title: 'KINGAI 1.4',
        caption: '',
        icon: 'arrow_right',
        iconColor: 'orange',
        link: 'https://t.me/+GEpYLNzVc8UzZWZl',
        separator: true
      },
      {
        title: 'KINGAI 1.5',
        caption: '',
        icon: 'arrow_right',
        iconColor: 'orange',
        link: 'https://t.me/+bqmY6guu9tw0OTA1',
        separator: true
      },
      {
        title: 'KINGAI 1.6',
        caption: '',
        icon: 'arrow_right',
        iconColor: 'orange',
        link: 'https://t.me/kingai16',
        separator: true
      },
      {
        title: 'KINGAI 1.7',
        caption: '',
        icon: 'arrow_right',
        iconColor: 'orange',
        link: 'https://t.me/kingai17',
        separator: true
      }
      // {
      //   title: 'NỐI BÓNG',
      //   caption: '',
      //   icon: 'arrow_right',
      //   iconColor: 'orange',
      //   link: 'https://t.me/+PEpW6H9jhe4yN2E1',
      //   separator: true
      // }
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
      linksTelegram
    };
  },

  components: {
    MenuItem,
  },
};
</script>
<style scoped>
.text-none {
  text-decoration: none
}
</style>
