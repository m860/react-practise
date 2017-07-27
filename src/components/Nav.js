import React from "react";
import BaseComponent from "./BaseComponent.js";
import PropTypes from "prop-types";
import config from 'config'


export default class Nav extends BaseComponent {
	static propTypes = {
		title: PropTypes.string
	};
	static defaultProps = {
	};

	render() {
		let title='LOGO';
		if(this.props.title){
			title=this.props.title;
		}
		else if(config.navOptions && config.navOptions.title){
			title=config.navOptions.title;
		}
		return (
			<nav>
				<div>
					<a className="logo">
						<i className="fa fa-bug fa-2x"></i>
					</a>
					{title}
				</div>
			</nav>
		);
	}
}
