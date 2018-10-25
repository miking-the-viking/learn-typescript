import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: '/',
			name: 'home',
			// component: Home,
			component: () => import( /* webpackChunkName: "home" */ './views/Home.vue')
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ './views/About.vue'),
		},
		{
			path: '/blog',
			name: 'blog',
			component: () => import( /* webpackChunkName: "blog" */ './views/Blog.vue')
		},
		{
			path: '/theming',
			name: 'theming',
			component: () => import( /* webpackChunkName: "theming" */ './views/Theming.vue')
		}
	]
});