<template lang="pug">
    .color-theme-toggler
        h1 color theme toggler
        .bd-notification.is-dark
            .field
                template(v-for="theme, key in themes")
                    input.is-checkradio.is-white(:id="'colorRadio' + key" type="radio" name="colorRadio" :value="key" v-model="activeTheme")
                    label(:for="'colorRadio' + key") {{ key }}
            </div>
        </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { AppModule, ColorTheme } from '@/store/modules/app';
import RadioField from '@/components/forms/components/RadioField.vue';

@Component({
	components: {
		RadioField
	}
})
export default class ColorThemeToggler extends Vue {
	get themes() {
		return AppModule.colorThemes;
	}

	get activeThemeClass(): string {
		return AppModule.colorThemeClass;
	}

	get activeTheme(): string {
		return (AppModule.colorTheme ? AppModule.colorTheme : '');
	}

	set activeTheme(newTheme: string) {
		AppModule.SET_COLOR_THEME(newTheme);
	}
}
</script>
