import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { StateInterface } from '../store';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route<StateInterface>(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });
  Router.beforeEach((to, from, next) => {
    let user: any = localStorage.getItem('user');
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!user) {
        next({
          name: 'login',
          query: { redirect: to.fullPath },
        });
      }
      user = JSON.parse(user);
      if (user.role === 0 && to.meta?.isAdmin) {
        next({
          name: 'infomation-copy-trader',
        });
      }
      if (!to.meta?.isAdmin && user.role === 1) {
        next({
          name: 'trader-solo',
        });
      }
      next();
    }
    if (to.name === 'login') {
      if (user) {
        if (user.role === 0) {
          next({
            name: 'user',
          });
        } else {
          next({
            name: 'trader-solo',
          });
        }
      } else {
        next();
      }
    }
    next();
  });
  return Router;
});
