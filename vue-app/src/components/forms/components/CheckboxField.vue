<template lang="pug">
	.checkbox
		input(:id="id" type="checkbox" :value="valueRef" @change="onChange" :checked="isChecked")
		label(v-if="!hideLabel && label" :for="id")
			span(v-text="label")
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mapActions, mapGetters, mapState } from 'vuex';
import { IFormField } from '../common';
import { GenericInputField } from '@/components/forms/abstracts/GenericInputField';

const DEFAULT_PLACEHOLDER = 'Enter Text Here';

@Component
export default class CheckboxField extends GenericInputField<string | boolean> {

	@Prop({ required: true}) public checkboxValue!: string | boolean;
	public valueRef: string | boolean = this.checkboxValue;

	get isChecked() {
		if (!(this.value instanceof Array)) {
			return this.checkboxValue === this.valueRef;
		}
		return this.value.indexOf(this.valueRef as string) > -1;
	}

	private onChange(e: Event) {
		// if not a selection array, is a toggle
		if (!(this.value instanceof Array)) {
			this.$emit('input', (e.target as HTMLInputElement).checked);
			return;
		}
		const existingValueIndex = this.value.indexOf(this.valueRef);
		if (existingValueIndex > -1) {
			// remove the value from the selection
			this.$emit('input', this.value.filter((value) => value !== this.valueRef));
			return;
		}
		// add the value to the selectino
		this.$emit('input', [...this.value, this.valueRef]);
	}
}

</script>
