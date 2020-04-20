import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { store } from './store/store'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: 'YOUR_API_TOKEN',
    libraries: 'places'
  },

  installComponents: true
});

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
