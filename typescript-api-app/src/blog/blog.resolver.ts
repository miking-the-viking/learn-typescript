// tslint:disable:no-console
/**
 * Blog service resolver
 */

import { Resolver, Query, ResolveProperty, Mutation, Args } from '@nestjs/graphql';
import { BlogService, IBlogRecord, IBlogInput } from './blog.service';

@Resolver('Blog')
export class BlogResolver {
    constructor(
        private readonly blogService: BlogService,
    ) {
        console.log('blog resolver constructor');
    }

    @Query()
    async loadBlogs(): Promise<IBlogRecord[]> {
        console.log('loadBlogs resolver');
        return await this.blogService.getBlogs();
    }

    @Mutation()
    async addBlog(@Args('input') input: IBlogInput) {
        console.log('addBlog resolver');
        return await this.blogService.addBlog(input);
    }

    // @ResolveProperty()
    // async posts(@Parent() author) {
    //     const { id } = author;
    //     return await this.postsService.findAll({ authorId: id });
    // }
}