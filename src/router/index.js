import Vue from 'vue';
import VueRouter from 'vue-router';

const ENVIRONMENT = process.env.VUE_APP_STAGE || 'local';
const CONFIG_ENVIRONMENT = require(`@/config/${ENVIRONMENT.toLowerCase()}.json`);

const { meta } = CONFIG_ENVIRONMENT.env;

Vue.use(VueRouter);

const router = new VueRouter({
  linkExactActiveClass: 'active',
  base: '/',
});

router.beforeEach((to, from, next) => {
  if (to.fullPath === '/') {
    return next({ name: 'user-list' });
  }

  document.title = `${meta.title} | ${to.meta.title}`;
  next();
});

export default router;
