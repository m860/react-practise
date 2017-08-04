import axios from 'axios'
import {getToken} from '../pages/Index'
import {store, $error, $toggleLoading} from '../App'
import config from 'config'

axios.defaults.baseURL = config.baseURL;

axios.defaults.timeout = config.requestTimeout;

axios.interceptors.request.use(function (configuration) {
	let state = store.getState();
	let tokenValue = getToken();
	let cookieName = state.configuration.configuration.tokenname;
	if (cookieName && tokenValue) {
		configuration.headers[cookieName] = tokenValue;
	}
	$toggleLoading(true);
	return configuration;
}, function (error) {
	return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
	$toggleLoading(false);
	return response;
}, function (error) {
	$toggleLoading(false);
	$error(error);
	return Promise.reject(error);
});


