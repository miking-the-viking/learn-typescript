import Vue from 'vue';
import '@/styles/app.scss';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/registerServiceWorker';
import VueApollo from 'vue-apollo';
import graphqlClient from './store/gqlClient';

const apolloProvider = new VueApollo({
  	defaultClient: graphqlClient
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apollo: {

  },
  apolloProvider,
  render: (h) => h(App)
}).$mount('#app');

