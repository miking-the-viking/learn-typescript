<template lang="pug">
  .about
    h1 This is an about page dude.
    Commits
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Commits from '../components/Commits.vue';

@Component({
  components: {
    Commits
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
</style>
