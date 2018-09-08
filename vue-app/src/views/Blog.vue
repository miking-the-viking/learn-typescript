<template lang="pug">
  .blog
    h1 This is the blog page dude.
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Blog extends Vue {
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

<style lang="scss">

* {
  color: red;
}

</style>