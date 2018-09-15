<template lang='pug'>
div.commits.box
  h5.title.is-5 commits for
    code.inline miking-the-viking/learn-typescript
  .columns
    .column.is-2-tablet.has-text-left
        .is-size-7(v-for="(branch, branchTitle) in branches")
            input(type="radio"
            :id="branchTitle"
            :value="branchTitle"
            name="branch"
            v-model="localCurrentBranch")
            label(:for="branchTitle") {{ branchTitle }}
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

// const UPDATE_FREQUENCY = 300000;	// 5 minutes
const UPDATE_FREQUENCY = 5000;	// 5 minutes

@Component
export default class Commits extends Vue {
  private localCurrentBranch = this.currentBranch;
  private autoUpdateInterval: null | NodeJS.Timer = null;
  get branches() {
	return CommitsModule.branches;
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

  private created() {
	CommitsModule.LOAD_BRANCHES();
	if (this.autoUpdate && this.autoUpdateInterval === null) {
		this.autoUpdateInterval = setInterval(() => { CommitsModule.LOAD_BRANCHES(); }, UPDATE_FREQUENCY) as NodeJS.Timer;
	}
  }

  @Watch('localCurrentBranch')
  private handleCurrentBranchUpdate() {
	CommitsModule.SET_CURRENT_BRANCH(this.localCurrentBranch);
  }

  private beforeDestroy() {
	  clearInterval(this.autoUpdateInterval as NodeJS.Timer);
  }

}
</script>

<style scoped lang="scss">
code.inline {
    display: inline;
}
</style>
