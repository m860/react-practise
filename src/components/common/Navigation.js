import React from "react";
import PropTypes from "prop-types";
import Base from "../Base";

/**
 * Navigation - 导航栏
 * */
export default class Navigation extends Base {
	/**
	 * @property {(?String|HtmlElement|React.node)} title [ THIS IS A TITLE ]
	 * @property {(HtmlElement|React.node)} logo
	 * */
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
					<div></div>
				</div>
			</nav>
		);
	}
}
