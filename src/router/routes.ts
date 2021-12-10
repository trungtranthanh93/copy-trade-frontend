import { RouteRecordRaw } from 'vue-router';
import Login from 'pages/Login.vue';
import Admin from 'pages/admin/Admin.vue';
import User from 'pages/users/User.vue';
import Logout from 'pages/Logout.vue';
import Register from 'pages/users/Register.vue';
import 'vue-router';
declare module 'vue-router' {
  interface RouteMeta {
    isAdmin: boolean;
    // must be declared by every route
    requiresAuth: boolean;
  }
}
const routes: RouteRecordRaw[] = [
  {
    path: '/admin/',
    component: Admin,
    name: 'admin',
    meta: { requiresAuth: true, isAdmin: true },
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
        path: 'information-bot',
        component: () => import('pages/admin/Infomation.vue')
      }
    ],
  },
  {
    path: '/user/',
    component: User,
    name: 'user',
    meta: { requiresAuth: true, isAdmin: false },
    children: [
      {
        path: 'infomation-copy-trader',
        name: 'infomation-copy-trader',
        component: () => import('pages/users/Information.vue'),
      },
      {
        path: 'list-master',
        component: () => import('pages/users/ListMaster.vue'),
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
        path: 'information-bot',
        name: 'information-bot',
        component: () => import('pages/users/InformationBot.vue'),
      },
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
