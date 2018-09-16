<template lang="pug">
    .field.radio
        input(type="radio" v-model="localValue" value="valueRef" :name="label" :value="label" :id="label")
        label(:for="label") {{label}}
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mapActions, mapGetters, mapState } from 'vuex';
import { IFormField } from '../common';

const DEFAULT_PLACEHOLDER = 'Enter Text Here';

@Component({
  components: {
  }
})
export default class RadioField extends Vue {
	@Prop() public label!: string;
	@Prop() public placeholder?: string;
	@Prop() public valueRef!: string;
	@Prop() public isSelected: boolean = false;

	public localValue: string = '';

  	public created() {
		this.localValue = this.valueRef;
  	}

  	@Watch('localValue', { immediate: true })
  	private handleLocalValueUpdate(val: string, oldVal: string) {
		this.$emit('input', val);
  	}
}
</script>

<style lang="scss" scoped>

.field.radio {
	cursor: pointer;
}

</style>