<template lang="pug">
.blog.columns
	.column.is-one-third
		Form(v-model="newBlogFields" v-bind:submitAction="loadBlog" v-bind:formTitle="newBlogFormTitle")
	.column
		BlogList(v-bind:blogs="blogs")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapActions, mapGetters, mapState } from 'vuex';
import { BlogModule, IBlogItem } from '@/store/modules/blog';
import BlogList from '@/components/blog/BlogList.vue';
import Form from '@/components/forms/Form.vue';
import { FormFieldType } from '../components/forms/common';
import gql from 'graphql-tag';

const NEW_BLOG_FIELDS = [
	{
		label: 'title',
		placeholder: 'Blog Post Title',
		type: FormFieldType.Input
	},
	{
		label: 'body',
		placeholder: '# Default Blog Body',
		type: FormFieldType.Markdown
	},
	// {
	// 	label: 'post to facebook',
	// 	type: FormFieldType.Checkbox
	// }
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

	public created() {
		BlogModule.FETCH_BLOGS();
	}

	private loadBlog(blog: IBlogItem) {
		return BlogModule.ADD_BLOG(blog).then(this.clearBlogForm);
	}

	private clearBlogForm() {
		// tslint:disable-next-line:no-console
		console.log('clearBlogForm!');
		this.newBlogFields = this.newBlogFields.map((val) => {
			return {...val, value: ''};
		});
	}

}
</script>

<style lang="scss">

#title-h1 {
	size: 2em;
}
.blog {
	padding:1em;
}
</style>