/**
 * Created by jean.h.ma on 5/9/17.
 */
import React from "react";
import BaseComponent from "../BaseComponent";
import PropTypes from "prop-types";
import classnames from 'classnames'

export default class Pagination extends BaseComponent {
	static propTypes = {
		startPageNumber:PropTypes.number,
		pageIndex:PropTypes.number,
		pageSize:PropTypes.number,
		onPageChange:PropTypes.func.isRequired,
		total:PropTypes.number.isRequired,
		style:PropTypes.object,
		className:PropTypes.any
	};
	static defaultProps = {
		startPageNumber:0,
		pageIndex:0,
		pageSize:10,
		className:"pagination"
	};

	constructor(props){
		super(props);
		this.state={
			pageIndex:props.pageIndex,
			pageSize:props.pageSize,
			startPageNumber:props.startPageNumber
		};
	}

	get totalPage(){
		if(this.props.total<=0){
			return 0;
		}
		return Math.ceil(this.props.total/this.props.pageSize);
	}

	render() {
		const pages=Array.apply(null,{length:this.totalPage}).map(Number.call,value=>{
			return value+this.state.startPageNumber;
		});
		const disabledPrevButton=this.state.pageIndex===this.state.startPageNumber;
		const disabledNextButton=this.state.pageIndex===pages[pages.length-1];
		return (
			<ul className={this.props.className} style={this.props.style}>
				<li className={classnames(disabledPrevButton?"disabled":'')}>
					<a onClick={()=>{
						const prevIndex=this.state.pageIndex-1;
						this.updateState({
							pageIndex:{$set:prevIndex}
						},()=>{
							this.props.onPageChange(Object.assign({},this.state));
						})
					}} href="javascript:void(0)">&lt;</a>
				</li>
				{pages.map((num,i)=>{
					return (
						<li
							className={classnames(this.state.pageIndex===num?"cur":'')}
							key={num}>
							<a onClick={()=>{
								this.updateState({
									pageIndex:{$set:num}
								},()=>{
									this.props.onPageChange(Object.assign({},this.state));
								});
							}} href="javascript:void(0)">{num}</a>
						</li>
					);
				})}
				<li className={classnames(disabledNextButton?"disabled":"")}>
					<a onClick={()=>{
						const nextIndex=this.state.pageIndex+1;
						this.updateState({
							pageIndex:{$set:nextIndex}
						},()=>{
							this.props.onPageChange(Object.assign({},this.state));
						})
					}} href="javascript:void(0)">&gt;</a>
				</li>
			</ul>
		);
	}
}