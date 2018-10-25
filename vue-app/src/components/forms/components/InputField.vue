<template lang="pug">
    .field
        label.label {{label}}
        .control
            input.input(type="text" v-model="valueRef")
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mapActions, mapGetters, mapState } from 'vuex';
import { IFormField } from '../common';
import { GenericInputField } from '@/components/forms/abstracts/GenericInputField';

const DEFAULT_PLACEHOLDER = 'Enter Text Here';

@Component
export default class InputField extends GenericInputField<string> {
	@Prop() public placeholder?: string;
	@Prop({ default: '' }) protected value!: string;

  	public computedPlaceholder() {
		return (this.placeholder ? this.placeholder : DEFAULT_PLACEHOLDER);
  	}
}
</script>