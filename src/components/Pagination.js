/**
 * Created by jean.h.ma on 5/9/17.
 */
import React from "react";
import BaseComponent from "./BaseComponent";
import PropTypes from "prop-types";

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
		pageSize:10
	};

	get totalPage(){
		if(this.props.total<=0){
			return 0;
		}
		return Math.ceil(this.props.total/this.props.pageSize);
	}

	render() {
		const pages=Array.apply(null,{length:this.totalPage}).map(Number.call,Number);
		return (
			<ul>
				{pages.map(num=>{
					return (
						<li key={num}><a>{num+this.props.startPageNumber}</a></li>
					);
				})}
			</ul>
		);
	}
}