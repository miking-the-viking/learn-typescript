import { VuexModule, Module, Mutation, Action, getModule, MutationAction } from 'vuex-module-decorators';
import store from '@/store';
import { IFormField } from '@/components/forms/common';

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
}

export const BlogModule = getModule(new Blog({}));
