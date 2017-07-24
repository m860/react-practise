import React from "react";
import BaseComponent from "./BaseComponent.js";
import PropTypes from "prop-types";
import classNames from "classnames";

export default class Layout extends BaseComponent {
	static propTypes = {
		children: PropTypes.any,
		className: PropTypes.any
	}

	get _props() {
		let props = Object.assign({}, this.props);
		props.className = classNames("layout", props.className);
		return props;
	}

	render() {
		return (
			<div {...this._props}>
				<div className="container">
					{this.props.children}
				</div>
			</div>
		);
	}
}
