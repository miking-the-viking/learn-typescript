<template lang="pug">
  .home
    img.main-logo(alt="Vue logo" src="../assets/logo.png")
    //- HelloWorld(msg="Welcome to Your Vue.js + TypeScript App")
  </div>
</template>

<script lang="ts">
// <template>
//   <div class="home">
//     <img alt="Vue logo" src="../assets/logo.png">
//     <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
//   </div>
// </template>
import { Component, Vue } from 'vue-property-decorator';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  // components: {
  //   HelloWorld,
  // },
})
export default class Home extends Vue {


}
</script>

<style lang="scss" scoped>
.main-logo {
  max-width: 20em;
  height:auto;
}
</style>
