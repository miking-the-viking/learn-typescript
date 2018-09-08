<template lang='pug'>
div.commits
  h1 commits
  div(v-for="branch in branches")
    input(type="radio"
      :id="branch"
      :value="branch"
      name="branch"
      v-model="currentBranch")
    label(:for="branch") {{ branch }}
  p {{ currentBranch }}
  ul
    li(v-for="record in commits")
      a(:href="record.html_url" target="_blank" class="commit") {{ record.sha.slice(0, 7) }} - {{ record.commit.message | truncate }} by {{ record.commit.author.name }} at {{ record.commit.author.date | formatDate }}
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { IBlogItem } from '@/store/modules/blog';
import axios,{ AxiosResponse } from 'axios';
import marked from 'marked';

const API_ROUTE = 'https://api.github.com/repos/miking-the-viking/learn-typescript/commits?per_page=8&sha=';

@Component
export default class Commits extends Vue {
  branches: string[] = ['master'];
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
    //   this.commits = JSON.parse((result as { responseText: string }).responseText);
    //   let xhr = new XMLHttpRequest();
    //   let self = this;
    //   xhr.open('GET', API_ROUTE + self.currentBranch);
    //   xhr.onload = () => {
        //   this.commits = JSON.parse(xhr.responseText);
        //   console.log(this.commits[0].html_url);
    //   } 
    //   xhr.send();
  }

//   filters = () => {
//     return {
//         truncate: (v:string) => {
//             let newline = v.indexOf('\n')
//             return newline > 0 ? v.slice(0, newline) : v
//         },
//         formatDate: (v) => {
//             return v.replace(/T|Z/g, ' ')
//         }
//     }
//   };
}
</script>

<style scoped lang="scss">

</style>
