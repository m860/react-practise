import "normalize-css/normalize.css";
import "purecss/build/pure-min.css";
import "font-awesome/css/font-awesome.min.css";
import "./assets/sass/app.sass";
import {Router, Route, hashHistory, IndexRoute} from "react-router";
import routes from "./config/routes.config";
import appConfig from "config";
//import ReactCSSTransitionGroup from "react-transition-group/CSSTransition";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import reducers from "./ar";
import thunk from "redux-thunk";
import React, {PureComponent} from "react";
import ReactDOM from "react-dom";
import "./config/axios.config";
import {persistStore, autoRehydrate} from "redux-persist";
import ToastView from './components/ToastView'

export const store = createStore(
	reducers,
	undefined,
	compose(
		applyMiddleware(thunk)
		, autoRehydrate()
	)
);

let storeIsReady = false;

persistStore(store, {
	blacklist: [
		'toast',
		'loading'
	]
}, ()=> {
	storeIsReady = true;
});


export function waitStoreWasReady() {
	function ready(callback) {
		if (storeIsReady) {
			callback();
		}
		else {
			setTimeout(()=> {
				ready(callback)
			}, 100);
		}
	}

	return new Promise((resolve)=> {
		ready(()=> {
			resolve();
		});
	});
}


class App extends PureComponent {
	render() {
		return (
			<Provider store={store}>
				<ToastView>
					{this.props.children}
				</ToastView>
			</Provider>
		);
	}
}

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/"
			   childRoutes={routes}
			   component={App}>
			<IndexRoute
				getComponent={appConfig.index()}
				onEnter={async (nextState,replace,callback)=>{
					//TODO 处理登录
					/*
					let signedIn = await isSignIn();
					if(signedIn){
						replace({
								pathname:'/dashboard'
							})
					}
					*/
					callback();
			}}></IndexRoute>
		</Route>
	</Router>
	, document.getElementById("view"));





