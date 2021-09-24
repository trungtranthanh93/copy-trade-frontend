import { RouteRecordRaw } from 'vue-router';
import Admin from 'pages/admin/Admin.vue';
import User from 'pages/users/User.vue';
import Login from 'pages/Login.vue';
import 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {

    // must be declared by every route
    requiresAuth: boolean
  }
}
const routes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: Admin ,
    meta: { requiresAuth: true},
    children: [
      { path: '', component: () => import('pages/admin/Trader.vue') }
      
    ],

  },
  {
    path: '/user/',
    component: User , 
    meta: { requiresAuth: true},
    children: [
      { path: 'history-trading', component: () => import('pages/users/HistoryTrading.vue') },
      { path: '', component: () => import('pages/users/Information.vue')},
      { path: 'list-master', component: () => import('pages/users/ListMaster.vue')},
      { path: 'login-exchange', component: () => import('pages/users/LoginExchange.vue')},
    ],
  },
  {
    path: '',
    component: Login ,
    name: 'login'
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
