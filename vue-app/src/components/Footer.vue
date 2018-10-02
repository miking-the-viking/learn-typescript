<template lang="pug">
footer.footer
    .content.has-text-centered
        p
            strong Viking's TypeScript-Vue App
        |   I hope you enjoy the demo!
    .columns
        //- Commits.commits.column.is-12-tablet.is-8-desktop.is-centered-desktop.is-4-fullhd
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Commits from '../components/Commits.vue';

@Component({
	components: {
		Commits
	}
})
export default class Footer extends Vue {
}
</script>

<style lang="scss" scoped>
</style>