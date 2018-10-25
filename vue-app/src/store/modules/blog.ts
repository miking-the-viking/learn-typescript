/**
 * Blog Store Module
 *
 * Handles the Blog-specific store
 *
 */

import { IBlogState } from './blog';
import {
	VuexModule,
	Module,
	getModule,
	MutationAction,
	Mutation
} from 'vuex-module-decorators';
import store from '@/store';
import {
	IFormField
} from '@/components/forms/common';
import graphqlClient from '../gqlClient';
import gql from 'graphql-tag';

/**
 * Blog Module State Store
 *
 * - `blogs` - an array of loaded blogs
 * - `newBlogForm` - a state-stored form for a blog
 */
export interface IBlogState {
	blogs: IBlogItem[];
}

/**
 * A Blog Item defines the data of an individual blog post
 */
export interface IBlogItem {
	title: string;
	body: string;
	id: string;
	createdAt: string;
	updatedAt: string;
}

/**
 * Payload data definition for the response from the loadBlogs call
 */
export interface ILoadBlogsResponse {
	loadBlogs: IBlogState['blogs'];
}

/**
 * Payload data definition for the response from the addBlog call
 */
export interface IAddBlogResponse {
	addBlog: IBlogItem;
}

/**
 * A New Blog Form has an array of fields
 */
export interface INewBlogForm {
	fields: IFormField[];
}

/**
 * extractBlog extracts the blog from a GraphQL addBlog mutation reponse
 * @param gqlAddBlogResponse IBlogItem the raq GQL response object
 */
function extractBlog(gqlAddBlogResponse: IBlogItem): IBlogItem {
	return {
		id: gqlAddBlogResponse.id,
		createdAt: gqlAddBlogResponse.createdAt,
		updatedAt: gqlAddBlogResponse.updatedAt,
		title: gqlAddBlogResponse.title,
		body: gqlAddBlogResponse.body
	};
}

@Module({
	dynamic: true,
	store,
	name: 'blog'
})
class Blog extends VuexModule {

	/**
	 * Array of currently loaded blogs
	 */
	public blogs: IBlogState['blogs'] = [];

	@MutationAction({
		mutate: ['blogs', 'newBlogForm']
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
