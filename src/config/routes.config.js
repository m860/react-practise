/**
 * Created by jean.h.ma on 2/6/17.
 */

const routes = [{
	path: '404',
	getComponent: async(location, callback)=> {
		let module = await System.import("../pages/404.js");
		callback(null, module.default);
	},
	name:"404"
}];

if(process.env['NODE_ENV']==="development"){
	function displayRoute(route,parentPath) {
		let path=`/${route.path}`;
		if(parentPath){
			path=parentPath+path;
		}
		if(route.indexRoute){
			console.log(`${route.indexRoute.name} : ${path}`);
		}
		if(route.childRoutes){
			route.childRoutes.forEach(r=>displayRoute(r,path))
		}
		if(route.name){
			console.log(`${route.name} : ${path}`);
		}
	}
	routes.forEach(r=>displayRoute(r));
}

export default routes



