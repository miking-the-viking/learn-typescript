import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      email: '',
      name: '',
      authenticated: false
    }
  },
  mutations: {

  },
  actions: {

  },
});
