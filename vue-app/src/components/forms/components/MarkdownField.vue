<template lang="pug">
	.field
		label.label Markdown Field: {{label}}
		.control.editor.columns
			div.column.input-area
				textarea.input(type="text" v-model="valueRef" @input="update")
				//- textarea.input(type="text" v-model="valueRef" @input="update")
			div.column.display-area.box
				.compiledMarkdown(v-html="(compiledMarkdown())")
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mapActions, mapGetters, mapState } from 'vuex';
import marked from 'marked';
import { IFormField } from '../common';
import _ from 'lodash';
import { GenericInputField } from '@/components/forms/abstracts/GenericInputField';

const DEFAULT_PLACEHOLDER = 'Enter Markdown Here';

@Component
export default class MarkdownField extends GenericInputField<string> {
	@Prop() public placeholder?: string;

	public update = _.debounce((e) => {
		this.value = e.target.value;
	}, 300);

	public computedPlaceholder() {
		return (this.placeholder ? this.placeholder : DEFAULT_PLACEHOLDER);
	}

	public compiledMarkdown() {
		return marked((this.value ? (this.value as string) : ''), { sanitize: true});
	}

}
</script>

<style lang="scss">

</style>