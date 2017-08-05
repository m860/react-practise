import React from "react";
import BaseComponent from "../BaseComponent";
import DataTable from "./DataTable";
import Pagination from "./Pagination";
import PropTypes from "prop-types";

/**
 * 带分页的DataTable,由DataTable和Pagination组合的复合组件
 * */
export default class DataTableWithPagination extends BaseComponent {
	/**
	 * {@link DataTable.propTypes ...DataTable.propTypes}
	 * {@link Pagination.propTypes ...Pagination.propTypes}
	 * @property {?Object} style
	 * @property {?String} className
	 * @property {?Object} dataTableStyle - DataTable样式
	 * @property {?String} dataTableClassName - DataTable css class
	 * @property {?Object} paginationStyle - Pagination 样式
	 * @property {?String} paginationClassName - Pagination css class
	 * @property {?Boolean} showIndex [ true ] - 是否显示索引列
	 * */
	static propTypes = {
		style: PropTypes.object,
		className: PropTypes.any,
		columns: DataTable.propTypes.columns,
		dataSource: DataTable.propTypes.dataSource,
		renderDataEmpty: DataTable.propTypes.renderDataEmpty,
		dataTableStyle: DataTable.propTypes.style,
		dataTableClassName: DataTable.propTypes.className,
		startPageNumber: Pagination.propTypes.startPageNumber,
		pageIndex: Pagination.propTypes.pageIndex,
		pageSize: Pagination.propTypes.pageSize,
		onPageChange: Pagination.propTypes.onPageChange,
		total: Pagination.propTypes.total,
		displayPageCount: Pagination.propTypes.displayPageCount,
		paginationStyle: Pagination.propTypes.style,
		paginationClassName: Pagination.propTypes.className,
		showIndex: PropTypes.bool
	};
	static defaultProps = {
		showIndex: true
	};

	/**
	 * 全局RowIndex
	 * */
	getGlobalRowIndex(localRowIndex:Number):Number{
		const index = this.refs['pagination'].pageIndex * this.refs['pagination'].pageSize;
		if(this.refs['pagination'].startPageNumber===0) {
			return index + localRowIndex+1;
		}
		return  index + localRowIndex;
	}

	render() {
		const dataTablePropKeys = Object.keys(DataTable.propTypes).concat(["dataTableStyle", "dataTableClassName"]);
		const paginationPropKeys = Object.keys(Pagination.propTypes).concat(["paginationStyle", "paginationClassName"]);
		let dataTableOption = {};
		dataTablePropKeys.filter(f=>f !== "style" || f !== "className").forEach(k=> {
			dataTableOption[k] = this.props[k];
		});
		let paginationOption = {};
		paginationPropKeys.filter(f=>f !== "style" || f !== "className").map(k=> {
			paginationOption[k] = this.props[k];
		});
		if (this.props.showIndex) {
			dataTableOption.columns = [{
				name: "#",
				style:{width:"20px"},
				render: (rowData, rowIndex)=> {
					return this.getGlobalRowIndex(rowIndex);
				}
			}, ...dataTableOption.columns];
		}
		return (
			<div style={this.props.style} className={this.props.className}>
				<DataTable {...dataTableOption}/>
				<Pagination {...paginationOption} ref="pagination"/>
			</div>
		);
	}
}