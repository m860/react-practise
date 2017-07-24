import "materialize-css/dist/css/materialize.min.css"
import "./assets/sass/app.sass";
import {Router, Route, hashHistory, IndexRoute} from "react-router";
import routes from "./config/routes.config";
import appConfig from "config";
import ReactCSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import reducers from "./ar";
import thunk from "redux-thunk";
import React, {PureComponent} from "react";
import ReactDOM from 'react-dom'
import "./config/axios.config";
import {persistStore, autoRehydrate} from "redux-persist";

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
	blacklist: []
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

// let notify;
// class Toast extends Component {
// 	constructor(props) {
// 		super(props);
// 		notify = (obj, type = 'error')=> {
// 			let message = encodeURI(this.getMessage(obj));
// 			this.setState(
// 				$update(this.state, {
// 					messages: {
// 						$push: [{
// 							type,
// 							message
// 						}]
// 					}
// 				}),
// 				()=> {
// 					setTimeout(()=> {
// 						this.setState($update(this.state, {
// 							messages: {$splice: [[0, 1]]}
// 						}));
// 					}, appConfig.toastTimeout);
// 				}
// 			);
// 		};
// 		window.addEventListener("error", event=> {
// 			notify(event);
// 		});
// 		this.state = {
// 			messages: []
// 		};
// 	}
//
// 	getMessage(obj) {
// 		let message;
// 		switch (obj.constructor.name) {
// 			case "Object":
// 			case "Error":
// 			case "SocketProtocolError":
// 			case "ErrorEvent":
// 				message = obj.msg || obj.message;
// 				break;
// 			case "String":
// 				message = obj;
// 				break;
// 			default:
// 				message = obj.constructor.name;
// 		}
// 		if (message === "Network Error") {
// 			return "网络不可用";
// 		}
// 		else if (/timeout/i.test(message)) {
// 			return "访问超时,请检查网络是否可用";
// 		}
// 		else {
// 			return message;
// 		}
// 	}
//
// 	render() {
// 		return (
// 			<ul className="toast">
// 				{this.state.messages.map((item, index)=> {
// 					return (
// 						<li className={item.type} key={`toast_${index}`}>
// 							<a href="javascript:void(0)" onClick={()=>{
// 								this.setState($update(this.state,{
// 									messages:{$splice:[[index,1]]}
// 								}));
// 							}}><i className="fa fa-close"></i></a> {decodeURI(item.message)}
// 						</li>
// 					);
// 				})}
// 			</ul>
// 		);
// 	}
// }
// let toggleLoading;
// class Loading extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			visible: false
// 		};
// 		toggleLoading = (visible)=> {
// 			let value;
// 			if (visible != null && typeof visible !== 'undefined') {
// 				value = visible;
// 			}
// 			else {
// 				value = !this.state.visible;
// 			}
// 			this.setState($update(this.state, {
// 				visible: {$set: value}
// 			}));
// 		}
// 	}
//
// 	render() {
// 		if (this.state.visible) {
// 			return (
// 				<div className="loading">
// 					<div className="spinner">
// 						<i className="fa fa-spinner fa-3x"></i>
// 					</div>
// 				</div>
// 			);
// 		}
// 		return null;
// 	}
// }

// @connect(({user})=> {
// 	let isTeacher = false;
// 	if (user.user) {
// 		isTeacher = user.user.UserType === 1;
// 	}
// 	return {
// 		isTeacher
// 	};
// })
// class ToolBox extends Component {
// 	static propTypes = {
// 		isTeacher: PropTypes.bool
// 	};
//
// 	render() {
// 		if (!this.props.isTeacher) {
// 			return (
// 				<div className="tool-box">
// 					<button className="pure-button" onClick={()=>{
// 					if(screenfull.enabled){
// 						screenfull.toggle();
// 					}
// 				}}><i className="fa fa-arrows"></i></button>
// 					<button className="pure-button"
// 							onClick={()=>{
// 					window.location.reload();
// 				}}><i className="fa fa-refresh"></i></button>
// 				</div>
// 			);
// 		}
// 		return null;
// 	}
// }

class App extends PureComponent {
	render() {
		return (
			<Provider store={store}>
				<span>
					<ReactCSSTransitionGroup
						transitionName={appConfig.getTransitionName(this.props.location)}
						transitionEnterTimeout={appConfig.transitionTimeout}
						transitionLeaveTimeout={appConfig.transitionTimeout}>
						{
							React.cloneElement(this.props.children, {
								key: this.props.location.pathname
							})
						}
					</ReactCSSTransitionGroup>
				</span>
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

// export function $error(message) {
// 	if (notify) {
// 		notify(...[message]);
// 	}
// }
//
// export function $warn(message) {
// 	if (notify) {
// 		notify(...[message, 'warning']);
// 	}
// }
//
// export function $info(message) {
// 	if (notify) {
// 		notify(...[message, 'info']);
// 	}
// }
//
// export function $toggleLoading(...args) {
// 	if (toggleLoading) {
// 		toggleLoading(...args);
// 	}
// }




