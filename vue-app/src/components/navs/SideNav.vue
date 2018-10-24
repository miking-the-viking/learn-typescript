<template lang="pug">
nav.sidenav(role="navigation" aria-label="side navigation")
	router-link.navbar-item.is-tab(v-for="route in routes" exact-active-class="is-active" v-bind:to="route.path" :key="route.name") {{route.name}}
		router-link.navbar-item.is-tab(v-for="child in route.children" exact-active-class="is-active" v-bind:to="child.path" :key="child.name") {{child.component.extendOptions.name}}

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VueRouter from 'vue-router';
import { AppModule } from '@/store/modules/app';
import { AVueNav, IRouter, IRoute } from './AVueNav';

@Component
export default class SideNav extends AVueNav {
	@Prop() public opened!: boolean;

	private created() {
		// tslint:disable-next-line:no-console
		console.log(this.routes);
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