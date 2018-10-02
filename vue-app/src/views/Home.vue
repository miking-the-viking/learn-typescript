<template lang="pug">
	router-view 
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SideNavLayout from '@/components/layouts/SideNavLayout.vue';
import { IRouter, IRoute, extractRoutes } from '@/components/navs/AVueNav';

@Component({
	components: {
		SideNavLayout
	},
})
export default class Home extends Vue {
	private appRoutes?: IRoute[];
	
	created() {
		this.appRoutes = extractRoutes(this.$router as IRouter);
	}
}
</script>

<style lang="scss" scoped>
.main-logo {
	max-width: 20em;
	height:auto;
}
</style>
