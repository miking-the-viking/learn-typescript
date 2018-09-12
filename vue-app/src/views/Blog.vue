<template lang="pug">
  .blog.columns
    Form.column.is-third(v-model="newBlogFields" v-bind:submitAction="loadBlog" v-bind:formTitle="newBlogFormTitle")
    BlogList.column.is-third(v-bind:blogs="blogs")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapActions, mapGetters, mapState } from 'vuex';
import { BlogModule, IBlogItem } from '@/store/modules/blog';
import BlogList from '@/components/blog/BlogList.vue';
import Form from '@/components/forms/Form.vue';
import { FormFieldType } from '../components/forms/common';

const NEW_BLOG_FIELDS = [
  {
    label: 'title',
    placeholder: 'Blog Post Title',
    type: FormFieldType.INPUT
  },
  {
    label: 'body',
    placeholder: '# Default Blog Body',
    type: FormFieldType.MARKDOWN
  }
];

@Component({
  components: {
    BlogList,
    Form
  },
})
export default class Blog extends Vue {

  public newBlogFields = NEW_BLOG_FIELDS;
  private newBlogFormTitle = 'New Blog Post';

  get blogs() {
    return BlogModule.blogs;
  }

  public loadBlog(blog: IBlogItem) {
    return BlogModule.LOAD_BLOG(blog);
  }

  public created() {
    // console.log('Blog component created');
  }
}
</script>

<style lang="scss">

#title-h1 {
  size: 2em;
}
</style>