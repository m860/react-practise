/**
 * Created by jean.h.ma on 2/6/17.
 */
import React from "react";
import BasePage from "./BasePage";
import LayoutWithNav from "../components/LayoutWithNavigation";
import {Link} from "react-router";
import LoadingView from '../components/LoadingView'
import {showLoading, hideLoading} from '../ar/loading.ar'
import {connect} from 'react-redux'

@connect()
export default class UploadFileDemo extends BasePage {
	constructor(props) {
		super(props);
		this.state = {
			visible: false
		};
	}

	render() {
		return (
			<LayoutWithNav>
				<h5>Loading View Demo</h5>
				<div>
					<button
						onClick={()=>{
							this.updateState({
								visible:{$set:!this.state.visible}
							})
						}}
						type="button">Show/Hide
					</button>
					<button
						onClick={()=>{
							this.props.dispatch(showLoading());
							setTimeout(()=>{
								this.props.dispatch(hideLoading());
							},2*1000);
						}}
						type="button">show global loading
					</button>
				</div>
				<LoadingView visible={this.state.visible}>
					<p>hello loading view!</p>
				</LoadingView>
			</LayoutWithNav>
		);
	}
}
