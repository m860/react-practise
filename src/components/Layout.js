import BaseComponent from "./BaseComponent.js"
import PropTypes from 'prop-types'

export default class Layout extends BaseComponent {
	static propTypes = {
		children: PropTypes.any,
		className: PropTypes.any
	}

	get _props() {
		let props = Object.assign({}, this.props);
		delete props.children;
		props.className = classNames("layout", props.className);
		return props;
	}

	render() {
		return (
			<div {...this._props}>
				{this.props.children}
			</div>
		);
	}
}
