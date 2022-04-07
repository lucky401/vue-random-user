import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

import '@/assets/css/main.css';

import { registerModules } from './register-modules';

import randomUserModule from './modules/random-user';

/* This is a way to register the modules that are used in the application. */
registerModules({
  randomUser: randomUserModule,
});

import vuetify from './plugins/vuetify';
import Convert from './plugins/convert';

/* This is a way to print out the version number of the application. */
import { log } from './utils/console';
const package_json = require('../package.json');

log(`Version v${package_json.version}`, 'info');

const ENVIRONMENT = process.env.VUE_APP_STAGE || 'local';
const CONFIG_ENVIRONMENT = require(`@/config/${ENVIRONMENT.toLowerCase()}.json`);
const { environment } = CONFIG_ENVIRONMENT.env;
if (environment !== 'production') {
  log(`Environment: ${environment}`, 'warning');
}

new Vue({
  router,
  store,
  Convert,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
