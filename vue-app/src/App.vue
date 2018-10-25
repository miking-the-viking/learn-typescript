<template lang="pug">
  #app
    Nav
    transition(name="fade" mode="out-in")
      router-view
    Footer
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
import Footer from '@/components/Footer.vue';
import Nav from '@/components/Nav.vue'; // @ is an alias to /src

@Component({
  components: {
	  Footer,
	  Nav
  },
})
export default class App extends Vue {
	get colorThemeClass() {
		return AppModule.colorThemeClass;
	}

	get sizeThemeClass() {
		return AppModule.sizeThemeClass;
	}
}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
