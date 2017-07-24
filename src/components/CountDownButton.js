/**
 * Created by jean.h.ma on 5/8/17.
 */
import CountDown from './CountDown'
import PropTypes from 'prop-types'

export default class CountDownButton extends CountDown {
	static propTypes = {
		...CountDown.propTypes,
		children:PropTypes.any,
		onClick:PropTypes.func
	};
	get buttonText(){
		let text=this.props.children;
		if(!this.isEnd){
			text=this.text;
		}
		return text;
	}

	render() {
		return (
			<button
				disabled={!this.isEnd}
				onClick={this.props.onClick}
				className={classNames('pure-button',this.props.className)}
				style={this.props.style}>
				{this.buttonText}
			</button>
		);
	}
}