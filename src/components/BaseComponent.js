export default class BaseComponent extends React.PureComponent{
	constructor(props) {
		super(props);
		this._mounted = false;
	}

	componentDidMount() {
		this._mounted = true;
	}

	componentWillUnmount() {
		this._mounted = false;
	}

	updateState(changedState, callback) {
		if (this.state && this._mounted) {
			this.setState(
				$update(this.state, changedState),
				callback
			);
		}
	}

	setState2(state, callback) {
		if (this._mounted) {
			this.setState(state, callback);
		}
	}
}