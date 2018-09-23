<template lang="pug">
    .field
        label.label {{label}}
        .control
            input.input(type="text" v-bind:placeholder="computedPlaceholder()" v-model="value")
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mapActions, mapGetters, mapState } from 'vuex';
import { IFormField } from '../common';
import { GenericInputField } from '@/components/forms/components/GenericInputField';

const DEFAULT_PLACEHOLDER = 'Enter Text Here';

@Component
export default class InputField extends GenericInputField<string> {
	@Prop() public labelRef!: string;
	@Prop() public placeholder?: string;
	@Prop() public valueRef!: string;

  	public computedPlaceholder() {
		return (this.placeholder ? this.placeholder : DEFAULT_PLACEHOLDER);
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