/**
 * Blog service resolver
 */

import { Resolver, Query, ResolveProperty, Mutation, Args } from '@nestjs/graphql';
import { BlogService, IBlogRecord } from './blog.service';

@Resolver('Blog')
export class BlogResovler {
    constructor(
        private readonly blogService: BlogService,
    ) { }

    @Query('loadBlogs')
    async loadBlogs(): Promise<IBlogRecord[]> {
        console.log('loadBlogs resolver');
        return await this.blogService.getBlogs();
    }

    @Mutation()
    async addBlog(@Args('title') title: string, @Args('body') body: string) {
        return await this.blogService.addBlog({ title, body });
    }

    // @ResolveProperty()
    // async posts(@Parent() author) {
    //     const { id } = author;
    //     return await this.postsService.findAll({ authorId: id });
    // }
}