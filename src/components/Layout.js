import React from "react";
import BaseComponent from "./BaseComponent.js";
import classNames from "classnames";

export default class Layout extends BaseComponent {
	render() {
		let props = Object.assign({}, this.props);
		props.className = classNames("layout", props.className);
		return (
			<div {...this._props}>
				{this.props.children}
			</div>
		);
	}
}
