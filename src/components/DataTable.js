/**
 * Created by jean.h.ma on 5/9/17.
 */
import React from 'react'
import BaseComponent from "./BaseComponent";
import PropTypes from "prop-types";

export default class DataTable extends BaseComponent {
	static propTypes = {
		columns: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string,
			className:PropTypes.any,
			style:PropTypes.object,
			render: PropTypes.func
		})).isRequired,
		dataSource: PropTypes.array,
		//dataTotal: PropTypes.number,
		//pageIndex: PropTypes.number,
		//pageSize: PropTypes.number,
		//onPageChange: PropTypes.func,
		style: PropTypes.object,
		className: PropTypes.any,
		//toolbox: PropTypes.arrayOf(PropTypes.func),
		//selectMode: PropTypes.oneOf(['none', 'single', 'multiple']),
		//onSelect: PropTypes.func,
		//showToolbox:PropTypes.bool,
		//onRowClick:PropTypes.func
		renderDataEmpty: PropTypes.func,
		renderPagination: PropTypes.func
	};
	static defaultProps = {
		dataSource: [],
		className: 'striped',
		style: {}
	};

	/*
	 constructor(props) {
	 super(props);
	 this.state = {
	 selected: []
	 };
	 }

	 get totalPage() {
	 return Math.ceil(this.props.total / this.props.pageSize);
	 }

	 selectedIndexOf(item) {
	 let key = hash(item);
	 let i = 0;
	 let len = this.state.selected.length;
	 for (; i < len; i++) {
	 if (this.state.selected[i].key === key) {
	 return i;
	 }
	 }
	 return -1;
	 }

	 unSelect(item) {
	 let index = this.selectedIndexOf(item);
	 let state = $update(this.state, {
	 selected: {$splice: [[index, 1]]}
	 });
	 this.setState(state, ()=> {
	 this.props.onSelect(this.selectedItems);
	 })
	 }

	 select(item) {
	 let key = hash(item);
	 let state;
	 if (this.props.selectMode === 'single') {
	 //single
	 state = $update(this.state, {
	 selected: {$set: [{key, item}]}
	 });
	 }
	 else {
	 //multiple
	 state = $update(this.state, {
	 selected: {$push: [{key, item}]}
	 })
	 }
	 this.setState(state, ()=> {
	 this.props.onSelect(this.selectedItems);
	 });
	 }

	 get selectedItems() {
	 return this.state.selected.map((item=> {
	 return item.item;
	 }));
	 }
	 */
	render() {
		return (
			<table className={this.props.className} style={this.props.style}>
				<thead>
				<tr>
					{this.props.columns.map((column, index)=> {
						return (
							<th key={index}>{column.name}</th>
						);
					})}
				</tr>
				</thead>
				<tbody>
				{this.props.dataSource.map((rowData, rowDataIndex)=> {
					return (
						<tr key={rowDataIndex}>
							{this.props.columns.map((column, columnIndex)=> {
								return (
									<td key={columnIndex}
										className={column.className}
										style={column.style}>{column.render(rowData)}</td>
								);
							})}
						</tr>
					);
				})}
				</tbody>
			</table>
		);
	}
}