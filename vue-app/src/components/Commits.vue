<template lang='pug'>
div.commits.box
  h1.title.is-3 commits for
    code.inline miking-the-viking/learn-typescript
  .columns
    .column.is-2.has-text-left
        div(v-for="branch in branches")
            input(type="radio"
            :id="branch"
            :value="branch"
            name="branch"
            v-model="currentBranch")
            label(:for="branch") {{ branch }}
    .column.is-2
        h2.title.is-size-5 {{ currentBranch }}
    .column.has-text-right
        ul
            li(v-for="record in commits")
                a(:href="record.html_url" target="_blank" class="commit") SHA: {{ record.sha.slice(0, 7) }} - Message: {{ record.commit.message}} by {{ record.commit.author.name }} at {{ record.commit.author.date }}
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { IBlogItem } from '@/store/modules/blog';
import axios,{ AxiosResponse } from 'axios';
import marked from 'marked';

const API_ROUTE = 'https://api.github.com/repos/miking-the-viking/learn-typescript/commits?per_page=3&sha=';

@Component
export default class Commits extends Vue {
  branches: string[] = ['master', 'develop'];
  currentBranch: string = 'master';
  commits: any[] | null = null;

  created() {
      this.fetchData();
  }

  
  @Watch('currentBranch')
  handleCurrentBranchUpdate() {
      this.fetchData();
  }

  async fetchData() {
      const result = await axios(API_ROUTE + this.currentBranch);
      console.log(result);
      this.commits = result.data;
  }

}
</script>

<style scoped lang="scss">
code.inline {
    display: inline;
}
</style>
