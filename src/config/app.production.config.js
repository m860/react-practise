export default {
	version: "1.1.0",
	fullscreen: true,
	transitionTimeout: 0.5 * 1000,
	toastTimeout: 5 * 1000,
	baseURL: 'http://192.168.2.202:8081/',
	requestTimeout: 60 * 1000,
	ackTimeout: 2 * 60 * 1000,
	userTypeMappingMenu: {
		1: 'teacher',
		2: 'student'
	},
	index: ()=> {
		return async(location, callback)=> {
			let module = await System.import("../pages/Index");
			callback(null, module.default);
		}
	},
	getTransitionName: (location)=> {
		if (location.action === "POP") {
			return "page-pop";
		}
		return "page-push";
	}
}