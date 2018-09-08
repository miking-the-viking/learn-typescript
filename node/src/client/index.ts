import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';
import Example from './components/Example.vue';
import examples from '../../examples';

if (!window.appData) {
  console.error('no appData detected');
}

Vue.config.devtools = true;

Vue.use(Router);

new Vue({
    router: new Router({
      routes: [
        {
          name: 'example',
          path: '/examples/:example',
          component: Example,
          props: (route) => examples.find(example => example.name === route.params.example),
          beforeEnter(to, from, next) {
            examples.find(example => example.name === to.params.example) ? next() : next(false)
          }
        },
        {
          path: '*',
          component: {
            render(h) { return h('div', '404. Not Found.') }
          }
        }
      ]
    }),
    ...App
  }).$mount('#app');