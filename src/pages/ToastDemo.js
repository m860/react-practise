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
import {pushMessage} from '../ar/toast.ar'

@connect()
export default class ToastDemo extends BasePage {
	render() {
		return (
			<LayoutWithNav>
				<h5>Toast Demo</h5>
				<div>
					<button
						onClick={()=>{
							this.props.dispatch(pushMessage({
								type:"info",
								message:`new message : ${Math.random()}`
							}))
						}}
						type="button">show message
					</button>
				</div>
			</LayoutWithNav>
		);
	}
}
