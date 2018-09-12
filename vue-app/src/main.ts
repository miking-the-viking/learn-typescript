import Vue from 'vue';
import '@/styles/app.scss';
// import '@/icons';
// import '@/permission';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/registerServiceWorker';

import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: "https://api.graphcms.com/simple/v1/awesomeTalksClone"
  })
})

Vue.use(VueApollo)

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App)
}).$mount('#app');
