import { VuexModule, Module, Mutation, Action, getModule, MutationAction } from 'vuex-module-decorators';
import store from '@/store';
import { IFormField } from '@/components/forms/common';
import graphqlClient from '../gqlClient';
import gql from 'graphql-tag';
import { IRepositoryObj } from '@/store/modules/commits';


export interface IBlogState {
  blogs: IBlogItem[];
  newBlogForm: INewBlogForm;
}

export interface IBlogItem {
  title: string;
  body: string;
}

export interface INewBlogForm {
  formFields: IFormField[];
}

export interface ILoadBlogsResponse {
	loadBlogs: IBlogState['blogs'];
}

// tslint:disable:no-console
@Module({ dynamic: true, store, name: 'blog' })
class Blog extends VuexModule {
  public blogs: IBlogState['blogs'] = [];
  public newBlogForm: IBlogState['newBlogForm'] = {
	formFields: []
  };

  @MutationAction({ mutate: ['blogs'] })
  public async LOAD_BLOG(blog: IBlogItem) {
	return {
		blogs: [...(this.state as IBlogState).blogs, blog]
	};
  }

  @MutationAction({ mutate: ['blogs'] })
  public async LOAD_BLOGS(blogs: IBlogItem[]) {
	return {
		blogs: [...(this.state as IBlogState).blogs, ...blogs]
	};
  }

  @MutationAction({ mutate: ['blogs']})
  public async FETCH_BLOGS() {
		const response = await graphqlClient.query({
			// It is important to not use the
			// ES6 template syntax for variables
			// directly inside the `gql` query,
			// because this would make it impossible
			// for Babel to optimize the code.
			query: gql`
			query{
				loadBlogs{
					id
					title
					body
					createdAt
					updatedAt
				}
			}`
	  	});
		console.log('got response: ', response);
		return {
			blogs: (response.data as ILoadBlogsResponse).loadBlogs
		};
	}
}

export const BlogModule = getModule(new Blog({}));
