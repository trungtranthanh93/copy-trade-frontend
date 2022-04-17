<template>
  <q-layout view="hHh Lpr lFf">
    <q-header reveal elevated class="bg-dark">
      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="drawerLeft = !drawerLeft" />
        <div>
          <img class="absolute-top-right" src="logo.png"
            :style="`${$q.screen.width > 768 ? 'height: 60px; margin-right: 1%' : 'height: 60px; margin-right: 3%'}`" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerLeft" :width="250" :breakpoint="500">
      <q-scroll-area style="height: 100%; border-right: 1px solid #ddd">
        <q-list padding>
          <MenuItem title='Trang Chủ' caption='' icon='home' iconColor='orange' link='/user/home' />
          <q-expansion-item :content-inset-level="0.5">
            <template v-slot:header>
              <q-item-section avatar>
                <q-icon name="add_task" color="orange" />
              </q-item-section>
              <q-item-section>Copy Trade</q-item-section>
            </template>
            <MenuItem :key="menuLinks[0].title" v-bind="menuLinks[0]" />
            <!-- <MenuItem :key="menuLinks[1].title" v-bind="menuLinks[1]" /> -->
            <MenuItem title='Lịch Sử Cài Đặt' caption='' icon='auto_fix_high' iconColor='orange' link='/user/setting-history-copytrade' />
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
              <MenuItem title='MH Kết Quả' caption='' icon='task' iconColor='orange' link='/user/information-bot' />
              <MenuItem title='Cài Đặt' caption='' icon='settings' iconColor='orange' link='/user/setting-bot' />
              <q-separator />
              <MenuItem title='Thống Kê' caption='' icon='sticky_note_2' iconColor='orange'
                link='/user/statistic-bot-9-win-lose' />
            </q-expansion-item>
            <q-expansion-item :content-inset-level="0.5">
              <template v-slot:header>
                <q-item-section avatar>
                  <q-icon name="import_export" color="orange" />
                </q-item-section>
                <q-item-section>Né Lose</q-item-section>
              </template>
              <MenuItem title='MH Kết Quả' caption='' icon='task' iconColor='orange' link='/user/information-bot-winlose' />
              <MenuItem title='Cài Đặt' caption='' icon='settings' iconColor='orange' link='/user/setting-bot-winlose' />
              <q-separator />
              <MenuItem title='Thống Kê' caption='' icon='sticky_note_2' iconColor='orange' link='/user/session-statistic-bot' />
            </q-expansion-item>
          </q-expansion-item>
          <q-separator />
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
          <!-- <MenuItem title='Chuyển Tiền' caption='' icon='account_balance_wallet' iconColor='orange' link='/user/wallet' /> -->
          <MenuItem :key="menuLinks[3].title" v-bind="menuLinks[3]" />
          <MenuItem :key="menuLinks[4].title" v-bind="menuLinks[4]" />
          <!-- <MenuItem :key="menuLinks[5].title" v-bind="menuLinks[5]" /> -->
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
      title: 'Danh Sách Chuyên Gia',
      caption: 'Đánh lệnh theo chuyên gia',
      icon: 'ballot',
      iconColor: 'orange',
      link: '/user/infomation-copy-trader',
      separator: true,
    },
    {
      title: 'Group Trade',
      caption: 'Đánh lệnh theo nhóm chuyên gia',
      icon: 'groups',
      iconColor: 'orange',
      link: '/user/infomation-copy-group',
      separator: true,
    },
    {
      title: 'Auto Trade',
      caption: 'Đánh lệnh theo Bot',
      icon: 'smart_toy',
      iconColor: 'orange',
      link: '/user/information-bot',
      separator: true,
    },
    {
      title: 'Kết Nối Sàn',
      caption: 'Đăng nhập vào sàn để đồng bộ lệnh đánh',
      icon: 'login',
      iconColor: 'orange',
      link: '/user/login-exchange',
      separator: true,
    },
    // {
    //   title: 'Thống kê',
    //   caption: 'Thống kê lãi từng ngày trong tháng',
    //   icon: 'analytics',
    //   iconColor: 'orange',
    //   link: '/user/montly-export',
    //   separator: true,
    // },
    {
      title: 'Đăng Xuất',
      caption: '',
      icon: 'logout',
      iconColor: 'orange',
      link: '/logout',
      separator: true,
    }
  ];
  const linksBotVip = [
      {
        title: 'Bot Vip 30',
        caption: 'Đánh lệnh theo bot.Tài khoản tối thiểu 30$',
        icon: 'stars',
        iconColor: 'orange',
        link: '/bot-vip-30',
        separator: true,
      },
      {
        title: 'Bot Vip 50',
        caption: 'Đánh lệnh theo bot.Tài khoản tối thiểu 50$',
        icon: 'stars',
        iconColor: 'orange',
        link: '/bot-vip-50',
        separator: true,
      },
      {
        title: 'Bot Vip 60',
        caption: 'Đánh lệnh theo bot.Tài khoản tối thiểu 60$',
        icon: 'stars',
        iconColor: 'orange',
        link: '/bot-vip-60',
        separator: true,
      },
  ]
  export default {
    setup() {
      const $q = useQuasar();
      const leftDrawerOpen = ref(false);
      const menuLinks = ref(linksData); // Structure du menu
      const menuLinksBotVip = ref(linksBotVip);

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
        leftDrawerOpen,
        toggleLeftDrawer() {
          leftDrawerOpen.value = !leftDrawerOpen.value;
        },
        menuLinks,
        drawerLeft: ref($q.screen.width > 500),
        menuLinksBotVip,
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