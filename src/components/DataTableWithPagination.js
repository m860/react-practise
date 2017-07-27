/**
 * Created by jean.h.ma on 5/9/17.
 */
import React from "react";
import BaseComponent from "./BaseComponent";
import PropTypes from "prop-types";

export default class DataTable extends BaseComponent {
	static propTypes = {
		columns: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string,
			className: PropTypes.any,
			style: PropTypes.object,
			render: PropTypes.func
		})).isRequired,
		dataSource: PropTypes.array,
		style: PropTypes.object,
		className: PropTypes.any,
		renderDataEmpty: PropTypes.func
	};
	static defaultProps = {
		dataSource: [],
		className: 'striped',
		style: {},
		renderDataEmpty: (definedColumn)=>(<tr><td colSpan={definedColumn.length} style={{textAlign:"center"}}>NO DATA</td></tr>)
	};

	renderDataSource() {
		if (this.props.dataSource.length > 0) {
			return this.props.dataSource.map((rowData, rowDataIndex)=> {
				return (
					<tr key={rowDataIndex}>
						{this.props.columns.map((column, columnIndex)=> {
							return (
								<td key={columnIndex}
									className={column.className}
									style={column.style}>{column.render(rowData, column, columnIndex)}</td>
							);
						})}
					</tr>
				);
			});
		}
		return this.props.renderDataEmpty(this.props.columns);
	}

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
				{this.renderDataSource()}
				</tbody>
			</table>
		);
	}
}