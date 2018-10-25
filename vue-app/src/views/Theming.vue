<template lang="pug">
    .theming
        h1 Theming with SCSS
        <ColorThemeToggler />
        <SizeThemeToggler />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import ColorThemeToggler from '@/components/themeToggles/ColorThemeToggler.vue';
import SizeThemeToggler from '@/components/themeToggles/SizeThemeToggler.vue';

@Component({
	components: {
		ColorThemeToggler,
		SizeThemeToggler
	}
})
export default class Theming extends  Vue {
}
</script>
