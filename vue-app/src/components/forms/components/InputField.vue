<template lang="pug">
    .field
        label.label {{label}}
        .control
            input.input(type="text" v-bind:placeholder="computedPlaceholder()" v-model="localValue")
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
export default class InputField extends Vue {
  @Prop() public label!: string;
  @Prop() public placeholder?: string;
  @Prop() public valueRef!: string;
  public localValue: string = '';

  public computedPlaceholder() {
      return (this.placeholder ? this.placeholder : DEFAULT_PLACEHOLDER);
  }

  public created() {
    this.localValue = this.valueRef;
  }

  @Watch('localValue', { immediate: true })
  private handleLocalValueUpdate(val: string, oldVal: string) {
    this.$emit('input', val);
  }
}
</script>

<style lang="scss">

* {
  // color: red;
}

</style>