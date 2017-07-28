import React from "react";
import BaseComponent from "../BaseComponent.js";
import PropTypes from "prop-types";
import config from 'config'


export default class Nav extends BaseComponent {
	static propTypes = {
		title: PropTypes.string,
		renderLogo:PropTypes.func
	};
	static defaultProps = {
	};

	render() {
		let title='TITLE';
		if(this.props.title){
			title=this.props.title;
		}
		else if(config.navOptions && config.navOptions.title){
			title=config.navOptions.title;
		}
		let renderLogo=()=>null;
		if(this.props.renderLogo){
			renderLogo=this.props.renderLogo;
		}
		else if(config.navOptions && config.navOptions.renderLogo){
			renderLogo=config.navOptions.renderLogo;
		}
		return (
			<nav>
				<div>
					<div className="logo">
						{renderLogo()}
					</div>
					{title}
				</div>
			</nav>
		);
	}
}
