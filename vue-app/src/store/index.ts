import Vue from 'vue';
import Vuex from 'vuex';
import { IAppState } from './modules/app';
import { IBlogState } from './modules/blog';

Vue.use(Vuex);

export interface IUser {
  email: string;
  name: string;
  authenticated: false;
}

export interface IRootState {
  app: IAppState;
  blog: IBlogState;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({});
