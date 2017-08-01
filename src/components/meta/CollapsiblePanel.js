/**
 * Created by jean.h.ma on 01/08/2017.
 */
import React from "react";
import BaseComponent from "../BaseComponent";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class CollapsiblePanel extends BaseComponent {
	static propTypes = {
		title:PropTypes.oneOfType([PropTypes.string,PropTypes.node,PropTypes.element]),
		renderRight:PropTypes.func,
		style:PropTypes.object,
		className:PropTypes.any,
		expand: PropTypes.bool,
		onChange:PropTypes.func
	};
	static defaultProps = {
		renderRight: ()=>null,
		expand: true,
		onChange:()=>null
	};

	constructor(props) {
		super(props);
		this.state = {
			expand: props.expand
		};
	}

	render() {
		return (
			<div className={classnames("panel",this.props.className)} style={this.props.style}>
				<div className="panel-header">
					<div className="panel-header-title">
						{this.props.title}
					</div>
					<div className="panel-header-collapsible-right">
						{this.props.renderRight()}
						<div className="panel-header-collapsible">
							<a href="javascript:void(0)" onClick={()=>{
								this.updateState({
									expand:{$set:!this.state.expand}
								},()=>{
									this.props.onChange(this.state.expand);
								})
							}}>
								<i className={classnames("fa",this.state.expand?"fa-angle-up":"fa-angle-down")}></i>
							</a>
						</div>
					</div>
				</div>
				{this.state.expand &&
				<div className="panel-content">
					{this.props.children}
				</div>}
			</div>
		);
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.expand !== nextProps.expand) {
			this.updateState({
				expand: {$set: nextProps.expand}
			});
		}
	}
}