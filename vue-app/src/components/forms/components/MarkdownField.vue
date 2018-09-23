<template lang="pug">
	.field
		label.label Markdown Field: {{label}}
		.control.editor.columns
			div.column.input-area
				textarea.input(type="text" v-model="value" @input="update")
			div.column.display-area
				.compiledMarkdown(v-html="(compiledMarkdown())")
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mapActions, mapGetters, mapState } from 'vuex';
import marked from 'marked';
import { IFormField } from '../common';
import _ from 'lodash';
import { GenericInputField } from '@/components/forms/components/GenericInputField';

const DEFAULT_PLACEHOLDER = 'Enter Markdown Here';

@Component
export default class MarkdownField extends GenericInputField<string> {
	@Prop() public labelRef!: string;
	@Prop() public valueRef!: string;
	@Prop() public placeholder?: string;

	public update = _.debounce((e) => {
		this.value = e.target.value;
	}, 300);

	public computedPlaceholder() {
		return (this.placeholder ? this.placeholder : DEFAULT_PLACEHOLDER);
	}

	public compiledMarkdown() {
		return marked((this.value ? this.value : ''), { sanitize: true});
	}

	public created() {
		this.value = this.valueRef;
		this.label = this.labelRef;
	}

}
</script>

<style lang="scss">

* {
	// color: red;
}

</style>