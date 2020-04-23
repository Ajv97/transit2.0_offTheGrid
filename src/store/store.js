import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    admin: false,
    token: "",
    firstname: "test1"
  },
  mutations: {
    changeAdmin(state, admin) {
      state.admin = admin;
    },
    changeToken(state, token) {
      state.token = token
    },
    changeFirstname(state, firstname){
      state.firstname = firstname
    }
  },
  getters: {
    admin: state => state.admin,
    token: state => state.token,
    firstname: state => state.firstname
  }
});
