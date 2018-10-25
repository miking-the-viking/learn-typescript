<template lang="pug">
    .size-theme-toggler
        h1 size theme toggler
        .bd-notification.is-dark
            .field
                template(v-for="theme, key in themes")
                    input.is-checkradio.is-white(:id="'sizeRadio' + key" type="radio" name="sizeRadio" :value="key" v-model="activeTheme")
                    label(:for="'sizeRadio' + key") {{ key }}
            </div>
        </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { AppModule, SizeTheme } from '@/store/modules/app';
import RadioField from '@/components/forms/components/RadioField.vue';

@Component({
	components: {
		RadioField
	}
})
export default class SizeThemeToggler extends Vue {
	get themes() {
		return AppModule.sizeThemes;
	}

	get activeThemeClass(): string {
		return AppModule.sizeThemeClass;
	}

	get activeTheme(): string {
		return (AppModule.sizeTheme ? AppModule.sizeTheme : '');
	}

	set activeTheme(newTheme: string) {
		AppModule.SET_SIZE_THEME(newTheme);
	}
}
</script>
