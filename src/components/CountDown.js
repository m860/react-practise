/**
 * Created by jean.h.ma on 5/8/17.
 */
import BaseComponent from "./BaseComponent.js"
import PropTypes from 'prop-types'

export default class CountDown extends BaseComponent {
	static propTypes = {
		endDate: (props, propName, componentName)=> {
			let value = props[propName];
			if (!value) {
				return new Error(`${propName} is required in ${componentName}`);
			}
			if (value.constructor.name !== 'Date') {
				return new Error('Invalid prop `' + propName + '` supplied to `' + componentName + '`. Validation failed.');
			}
		},
		onEnd: PropTypes.func,
		className: PropTypes.any,
		style: PropTypes.any
	};
	static defaultProps = {
		className: '',
		style: {}
	};

	constructor(props) {
		super(props);
		this.mounted = false;
		this.state = {
			ms: props.endDate.valueOf() - Date.now()
		};
	}

	componentWillReceiveProps(nextProps) {
		let diff = nextProps.endDate.valueOf() - Date.now();
		if (diff > 0 && this.state.ms <= 0) {
			this.setState(
				$update(this.state, {
					ms: {$set: diff}
				}),
				()=> {
					this.run();
				}
			)
		}
	}

	get minute() {
		let value = Math.floor(this.state.ms / (1000 * 60));
		if (value < 0) {
			value = 0;
		}
		return value
	}

	get second() {
		let value = Math.floor((this.state.ms - this.minute * 60 * 1000) / 1000);
		if (value < 0) {
			value = 0;
		}
		return value;
	}

	get isEnd() {
		return this.state.ms <= 1000 ? true : false;
	}

	run() {
		if (this.mounted && this.isEnd) {
			if (this.props.onEnd) {
				this.props.onEnd();
			}
			return;
		}
		let now = Date.now();
		this.setState($update(this.state, {
			ms: {$set: this.state.ms - 1000}
		}), ()=> {
			setTimeout(()=> {
				this.run();
			}, 1000 - (Date.now() - now));
		});
	}

	componentDidMount() {
		this.mounted = true;
		this.run();
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	get text() {
		let minuteText = `000${this.minute}`.slice(-3);
		let secondText = `00${this.second}`.slice(-2);
		return `${minuteText}:${secondText}`
	}

	render() {
		return (
			<div
				style={this.props.style}
				className={classNames('countdown',this.props.className)}>
				{this.text}
			</div>
		);
	}
}