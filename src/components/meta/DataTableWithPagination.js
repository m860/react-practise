/**
 * Created by jean.h.ma on 5/9/17.
 */
import React from "react";
import BaseComponent from "../BaseComponent";
import DataTable from "./DataTable";
import Pagination from "./Pagination";
import PropTypes from "prop-types";

export default class DataTableWithPagination extends BaseComponent {
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
				render: (rowData, rowIndex)=> {
					const index = this.refs['pagination'].pageIndex * this.refs['pagination'].pageSize;
					if(this.refs['pagination'].startPageNumber===0) {
						return index + rowIndex+1;
					}
					return  index + rowIndex;
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