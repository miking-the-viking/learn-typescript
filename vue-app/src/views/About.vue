<template lang="pug">
  .about.columns
    Commits.column
    ApolloExample.column
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Commits from '../components/Commits.vue';
import ApolloExample from '../components/ApolloExample.vue';

@Component({
  components: {
    Commits,
    ApolloExample
  }
})
export default class About extends Vue {
  // @Prop() private msg!: string;
  // public beforeCreate() {
  //   console.log('beforeCreate');
  // }
  // public created() {
  //   console.log('created');
  // }
  // public beforeMount() {
  //   console.log('beforeMount');
  // }
  // public mounted() {
  //   console.log('mounted');
  // }
  // public beforeDestroy() {
  //   console.log('beforeDestroy');
  // }
  // public destroyed() {
  //   console.log('destroyed');
  // }
  // public beforeUpdate() {
  //   console.log('beforeUpdate');
  // }
  // public updated() {
  //   console.log('updated');
  // }
}
</script>

<style lang="scss" scoped>

.about {
  margin: 1em;
}
</style>
