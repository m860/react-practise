import React from "react";
import BaseComponent from "./BaseComponent.js";
import PropTypes from "prop-types";

export default class Nav extends BaseComponent {
	static propTypes = {
		title: PropTypes.string
	};
	static defaultProps = {
		title: 'LOGO'
	};

	render() {
		return (
			<nav>
				<div>
					<a className="logo">
						<i className="fa fa-bug fa-2x"></i>
					</a>
					{this.props.title}
				</div>
			</nav>
		);
	}
}
