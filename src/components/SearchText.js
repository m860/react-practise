/**
 * Created by jean.h.ma on 06/06/2017.
 */
import BaseComponent from "./BaseComponent.js"
import PropTypes from 'prop-types'

export default class SearchText extends BaseComponent {
	static propTypes = {
		onChangeText: PropTypes.func,
		style: PropTypes.any
	};
	static defaultProps = {
		onChangeText: ()=>null,
		style: {}
	};

	constructor(props) {
		super(props);
		this.timer = null;
		this.state = {
			searchText: ''
		};
	}

	get hasValue() {
		return /^.{1,}$/.test(this.state.searchText);
	}

	renderCloseButton() {
		if (this.hasValue) {
			return (
				<a className="flex"
				   style={{position:"absolute",right:"0",top:"0",bottom:"0",width:"24px",justifyContent:"center",alignItems:"center"}}
				   onClick={()=>{
						this.setState(
							$update(this.state,{
								searchText:{$set:''}
							}),()=>{
								this.refs.value.value='';
								this.props.onChangeText('');
							}
						)
					}}>
					<i className="fa fa-close"></i>
				</a>
			);
		}
		return null;
	}

	render() {
		return (
			<div className="flex"
				 style={{flex:1,position:"relative",alignItems:"center",...this.props.style}}>
				<i className="fa fa-search" style={{backgroundColor:"white",height:"24px",lineHeight:"24px"}}></i>
				<input type="text"
					   ref="value"
					   onKeyDown={()=>{
					   		if(this.timer){
					   			clearTimeout(this.timer);
					   		}
					   		this.timer=setTimeout(()=>{
					   			this.setState(
									$update(this.state,{
										searchText:{$set:this.refs.value.value}
									}),
									()=>{
										this.props.onChangeText(this.state.searchText);
									}
								);
					   		},100);

					   }}
					   placeholder="请输入关键字"
					   className="flex"
					   style={{outline:"none",flex:1,height:"24px"}}/>
				{this.renderCloseButton()}
			</div>
		);
	}
}