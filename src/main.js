import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload, {
 lazyComponent: true
});
import staticFunction from './staticFunction';

Vue.config.productionTip = false

Vue.mixin(staticFunction);
window._ = require('lodash');
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");