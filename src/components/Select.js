/**
 * Created by jean.h.ma on 5/11/17.
 */
import BaseComponent from './BaseComponent'
import PropTypes from 'prop-types'
import guid from 'guid'

export default class Select extends BaseComponent {
	static propTypes = {
		options: PropTypes.arrayOf(PropTypes.shape({
			text: PropTypes.string,
			value: PropTypes.any
		})),
		className: PropTypes.any,
		style: PropTypes.any,
		onChange: PropTypes.func,
		type: PropTypes.oneOf(['radio', 'checkbox'])
	};
	static defaultProps = {
		style: {},
		onChange: ()=>null,
		type: 'radio'
	};

	constructor(props) {
		super(props);
		this.name = guid.raw();
		this.state = {
			selected: []
		};
	}

	render() {
		return (
			<ul className={classNames("select",this.props.className)}
				style={this.props.style}>
				{this.props.options.map((option, index)=> {
					return (
						<li key={index}
							onClick={()=>{
							this.props.onChange(option.value,index);
						}}>
							<input type={this.props.type}
								   name={this.name}
								   onClick={event=>{
								   	let state;
								   	if(this.props.type==='radio'){
								   		state=$update(this.state,{
								   			selected:{$set:[option.value]}
								   		});
								   	}
								   	else{
								   		if(event.target.checked){
								   			state=$update(this.state,{
								   				selected:{$push:[option.value]}
								   			});
								   		}
								   		else{
								   			let index=this.state.selected.indexOf(option.value);
								   			state=$update(this.state,{
								   				selected:{$splice:[[index,1]]}
								   			});
								   		}
								   	}
								   	this.setState(state,()=>{
								   		this.props.onChange(this.state.selected);
								   	})
							}}/>
							{option.text}
						</li>
					);
				})}
			</ul>
		);
	}
}