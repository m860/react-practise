import React from "react";
import BaseComponent from "./BaseComponent.js";
import Nav from "./meta/Nav";
import Layout from "./meta/Layout";
import PropTypes from "prop-types";
import config from "config";

const styles = {
	wrapper: {
		display: "flex",
		flex: 1,
		overflow: "auto",
		flexDirection:"column"
	}
};

export default class LayoutWithNav extends BaseComponent {
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
				<div style={styles.wrapper}>
					{this.props.children}
				</div>
			</Layout>
		);
	}
}
