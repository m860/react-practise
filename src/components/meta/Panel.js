import React from "react";
import BaseComponent from "../BaseComponent";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class Panel extends BaseComponent{
	static propTypes={
		title:PropTypes.oneOfType([PropTypes.string,PropTypes.node,PropTypes.element]),
		renderRight:PropTypes.func,
		style:PropTypes.object,
		className:PropTypes.any
	};
	static defaultProps={
		renderRight:()=>null
	};
	render(){
		return (
			<div className={classnames("panel",this.props.className)} style={this.props.style}>
				<div className="panel-header">
					<div className="panel-header-title">
						{this.props.title}
					</div>
					<div className="panel-header-right">
						{this.props.renderRight()}
					</div>
				</div>
				<div className="panel-content">
					{this.props.children}
				</div>
			</div>
		);
	}
}