import axios from 'axios'
import config from 'config'
import {showLoading, hideLoading} from '../ar/loading.ar'

axios.defaults.baseURL = config.baseURL;

axios.defaults.timeout = config.requestTimeout;

axios.interceptors.request.use(function (configuration) {
	showLoading();
	return configuration;
}, function (error) {
	return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
	hideLoading();
	return response;
}, function (error) {
	hideLoading();
	return Promise.reject(error);
});


