import Vue from 'vue';
import '@/styles/app.scss';
// import '@/icons';
// import '@/permission';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/registerServiceWorker';
import VueApollo from 'vue-apollo';
import graphqlClient from './store/gqlClient';

// tslint:disable-next-line:no-console
console.log(graphqlClient);
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

