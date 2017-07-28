/**
 * Created by jean.h.ma on 2/6/17.
 */

const routes = [{
	path: 'paginationdemo',
	getComponent: async(location, callback)=> {
		let module = await System.import("../pages/PaginationDemo.js");
		callback(null, module.default);
	},
	name: "Pagination"
},{
	path: 'simpledatatable',
	getComponent: async(location, callback)=> {
		let module = await System.import("../pages/SimpleDataTable.js");
		callback(null, module.default);
	},
	name: "Simple DataTable"
},{
	path: '404',
	getComponent: async(location, callback)=> {
		let module = await System.import("../pages/404.js");
		callback(null, module.default);
	},
	name: "404"
}];

export function getDefinedPaths() {
	let paths = [];

	function displayRoute(route, parentPath) {
		let path = `/${route.path}`;
		if (parentPath) {
			path = parentPath + path;
		}
		if (route.indexRoute) {
			paths.push({
				name:route.indexRoute.name,
				url:path
			});
		}
		if (route.childRoutes) {
			route.childRoutes.forEach(r=>displayRoute(r, path))
		}
		if (route.name) {
			paths.push({
				name:route.name,
				url:path
			});
		}
	}

	routes.forEach(r=>displayRoute(r));
	return paths;
}

if (process.env['NODE_ENV'] === "development") {
	getDefinedPaths().forEach(p=>console.log(`${p.name}:${p.url}`));
}

export default routes



