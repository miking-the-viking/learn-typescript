import VueRouter from 'vue-router';
import Vue from 'vue';
import { Prop } from 'vue-property-decorator';

/**
 * Nav interface
 */
export interface INav {
	routes?: IRoute[];	// routes in the nav
}

/**
 * Route interface, nestable
 */
export interface IRoute {
	name: string;
	path: string;
	children?: IRoute[];
}

export interface IRouter extends VueRouter {
	options: {
		routes: IRoute[];
	};
}

export function extractRoutes(router: IRouter): IRoute[] {
	return router.options.routes
		.map((val) => {
			return {
				name: val.name,
				path: val.path,
				children: val.children
			};
		});
}

export abstract class AVueNav extends Vue implements INav {
	@Prop() public routes?: IRoute[];

	public getRoutes() {
		return extractRoutes((this.$router as IRouter));
	}
}
