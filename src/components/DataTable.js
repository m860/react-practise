/**
 * Created by jean.h.ma on 5/9/17.
 */
import BaseComponent from './BaseComponent'
import PropTypes from 'prop-types'
import hash from 'object-hash'

export default class DataTable extends BaseComponent {
	static propTypes = {
		columns: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string,
			field: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
		})).isRequired,
		list: PropTypes.array,
		total: PropTypes.number,
		pageIndex: PropTypes.number,
		pageSize: PropTypes.number,
		onPageChange: PropTypes.func,
		style: PropTypes.object,
		className: PropTypes.any,
		toolbox: PropTypes.arrayOf(PropTypes.func),
		selectMode: PropTypes.oneOf(['none', 'single', 'multiple']),
		onSelect: PropTypes.func,
		showToolbox:PropTypes.bool,
		onRowClick:PropTypes.func
	};
	static defaultProps = {
		list: [],
		total: 0,
		pageIndex: 0,
		pageSize: 10,
		onPageChange: ()=>null,
		style: {},
		className: '',
		toolbox: [],
		selectMode: 'none',
		onSelect: ()=>null,
		onRowClick: ()=>null,
		showToolbox:true
	};

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

	render() {
		return (
			<table className={classNames("pure-table",this.props.className)} style={this.props.style}>
				<thead>
				{this.props.showToolbox &&
				<tr className="data-table-toolbox">
					<th
						className="ta-right"
						colSpan={this.props.columns.length}>
						{this.props.toolbox.map((item)=> {
							return item();
						})}
						<button
							onClick={()=>{
								this.props.onPageChange({
									pageIndex:this.props.pageIndex,
									pageSize:this.props.pageSize
								});
							}}
							type="button"
							className="pure-button"><i className="fa fa-refresh"></i></button>
					</th>
				</tr>}
				<tr>
					{this.props.columns.map((column, index)=> {
						return (
							<th key={index}>{column.name}</th>
						);
					})}
				</tr>
				</thead>
				<tbody>
				{this.props.list.map((rowData, rowDataIndex)=> {
					return (
						<tr key={rowDataIndex}
							className={classNames(this.selectedIndexOf(rowData)>=0?'selected':'')}
							onClick={()=>{
								if(this.props.selectMode!=='none'){
									if(this.selectedIndexOf(rowData)>=0){
										this.unSelect(rowData);
									}
									else{
										this.select(rowData);
									}
								}
								this.props.onRowClick(rowData);
							}}>
							{this.props.columns.map((column, columnIndex)=> {
								let value;
								if (column.field.constructor.name === "Function") {
									value = column.field(rowData, rowDataIndex);
								}
								else {
									if (column.field === '#') {
										value = this.props.pageIndex * this.props.pageSize + rowDataIndex + 1;
									}
									else {
										value = rowData[column.field]
									}
								}
								let style = column.style || {};
								let className = column.className || '';
								return (
									<td key={columnIndex}
										className={className}
										style={style}>{value}</td>
								);
							})}
						</tr>
					);
				})}
				</tbody>
				{this.props.total <= 0 &&
				<tfoot>
				<tr>
					<td colSpan={this.props.columns.length} className="ta-center">
						没有数据
					</td>
				</tr>
				</tfoot>}
				{this.props.total > 0 &&
				<tfoot>
				<tr>
					<td className="ta-right" colSpan={this.props.columns.length}>
						<span className="mr10">
							当前第 {this.props.pageIndex + 1}/{this.totalPage}
							页 , {this.props.pageSize}条/页 , 共 {this.props.total} 条记录
						</span>
						<button disabled={this.totalPage>0 && this.props.pageIndex>0?false:true}
								type="button"
								className="pure-button"
								onClick={()=>{
									this.props.onPageChange({
										pageSize:this.props.pageSize,
										pageIndex:0
									});
								}}><i className="fa fa-angle-double-left"></i>
						</button>
						<button type="button"
								disabled={this.totalPage>0 && this.props.pageIndex>0?false:true}
								className="pure-button"
								onClick={()=>{
										this.props.onPageChange({
											pageSize:this.props.pageSize,
											pageIndex:this.props.pageIndex-1
										});
								}}><i className="fa fa-angle-left"></i>
						</button>
						<button type="button"
								disabled={this.props.pageIndex+1===this.totalPage}
								className="pure-button"
								onClick={()=>{
										this.props.onPageChange({
											pageSize:this.props.pageSize,
											pageIndex:this.props.pageIndex+1
										});
								}}><i className="fa fa-angle-right"></i>
						</button>
						<button type="button"
								disabled={this.props.pageIndex+1===this.totalPage}
								className="pure-button"
								onClick={()=>{
										this.props.onPageChange({
											pageSize:this.props.pageSize,
											pageIndex:this.totalPage-1
										});
								}}><i className="fa fa-angle-double-right"></i>
						</button>
					</td>
				</tr>
				</tfoot>}
			</table>
		);
	}
}