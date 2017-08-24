import React from "react";
import BaseComponent from "./BaseComponent.js";
import PropTypes from "prop-types";
import classnames from 'classnames'
import {connect} from 'react-redux'
import {ToastMessageType} from '../types'
import {popMessage} from '../ar/toast.ar'

/**
 * Toast
 * */
@connect(({toast})=> {
	return {
		messages: toast.messages
	};
})
export default class Toast extends BaseComponent {
	static propTypes = {
		style: PropTypes.object,
		className: PropTypes.string,
		timeout: PropTypes.number,
		renderMessage: PropTypes.func
	};
	static defaultProps = {
		timeout: 2.5 * 1000,
		renderMessage: message=>message.message
	};

	constructor(props) {
		super(props);
		this._timer = null;
	}

	next() {
		const len = this.props.messages.length;
		if (len > 0) {
			if (this._timer) {
				clearTimeout(this._timer);
			}
			this._timer = setTimeout(()=> {
				this.props.dispatch(popMessage());
			}, this.props.timeout);
		}
	}

	render() {
		let message: ToastMessageType;
		if (this.props.messages.length > 0) {
			message = this.props.messages[0];
		}
		if (message) {
			return (
				<div className={classnames('toast',this.props.className)} style={this.props.style}>
					<div className={classnames('toast-wrapper',`toast-message-${message.type}`)}>
						{this.props.renderMessage(message)}
					</div>
				</div>
			);
		}
		return null;
	}

	componentDidMount() {
		super.componentDidMount();
		this.next();
	}

	componentDidUpdate() {
		this.next();
	}
}
