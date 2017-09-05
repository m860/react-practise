import React from 'react'
import BaseComponent from '../BaseComponent'
import {Transition} from 'react-transition-group'

const timeout = 500;

const defaultStyle = {
	opacity: 1,
	transition: `opacity ${timeout}ms ease-in-out`
};

const transitionStyles = {
	entering: {
		opacity: 1
	},
	entered: {
		opacity: 1
	},
	exiting: {
		opacity: 0
	},
	exited: {
		opacity: 0
	}
};

export default class Flicker extends BaseComponent {
	static propTypes = {
		...Transition.propTypes
	};
	static defaultProps = {
		timeout: timeout
	};

	constructor(props) {
		super(props);
		this.state = {
			in: true
		};
		this._timer = null;
	}

	flicker() {
		this.updateState({
			in: {$set: !this.state.in}
		}, ()=> {
			this._timer = setTimeout(this.flicker.bind(this), this.props.timeout);
		})
	}

	render() {
		return (
			<Transition {...this.props} in={this.state.in}>
				{state=> {
					return (
						<span style={{...defaultStyle, ...transitionStyles[state]}}>
							{this.props.children}
						</span>
					);
				}}
			</Transition>
		);
	}

	componentDidMount() {
		super.componentDidMount();
		this.flicker();
	}

	componentWillUnmount() {
		super.componentWillUnmount();
		if (this._timer) {
			clearTimeout(this._timer);
		}
	}
}