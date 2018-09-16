<template lang="pug">
  .about
    .about-text
      h1 About MikingTheViking
      p MikingTheViking is not really a Viking, but has the heart of one.
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class About extends Vue {

}
</script>

<style lang="scss" scoped>

.about {
  margin: 1em;
}
</style>
