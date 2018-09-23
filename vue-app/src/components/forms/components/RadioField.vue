<template lang="pug">
    .field.radio
        //- input(type="radio" v-model="value" value="value" :name="name" :value="label" :id="label")
        input(type="radio" v-model="value" :value="valueRef")
        label(:for="label") {{label}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapActions, mapGetters, mapState } from 'vuex';
import { IFormField } from '../common';
import { GenericChangeField } from '@/components/forms/components/GenericChangeField';

const DEFAULT_PLACEHOLDER = 'Enter Text Here';

@Component
export default class RadioField extends GenericChangeField<string> {
	@Prop() public labelRef!: string;
	@Prop() public placeholder?: string;
	@Prop() public valueRef!: string;
	@Prop() public nameRef?: string;

  	public created() {
		this.label = this.labelRef;
		this.name = (this.nameRef ? this.nameRef : this.labelRef);
	}
}
</script>

<style lang="scss" scoped>

.field.radio {
	cursor: pointer;
}

</style>