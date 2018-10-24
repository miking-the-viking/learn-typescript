<template lang="pug">
	.sidenav-layout
		SideNav(:routes="routes")
		slot.sidenav-content
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import SideNav from '@/components/navs/SideNav.vue';
import { IRoute } from '@/components/navs/AVueNav';

@Component({
	components: {
		SideNav
	},
})
export default class SideNavLayout extends Vue {
	@Prop() private routes!: IRoute[];

	private expanded: boolean = false;

}
</script>

<style lang="scss" scoped>
.main-logo {
	max-width: 20em;
	height:auto;
}
</style>
