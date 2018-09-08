<template lang="pug">
    .field
        label.label Markdown Field: {{label}}
        .control.editor.columns
          div.column.input-area
            textarea.input(type="text" v-model="input" @input="update")
          div.column.display-area
            .compiledMarkdown(v-html="(compiledMarkdown())")
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mapActions, mapGetters, mapState } from 'vuex';
import marked from 'marked';
import { IFormField } from '../common';
import _ from 'lodash';

const DEFAULT_PLACEHOLDER = 'Enter Markdown Here';

@Component({
  components: {
  }
})
export default class MarkdownField extends Vue {
  @Prop() public label!: string;
  @Prop() public placeholder?: string;
  @Prop() public valueRef!: string;
  public input: string = '';

  public update = _.debounce((e) => {
    console.log('debounced updated', this, this.compiledMarkdown());
    this.input = e.target.value;

  }, 300);

  public computedPlaceholder() {
      return (this.placeholder ? this.placeholder : DEFAULT_PLACEHOLDER);
  }

  public compiledMarkdown() {
    return marked((this.input ? this.input : ''), { sanitize: true});
  }

  public created() {
    this.input = this.valueRef;
  }


  @Watch('input', { immediate: true })
  private handleinputUpdate(val: string, oldVal: string) {
    this.$emit('input', val);
  }

}
</script>

<style lang="scss">

* {
  // color: red;
}

</style>