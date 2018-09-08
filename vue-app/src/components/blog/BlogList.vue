<template lang='pug'>
  .blog-list
    h1.title Blog List
    .columns.container-fluid
        .column
            .blog.panel(v-for="blog in blogs" :key="blog.title + ' ' + new Date().toString()")
              .panel-heading 
                p {{blog.title}}
              .panel-block.body
                .content(v-html="markedDown(blog.body)")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IBlogItem } from '@/store/modules/blog';
import marked from 'marked';

@Component
export default class BlogList extends Vue {
  @Prop() private blogs!: IBlogItem[];

  private markedDown(body: string) {
    const asHTML = marked((body ? body : ''), { sanitize: true});
    return asHTML;
  }
}
</script>

<style scoped lang="scss">

</style>
