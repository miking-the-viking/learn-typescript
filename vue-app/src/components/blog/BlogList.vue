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
        .column
          ApolloQuery(
            :query="loadBlogsQuery"
            :variables="{ name }"
          )
            template(slot-scope="{ result: { loading, error, data } }")
            //- <!-- Loading -->
            div(v-if="loading" class="loading apollo") Loading...
            //- <!-- Error -->
            div(v-else-if="error" class="error apollo") An error occured
            //- <!-- Result -->
            div(v-else-if="data" class="result apollo") {{ data.hello }}
            //- <!-- No result -->
            div(v-else class="no-result apollo") No result :(
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IBlogItem } from '@/store/modules/blog';
import marked from 'marked';
import gql from 'graphql-tag';
// const loadBlogs = require('../../gql/blogs/loadBlogs.gql');

@Component
export default class BlogList extends Vue {
  @Prop() private blogs!: IBlogItem[];
  // private loadBlogsQuery = loadBlogs;
  // private loadBlogsQuery = gql`${loadBlogs}`;

  private markedDown(body: string) {
    const asHTML = marked((body ? body : ''), { sanitize: true});
    return asHTML;
  }
  
}
</script>

<style scoped lang="scss">

</style>
