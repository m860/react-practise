import React from "react";
import Base from "../Base.js";
import Nav from "./Navigation";
import Layout from "./Layout";
import PropTypes from "prop-types";
import config from "config";
import LoadingView from './LoadingView'
import {connect} from 'react-redux'

export default class LayoutWithNavigation extends Base {
	static propTypes = {
		navOptions: PropTypes.object
	};
	static defaultProps = {
		navOptions: config.navOptions
	};

	render() {
		return (
			<Layout>
				<Nav {...this.props.navOptions}/>
				<div className="wrapper">
					{this.props.children}
				</div>
			</Layout>
		);
	}
}
