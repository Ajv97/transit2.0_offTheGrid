import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { store } from "./store/store";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    libraries: "places"
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
