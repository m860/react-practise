import React from "react";
import BaseComponent from "../BaseComponent.js";
import PropTypes from "prop-types";


export default class Nav extends BaseComponent {
	static propTypes = {
		title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
		logo: PropTypes.oneOfType([PropTypes.node])
	};
	static defaultProps = {
		title: "THIS IS A TITLE"
	};

	render() {
		return (
			<nav>
				<div>
					{this.props.logo}
					{this.props.title}
				</div>
			</nav>
		);
	}
}
