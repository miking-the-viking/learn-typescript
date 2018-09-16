<template lang="pug">
.control.radioList
    label.radio(v-for="opt in options")
        input(type="radio" name="opt")
        | {{opt}}
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
export default class RadioList extends Vue {
	@Prop() public options!: string[];
	@Prop() public valueRef!: string;
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

.radioList {
    .radio + .radio {
        margin-left: 0;
    }   
}
</style>