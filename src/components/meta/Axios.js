import React from "react";
import BaseComponent from "../BaseComponent.js";
import axios from 'axios'
import config from 'config'
import PropTypes from 'prop-types'

export default class Axios extends BaseComponent {
	static childContextTypes = {
		http: PropTypes.func
	};

	getChildContext() {
		return {
			http: axios
		};
	}

	constructor(props){
		super(props);
		axios.defaults.baseURL = config.baseURL;
		axios.defaults.timeout = config.requestTimeout;
		axios.interceptors.request.use(function (configuration) {
			//showLoading();
			return configuration;
		}, function (error) {
			return Promise.reject(error);
		});

		axios.interceptors.response.use(function (response) {
			//hideLoading();
			return response;
		}, function (error) {
			//hideLoading();
			return Promise.reject(error);
		});
	}

	render() {
		return this.props.children;
	}
}