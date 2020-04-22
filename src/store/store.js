import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    admin: false,
    token: ""
  },
  mutations: {
    changeAdmin(state, admin) {
      state.admin = admin;
    },
    changeToken(state, token) {
      state.token = token;
    }
  },
  getters: {
    admin: state => state.admin,
    token: state => state.token
  }
});
