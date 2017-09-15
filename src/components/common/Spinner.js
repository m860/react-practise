import React from "react";
import PropTypes from "prop-types";
import Base from "../Base";

/**
 * Spinner
 * */
export default class Spinner extends Base {
	static propTypes = {
		loading: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
		text: PropTypes.string,
		textClassName: PropTypes.any,
		textStyle: PropTypes.object
	};
	static defaultProps = {
		text: '加载中...',
		loading: <img src={require('../../assets/img/spinner.gif')}></img>
	};

	render() {
		return (
			<div className="spinner">
				{this.props.loading}
				<span className={this.props.textClassName} style={this.props.textStyle}>
					{this.props.text}
				</span>
			</div>
		);
	}
}
