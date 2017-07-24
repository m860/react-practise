/**
 * Created by jean.h.ma on 20/05/2017.
 */
import BaseComponent from "./BaseComponent";
import PropTypes from "prop-types";
import Keyboard, {KeyboardButton, LatinLayout} from "react-screen-keyboard";
import "react-screen-keyboard/src/Keyboard.css";

// class Button extends Component {
// 	static propTypes = {
// 		children: PropTypes.string.isRequired,
// 		keyCode: PropTypes.number,
// 		keyName: PropTypes.string,
// 		onClick: PropTypes.func
// 	};
//
// 	render() {
// 		return (
// 			<div
// 				onClick={this.props.onClick}
// 				data-keycode={this.props.keyCode}
// 				data-keyname={this.props.keyName}
// 				value={this.props.children}
// 				className="virtual-keyboard-button">{this.props.children}</div>
// 		);
// 	}
// }

export default class VirtualKeyboard extends BaseComponent {
	static propTypes = {
		// onClick: PropTypes.func,
		// visible: PropTypes.bool,
		children: PropTypes.any
	};
	static defaultProps = {
		// visible: false
	};

	constructor(props) {
		super(props);
		// this.values = [];
		this.state = {
			// visible: props.visible,
			inputNode: null
		};
		this.inputs = null;
		// this.currentInput = null;
		this.inputOnFocus = (event)=> {
			this.setInputNode(event.target);
			// this.showKeyboard();
		};
		this.inputOnBlur = ()=> {
			// this.setInputNode(null);
		}
	}

	// showKeyboard() {
	// 	this.setState(
	// 		$update(this.state, {
	// 			visible: {$set: true}
	// 		})
	// 	);
	// }

	setInputNode(inputNode) {
		this.setState(
			$update(this.state, {
				inputNode: {$set: inputNode}
			})
		)
	}

	// hideKeyboard() {
	// 	this.setState(
	// 		$update(this.state, {
	// 			visible: {$set: false}
	// 		})
	// 	);
	// }

	initialInputs() {
		if (!this.inputs) {
			this.inputs = [];
			this.refs.container.querySelectorAll('input[type=text],input[type=password]').forEach(input=> {
				this.inputs.push(input);
				input.addEventListener('focus', this.inputOnFocus, false);
				input.addEventListener('blur', this.inputOnBlur, false);
			});
		}
	}

	// triggerKeyboardEvent(inputValue) {
	// 	if (this.currentInput && this.state.visible) {
	// 		console.log(`input value : ${inputValue}`)
	// 		// this.currentInput.value+=inputValue;
	// 		this.currentInput.focus();
	// 		Keyboard.US_ENGLISH.dispatchEventsForInput(inputValue, this.currentInput);
	// 	}
	// }

	// componentWillReceiveProps(nextProps) {
	// 	this.setState(
	// 		$update(this.state, {
	// 			visible: {$set: nextProps.visible}
	// 		})
	// 	)
	// }

	componentDidMount() {
		this.initialInputs();
	}

	componentWillUnmount() {
		if (this.inputs) {
			this.inputs.forEach(input=> {
				input.removeEventListener('focus', this.inputOnFocus, false);
				input.removeEventListener('blur', this.inputOnBlur, false);
			});
		}
	}

	renderKeyboard() {
		if (this.state.inputNode) {
			return (
				<Keyboard
					inputNode={this.state.inputNode}
					rightButtons={[
						(
							<KeyboardButton key="closeKeyboard" onClick={()=>{
								this.setInputNode(null)
							}} value="关闭"/>
						)
					]}
					layouts={[LatinLayout]}
				/>
			);
		}
		return null;
	}

	render() {
		return (
			<span ref="container">
				{this.renderKeyboard()}
				{this.props.children}
			</span>
		);
	}
}