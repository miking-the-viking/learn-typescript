import { IBlogState } from './blog';
import {
	VuexModule,
	Module,
	Mutation,
	Action,
	getModule,
	MutationAction
} from 'vuex-module-decorators';
import store from '@/store';
import {
	IFormField
} from '@/components/forms/common';
import graphqlClient from '../gqlClient';
import gql from 'graphql-tag';
import {
	IRepositoryObj
} from '@/store/modules/commits';


export interface IBlogState {
	blogs: IBlogItem[];
	newBlogForm: INewBlogForm;
}

export interface IBlogItem {
	title: string;
	body: string;
	id: string;
	createdAt: string;
	updatedAt: string;
}

export interface INewBlogForm {
	formFields: IFormField[];
}

export interface ILoadBlogsResponse {
	loadBlogs: IBlogState['blogs'];
}
export interface IAddBlogResponse {
	addBlog: IBlogItem;
}

function extractBlog(gqlAddBlogResponse: IBlogItem): IBlogItem {
	return {
		id: gqlAddBlogResponse.id,
		createdAt: gqlAddBlogResponse.createdAt,
		updatedAt: gqlAddBlogResponse.updatedAt,
		title: gqlAddBlogResponse.title,
		body: gqlAddBlogResponse.body,
	};
}

@Module({
	dynamic: true,
	store,
	name: 'blog'
})
class Blog extends VuexModule {
	public blogs: IBlogState['blogs'] = [];
	public newBlogForm: IBlogState['newBlogForm'] = {
		formFields: []
	};

	@MutationAction({
		mutate: ['blogs']
	})
	public async ADD_BLOG(blog: IBlogItem) {
		const response = await graphqlClient.mutate({
			// It is important to not use the
			// ES6 template syntax for variables
			// directly inside the `gql` query,
			// because this would make it impossible
			// for Babel to optimize the code.
			mutation: gql `mutation AddBlog($input: BlogInput){
				addBlog(input: $input){
					id
					title
					body
					createdAt
					updatedAt
				}
			}`,
			variables: {
				input: blog
			}
		});
		return {
			blogs: [...(this.state as IBlogState).blogs, extractBlog((response.data as IAddBlogResponse).addBlog)]
		};
	}

	@MutationAction({
		mutate: ['blogs']
	})
	public async FETCH_BLOGS() {
		const response = await graphqlClient.query({
			// It is important to not use the
			// ES6 template syntax for variables
			// directly inside the `gql` query,
			// because this would make it impossible
			// for Babel to optimize the code.
			query: gql `
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
		return {
			blogs: (response.data as ILoadBlogsResponse).loadBlogs
		};
	}
}

export const BlogModule = getModule(new Blog({}));