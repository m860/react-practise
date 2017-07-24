import BaseComponent from "./BaseComponent.js"
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {signOut} from '../ar/user.ar'
import screenfull from 'screenfull'
import {getToken} from '../pages/Index'
import config from 'config'

@connect()
export default class Header extends BaseComponent {
	static propTypes = {
		children: PropTypes.any,
		showHome: PropTypes.bool,
		dispatch: PropTypes.func,
		title: PropTypes.string
	};
	static defaultProps = {
		showHome: false
	};
	static contextTypes = {
		router: PropTypes.object,
		location: PropTypes.object
	};

	hasToken() {
		let token = getToken();
		return !!token;
	}

	get title() {
		if (this.props.title) {
			return this.props.title;
		}
		if (this.context.location
			&& this.context.location.state) {
			return this.context.location.state.title;
		}
		return null;
	}

	renderLogo() {
		if (this.props.showHome) {
			return (
				<div className="header-button">
					<Link className="pure-button pure-button-primary"
						  to="/dashboard"><i className="fa fa-home"></i></Link>
					{this.title && <span className="logo">{this.title}</span>}
				</div>
			);
		}
		else {
			return (
				<span className="logo">
					<img style={{height:"40px"}} src={require("../assets/img/logo.png")}/> {config.version}
				</span>
			);
		}
	}

	renderSignOutButton() {
		if (this.hasToken()) {
			return (
				<a className="pure-button mr10" onClick={()=>{
							this.props.dispatch(signOut());
							this.context.router.replace({
								pathname:'/'
							});
						}}>
					<i className="fa fa-sign-out"></i>
				</a>
			);
		}
		return null;
	}

	render() {
		return (
			<div className="pure-g header">
				<div className="pure-u-6-24">
					{this.renderLogo()}
				</div>
				<div className="pure-u-16-24"></div>
				<div className="pure-u-2-24">
					<div className="header-button" style={{justifyContent:'flex-end'}}>
						<a className="pure-button mr10" onClick={()=>{
							if(screenfull.enabled){
								screenfull.toggle();
							}
						}}><i className="fa fa-arrows"></i>
						</a>
						<a className="pure-button mr10"
						   onClick={()=>{
							window.location.reload();
						}}><i className="fa fa-refresh"></i>
						</a>
						{this.renderSignOutButton()}
					</div>
				</div>
			</div>
		);
	}
}
