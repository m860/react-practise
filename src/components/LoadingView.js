import React from "react";
import BaseComponent from "./BaseComponent.js";
import PropTypes from "prop-types";
import Spinner from './meta/Spinner'
import classnames from 'classnames'

export default class LoadingView extends BaseComponent {
	static propTypes = {
		visible: PropTypes.bool,
		style: PropTypes.object,
		className: PropTypes.any
	};
	static defaultProps = {
		visible: false
	};

	render() {
		return (
			<div className={classnames('loading-view',this.props.className)} style={this.props.style}>
				{this.props.children}
				{this.props.visible && <div className="visible-loading">
					<Spinner></Spinner>
				</div>}
			</div>
		);
	}
}
