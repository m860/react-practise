import { Component} from 'react'
import PropTypes from 'prop-types'

export default class LazilyModules extends Component {
	static propTypes = {
		modules: PropTypes.array.isRequired,
		children: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props)
		this.state = {
			ready: false
		};
		this._modules = [];
		this._mounted = false;
	}

	async _load() {
		let modules = await Promise.all(this.props.modules);
		this._modules = modules.map((module)=> {
			return module.default;
		});
		if (this._mounted) {
			this.setState($update(this.state, {
				ready: {$set: true}
			}));
		}
	}

	componentDidMount() {
		this._mounted = true;
		this._load();
	}

	render() {
		if (!this.state.ready) {
			return null;
		}
		return this.props.children(...this._modules);
	}

	componentWillUnmount() {
		this._mounted = false;
	}
}