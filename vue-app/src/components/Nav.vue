<template lang="pug">
nav.navbar(role="navigation" aria-label="main navigation")
	<!-- Branding and Hamburger -->
	.navbar-brand
		a.navbar-item.logo-container(v-on:click="toggleSidebar")
			img.logo(src="../assets/logo.png" alt="Bulma: a modern CSS framework based on Flexbox")
		a.navbar-burger(role="button" aria-label="menu" aria-expanded="false")
			span(aria-hidden="true")
			span(aria-hidden="true")
			span(aria-hidden="true")
	<!-- Navbar Menu -->
	<!-- Hidden on mobile, needs .is-active added at those sizes -->
	.navbar-menu(v-bind:class="{ 'is-active': menuIsActive }")
	router-link.navbar-item.is-tab(v-for="route in routes" exact-active-class="is-active" v-bind:to="route.path" :key="route.name") {{route.name}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VueRouter from 'vue-router';
import { AppModule } from '@/store/modules/app';

interface INav {
	menuIsActive: boolean;
	routes: IRoute[];
}

interface IRoute {
	name: string;
	path: string;
	children?: Array<{
		path: string,
		component: Vue
	}>;
}

interface IRouter extends VueRouter {
	options: {
		routes: IRoute[];
	};
}

@Component
export default class Nav extends Vue implements INav {
	public menuIsActive: boolean = false;
	public routes: IRoute[] = [];
	@Prop() private opened!: boolean;
	@Prop() private toggleSidebar!: () => void;

	public created() {
		this.routes = this.getRoutes();
	}

	private getRoutes() {
		return ((this.$router as IRouter).options.routes.map((val, index) => {
			return {
				name: val.name,
				path: val.path
			};
		}));
	}
}
</script>

<style lang="scss" scoped>

.navbar-brand {
	.navbar-item.logo-container {
		img.logo {
			min-width:7em;
			max-height:5em;
			max-width:7em;
		}
	}
}
.navbar-item {
	transition: all 0.25s;
}

</style>