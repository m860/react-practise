import React from 'react'
import Base from '../Base.js'
import Toast from './Toast'
import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
//
// @connect(({toast})=> {
// 	return {
// 		messages: toast.messages
// 	}
// })
export default class ToastView extends Base {
	static childContextTypes = {
		pushMessage: PropTypes.func
	};

	getChildContext() {
		return {
			pushMessage: this.pushMessage.bind(this)
		};
	}

	pushMessage(...args): void {
		const {toast}=this.refs;
		if (toast) {
			toast.pushMessage(...args);
		}
	}

	render() {
		return (
			<span>
				<Toast ref="toast" messages={this.props.messages}/>
				{this.props.children}
			</span>
		);
	}

	componentDidMount() {
		super.componentDidMount();
	}
}