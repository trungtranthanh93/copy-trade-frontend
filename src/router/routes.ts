import { RouteRecordRaw } from 'vue-router';
import Login from 'pages/Login.vue';
import Admin from 'pages/admin/Admin.vue';
import ListMaster from 'pages/superadmin/ListMaster.vue';
import User from 'pages/users/User.vue';
import Logout from 'pages/Logout.vue';
import Register from 'pages/users/Register.vue';
import 'vue-router';
declare module 'vue-router' {
  interface RouteMeta {
    isAdmin: boolean;
    // must be declared by every route
    requiresAuth: boolean;

    isSuperAdmin: boolean;
  }
}
const routes: RouteRecordRaw[] = [
  {
    path: '/superadmin/',
    component: ListMaster,
    name: 'superadmin',
    meta: { requiresAuth: true, isAdmin: false, isSuperAdmin: true },
  },
  {
    path: '/admin/',
    component: Admin,
    name: 'admin',
    meta: { requiresAuth: true, isAdmin: true, isSuperAdmin: false },
    children: [
      {
        path: 'solo',
        name: 'trader-solo',
        component: () => import('pages/admin/Trader.vue'),
      },
      {
        path: 'group/:id',
        name: 'trader-group',
        component: () => import('pages/admin/Trader.vue'),
      },
      {
        path: 'login-exchange',
        component: () => import('src/pages/LoginExchange.vue'),
      },
      {
        path: 'user-follow',
        name: 'user-follow',
        component: () => import('pages/admin/UserFollow.vue'),
      },
      {
        path: 'setting-bot',
        component: () => import('src/pages/SettingBot.vue'),
      },
      {
        path: 'setting-bot-telegram',
        component: () => import('src/pages/SettingBotTelegram.vue'),
      },
      {
        path: 'information-bot',
        component: () => import('pages/admin/Infomation.vue')
      },
      {
        path: 'montly-export',
        name: 'admin-montly-export',
        component: () => import('pages/MontlyExport.vue'),
      },
      {
        path: 'telegram-bot',
        name: 'admin-telegram-bot',
        component: () => import('pages/ListTelegramBot.vue'),
      },
      {
        path: 'home',
        name: 'home-admin',
        component: () => import('pages/admin/Home.vue'),
      },
      {
        path: 'wallet',
        name: 'wallet-admin',
        component: () => import('pages/Wallet.vue'),
      },
      {
        path: 'setting-history-copytrade',
        name: 'setting-history-copytrade-admin',
        component: () => import('pages/CopyTradeSettingHistory.vue'),
      },
      {
        path: 'setting-history-autotrade',
        name: 'setting-history-autotrade-admin',
        component: () => import('pages/AutoTradeSettingHistory.vue'),
      },
      {
        path: 'statistic-bot',
        name: 'statistic-bot-admin',
        component: () => import('pages/StatisticBot.vue'),
      }
    ],
  },
  {
    path: '/user/',
    component: User,
    name: 'user',
    meta: { requiresAuth: true, isAdmin: false, isSuperAdmin: false },
    children: [
      {
        path: 'infomation-copy-trader',
        name: 'infomation-copy-trader',
        component: () => import('pages/users/Information.vue'),
      },
      {
        path: 'infomation-copy-group',
        name: 'infomation-copy-group',
        component: () => import('pages/users/InformationGroup.vue'),
      },
      {
        path: 'list-master',
        component: () => import('pages/users/ListMaster.vue'),
      },
      {
        path: 'list-group',
        component: () => import('pages/users/ListGroup.vue'),
      },
      {
        path: 'setting-group/:groupId',
        component: () => import('pages/users/SettingGroup.vue'),
      },
      {
        path: 'login-exchange',
        component: () => import('src/pages/LoginExchange.vue'),
      },
      {
        path: 'setting-follow/:masterId',
        component: () => import('pages/users/SettingFollow.vue'),
      },
      {
        path: 'setting-bot',
        component: () => import('src/pages/SettingBot.vue'),
      },
      {
        path: 'setting-bot-telegram',
        component: () => import('src/pages/SettingBotTelegram.vue'),
      },
      {
        path: 'information-bot',
        name: 'information-bot',
        component: () => import('pages/users/InformationBot.vue'),
      },
      {
        path: 'montly-export',
        name: 'montly-export',
        component: () => import('pages/MontlyExport.vue'),
      },
      {
        path: 'telegram-bot',
        name: 'telegram-bot',
        component: () => import('pages/ListTelegramBot.vue'),
      },
      {
        path: 'home',
        name: 'home-user',
        component: () => import('pages/users/Home.vue'),
      },
      {
        path: 'wallet',
        name: 'wallet-user',
        component: () => import('pages/Wallet.vue'),
      },
      {
        path: 'setting-history-copytrade',
        name: 'setting-history-copytrade-user',
        component: () => import('pages/CopyTradeSettingHistory.vue'),
      },
      {
        path: 'setting-history-autotrade',
        name: 'setting-history-autotrade-user',
        component: () => import('pages/AutoTradeSettingHistory.vue'),
      },
      {
        path: 'statistic-bot',
        name: 'statistic-bot-user',
        component: () => import('pages/StatisticBot.vue'),
      }
    ],
  },
  {
    path: '',
    component: Login,
    name: 'login',
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
