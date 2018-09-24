<template lang='pug'>
.commits.box
	h5.title.is-5 Latest Commits: 
		code.inline miking-the-viking/learn-typescript
	hr
	.columns
		.column.is-3-tablet.has-text-left
			.is-size-7.radio-option(v-for="branchTitle in branchList")
				label(:for="branchTitle")
					input.radio-input(type="radio"
					:id="branchTitle"
					:value="branchTitle"
					v-model="localCurrentBranch")
					| {{ branchTitle }}
			//- RadioField(v-model="localCurrentBranch" :labelRef="'develop'" :valueRef="'develop'")
			//- RadioField(v-model="localCurrentBranch" :labelRef="'master'" :valueRef="'master'")
		.column.is-2-tablet
			h6.title.is-7.is-size-7 {{ localCurrentBranch }}
		.column.has-text-right.is-size-7
			ul
				li(v-for="commit in commits")
					a(:href="commit.html_url" target="_blank" class="commit") SHA: {{ commit.sha.slice(0, 7) }} - Message: {{ commit.commit.message}} by {{ commit.commit.author.name }} at {{ commit.commit.author.date }}
					hr
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { CommitsModule } from '@/store/modules/commits';
import { setInterval } from 'timers';
import RadioField from '@/components/forms/components/RadioField.vue';

@Component({
	components: {
		RadioField
	}
})
export default class Commits extends Vue {
	get localCurrentBranch() {
		return this.currentBranch;
	}
	set localCurrentBranch(branch: string) {
		CommitsModule.SET_CURRENT_BRANCH(branch);
	}

	get branches() {
		return CommitsModule.branches;
	}

	get branchList() {
		return CommitsModule.branchList;
	}

	get commits() {
		return this.branches[this.currentBranch].commits;
  	}

  	get currentBranch() {
		return CommitsModule.currentBranch;
  	}

  	get autoUpdate() {
		return CommitsModule.autoUpdate;
  	}

  	private async created() {
		await CommitsModule.LOAD_BRANCH_LIST();
		CommitsModule.LOAD_BRANCHES();
		this.localCurrentBranch = this.currentBranch;
  	}

}
</script>

<style scoped lang="scss">
code.inline {
    display: inline;
}
.radio-option label {
	cursor: pointer;
}
.radio-input {
	margin-right: 0.6em;
}
</style>
