import { RouteRecordRaw } from 'vue-router';
import Admin from 'pages/admin/Admin.vue';
import User from 'pages/users/User.vue';
import Login from 'pages/Login.vue';
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
    path: '/admin',
    component: Admin,
    name: 'admin',
    meta: { requiresAuth: true, isAdmin: true },
    children: [
      {
        path: '',
        name: 'trader',
        meta: { requiresAuth: true, isAdmin: true },
        component: () => import('pages/admin/Trader.vue'),
      },
      {
        path: 'login-exchange',
        component: () => import('src/pages/LoginExchange.vue'),
      },
    ],
  },
  {
    path: '/user/',
    component: User,
    name: 'user',
    meta: { requiresAuth: true, isAdmin: false },
    children: [
      {
        path: 'history-trading',
        component: () => import('pages/users/HistoryTrading.vue'),
      },
      {
        path: '',
        name: 'infomation',
        meta: { requiresAuth: true, isAdmin: false },
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
        path: 'setting-follow',
        component: () => import('pages/users/SettingFollow.vue'),
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
