import React from 'react'
import BaseComponent from "./BaseComponent.js";
import PropTypes from "prop-types";

export default class Nav extends BaseComponent {
	static propTypes={
		title:PropTypes.string
	};
	static defaultProps={
		title:'LOGO'
	};
	render() {
		return (
			<nav>
				{this.props.title}
			</nav>
		);
	}
}
