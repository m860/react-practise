export default {
	isIOS: (): Boolean=> {
		return /iphone/i.test(window.navigator.userAgent);
	},
	isAndroid: (): Boolean=> {
		return /android/i.test(window.navigator.userAgent);
	}
}