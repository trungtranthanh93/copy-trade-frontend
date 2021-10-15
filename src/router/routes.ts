import { RouteRecordRaw } from 'vue-router';
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
    path: '/admin/',
    name: 'trader',
    meta: { requiresAuth: true, isAdmin: true },
    component: () => import('pages/admin/Trader.vue'),
  },
  {
    path: '/admin/login-exchange',
    name: 'admin-exchange',
    meta: { requiresAuth: true, isAdmin: true },
    component: () => import('src/pages/LoginExchange.vue'),
  },
  {
    path: '/admin/user-follow',
    name: 'user-follow',
    meta: { requiresAuth: true, isAdmin: true },
    component: () => import('pages/admin/UserFollow.vue'),
  },
  {
    path: '/user/',
    name: 'infomation',
    meta: { requiresAuth: true, isAdmin: false },
    component: () => import('pages/users/Information.vue'),
  },
  {
    path: '/user/list-master',
    name: 'list-master',
    meta: { requiresAuth: true, isAdmin: false },
    component: () => import('pages/users/ListMaster.vue'),
  },
  {
    path: '/user/login-exchange',
    name: 'user-exchange',
    meta: { requiresAuth: true, isAdmin: false },
    component: () => import('src/pages/LoginExchange.vue'),
  },
  {
    path: '/user/setting-follow/:masterId',
    name: 'setting-follow',
    meta: { requiresAuth: true, isAdmin: false },
    component: () => import('pages/users/SettingFollow.vue'),
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
