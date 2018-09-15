import { VuexModule, Module, Mutation, Action, getModule, MutationAction } from 'vuex-module-decorators';
import store from '@/store';
import { IFormField } from '@/components/forms/common';
import axios, { AxiosResponse } from 'axios';

export interface ICommitsState {
	branches: IRepositoryObj;
	currentBranch: string;
	autoUpdate: boolean;
}

export interface IRepositoryObj {
	[key: string]: IBranch;
}

export interface IBranch {
	commits: ICommit[];
}

export interface ICommit {
		author: IAuthor;
		comments_url: string;
		commit: {};
		committer: IAuthor;
		html_url: string;
		node_id: string;
		parents: Array<{
				html: string;
				sha: string;
				url: string;
		}>;
		sha: string;
		url: string;
}

export interface IAuthor {
		avatar_url: string;
		events_url: string;
		followers_url: string;
		following_url: string;
		gists_url: string;
		gravatar_url: string;
		html_url: string;
		id: number;
		login: string;
		node_id: string;
		organizations_url: string;
		received_events_url: string;
		repos_url: string;
		site_admin: boolean;
		starred_url: string;
		subscriptions_url: string;
		type: string;
		url: string;
}

export interface ICommitRecord {
		author: ICommitRecordAuthor;
		comment_count: number;
		committer: ICommitRecordAuthor;
		message: string;
		tree: {
				sha: string;
				url: string;
		};
		url: string;
}

export interface ICommitRecordAuthor {
		date: string;
		email: string;
		name: string;
}

export interface INewBlogForm {
	formFields: IFormField[];
}

export const API_ROUTE = 'https://api.github.com/repos/miking-the-viking/learn-typescript/commits?per_page=3&sha=';

export const branchList = ['master', 'develop'];

const initializeBranchesObject = () => {
	return {
		...branchList.reduce((acc, val) => {
				acc[val] = {
					commits: []
				} as IBranch;
				return acc;
		}, {} as IRepositoryObj)
	};
};

async function updateBranch(branchObj: IBranch, branch: string): Promise<IRepositoryObj> {

	const originalCommits = branchObj.commits;
	const commitsApiResult = (await axios(API_ROUTE + branch)).data as ICommit[];

	const updatedCommits = commitsApiResult.reduce((acc, val: ICommit) => {
		// if val.sha is not in the commits array, push it

		if (
			!originalCommits.some((el) => {
				return el.sha === val.sha;
			})
		) {
			acc.push(val);
		}

		return [...acc];
	}, originalCommits as ICommit[]);

	const newRepositoryObj: IRepositoryObj = {};
	newRepositoryObj[branch] = {
		commits: updatedCommits
	};
	return newRepositoryObj;
}

@Module({ dynamic: true, store, name: 'commits' })
class Commits extends VuexModule {
	public branches: ICommitsState['branches'] = initializeBranchesObject();
	public currentBranch: ICommitsState['currentBranch'] = 'develop';
	public autoUpdate: boolean = true;
	public error: {} | null = null;

	@MutationAction({ mutate: ['branches']})
	public async LOAD_BRANCHES() {
		const loadBranchPromises = Object.keys((this.state as ICommitsState).branches)
			.map(async (branchTitle) => updateBranch((this.state as ICommitsState).branches[branchTitle], branchTitle));

		const updatedBranches: IRepositoryObj =
			await Promise.all(loadBranchPromises)
				.then((loadBranchesResults) => {

					const resultObj = loadBranchesResults.reduce((result, currentObject): IRepositoryObj => {
						for (const key in currentObject) {
							if (currentObject.hasOwnProperty(key)) {
								result[key] = currentObject[key];
							}
						}
						return result;
					}, {});

					return resultObj;
					}
				);

		return {
			branches: updatedBranches
		};
	}

	@Mutation public SET_CURRENT_BRANCH(newBranch: string) {
		this.currentBranch = newBranch;
	}
}

export const CommitsModule = getModule(new Commits({}));
