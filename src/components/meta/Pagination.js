/**
 * Created by jean.h.ma on 5/9/17.
 */
import React from "react";
import BaseComponent from "../BaseComponent";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class Pagination extends BaseComponent {
	static propTypes = {
		startPageNumber: PropTypes.number,
		pageIndex: PropTypes.number,
		pageSize: PropTypes.number,
		onPageChange: PropTypes.func.isRequired,
		total: PropTypes.number.isRequired,
		style: PropTypes.object,
		className: PropTypes.any,
		displayPageCount: PropTypes.number
	};
	static defaultProps = {
		startPageNumber: 0,
		pageIndex: 0,
		pageSize: 10,
		className: "pagination",
		displayPageCount: 5
	};

	constructor(props) {
		super(props);
		this.state = {
			pageIndex: props.pageIndex,
			pageSize: props.pageSize,
			startPageNumber: props.startPageNumber
		};
	}

	get totalPage() {
		if (this.props.total <= 0) {
			return 0;
		}
		return Math.ceil(this.props.total / this.props.pageSize);
	}

	render() {
		const pages = Array.apply(null, {length: this.totalPage}).map(Number.call, value=> {
			return value + this.state.startPageNumber;
		});
		const lastPageIndex = pages[pages.length - 1];
		const disabledPrevButton = this.state.pageIndex === this.state.startPageNumber;
		const disabledNextButton = this.state.pageIndex === lastPageIndex;

		const dis = Math.floor(this.props.displayPageCount / 2);
		let begin = this.state.pageIndex - dis;
		let end = this.state.pageIndex + dis;
		if (begin < this.state.startPageNumber) {
			begin = this.state.startPageNumber;
		}
		if (end > lastPageIndex) {
			end = lastPageIndex;
		}
		let realDis = end - begin + 1;
		if (realDis !== this.props.displayPageCount) {
			if (begin === this.state.startPageNumber) {
				//append page
				while (end !== lastPageIndex
				&& (end - begin + 1) !== this.props.displayPageCount) {
					end++;
				}
			}
			if (end === lastPageIndex) {
				//prepend page
				while (begin !== this.state.startPageNumber
				&& (end - begin + 1) !== this.props.displayPageCount) {
					begin--;
				}
			}
		}
		const startIndex = pages.indexOf(begin);
		const stopIndex = pages.indexOf(end) + 1;
		const displayPages = stopIndex >= pages.length ? pages.slice(startIndex) : pages.slice(startIndex, stopIndex);
		const hasLeft = begin > this.state.startPageNumber;
		const hasRight = end < lastPageIndex;
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
				{hasLeft && <li>...</li>}
				{displayPages.map((num, i)=> {
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
				{hasRight && <li>...</li>}
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

	// componentDidMount(){
	// 	super.componentDidMount();
	// 	this.props.onPageChange(Object.assign({},this.state));
	// }
}