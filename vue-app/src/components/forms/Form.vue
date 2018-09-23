<template lang="pug">
		form.form(@submit="performSubmit")
				h1.title {{formTitle}}
				.field(v-for="field in value" v-bind:key="field.label")
					InputField(v-if="isInput(field)" v-model="field.value" v-bind:labelRef="field.label" v-bind:placeholder="(field.placeholder ? field.placeholder : undefined)")
					MarkdownField(v-else-if="isMarkdown(field)" v-model="field.value" v-bind:label="field.label" v-bind:placeholder="(field.placeholder ? field.placeholder : undefined)")
					p(v-else) ERROR: UNKNOWN FORM TYPE: {{field.type}}
				button.button(type="button" @click="performSubmit") Create Blog Post
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapActions, mapGetters, mapState } from 'vuex';
import InputField from './components/InputField.vue';
import MarkdownField from './components/MarkdownField.vue';
import { FormFieldType, IFormField, IFieldValue } from './common';

@Component({
	components: {
		InputField,
		MarkdownField
	}
})
export default class Form extends Vue {
	@Prop() private readonly formTitle!: string;
	@Prop() private readonly value!: IFormField[];
	@Prop() private readonly submitAction!: (fields: IFormField[]) => void;

	public computedField<T extends IFormField>(field: IFormField): T {
		const retVal = {
			...field,
			value: null
		} as T;
		return retVal;
	}

	public performSubmit(e?: Event) {
		if (e && !(e instanceof MouseEvent)) {
			e.preventDefault();
		}
		this.submitAction(this.observerArrToObj(this.value));
	}

	public isInput(field: IFormField): boolean {
		return field.type === FormFieldType.INPUT;
	}

	public isMarkdown(field: IFormField): boolean {
		return field.type === FormFieldType.MARKDOWN;
	}

	public makeField(field: IFormField) {
		switch (field.type) {
			case (FormFieldType.INPUT):
			return new InputField(field);
			default: break;
		}
	}

	private observerArrToObj(arr: any[]): any {
		return (
			arr.map(
				(val) => {
					const keys = Object.keys(val);
					return {...keys.reduce((acc, key) => {
						return {...acc, [key]: val[key] };
					}, {})};
				}
			) as IFieldValue[]).reduce((acc, val) => {
				return {...acc, [val.label]: val.value};
			}, {}
		);
	}
}
</script>

<style lang="scss">

* {
	// color: red;
}

</style>