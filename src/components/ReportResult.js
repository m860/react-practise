/**
 * Created by jean.h.ma on 25/06/2017.
 */
import BaseComponent from './BaseComponent'
import PropsTypes from 'prop-types'
import DataTable from './meta/DataTable'
import inputs from './inputs'
import axios from 'axios'
import {$error} from '../App'

export default class ReportResult extends BaseComponent {
	static propTypes = {
		showFilter: PropsTypes.bool,
		style: PropsTypes.any,
		className: PropsTypes.any,
		dataContext: PropsTypes.object,
		script: PropsTypes.string.isRequired,
		autoQuery: PropsTypes.bool
	};
	static defaultProps = {
		showFilter: true,
		autoQuery: false,
		style: {},
		className: "",
		dataContext: {}
	};

	constructor(props) {
		super(props);
		this.state = {
			filter: {},
			data: [],
			filterDefined: []
		};
	}

	get columns() {
		let columnsDefined = []
		if (this.state.data.length > 0) {
			let first = this.state.data[0];
			for (let key in first) {
				columnsDefined.push({
					name: key,
					field: key
				});
			}
		}
		return columnsDefined;
	}

	async fetchFilter(script) {
		if (script.length > 0) {
			let {data}=await axios.post('/report/query/precheck', {
				script
			});
			if (data.success) {
				this.setState(
					$update(this.state, {
						filterDefined: {$set: data.data}
					}), ()=> {
						if (this.props.autoQuery) {
							this.query();
						}
					}
				)
			}
			else {
				$error(data);
			}
		}
	}

	buildFilterValue() {
		return this.state.filterDefined.map(f=> {
			let nf = Object.assign({}, f);
			if (this.state.filter[f.key]) {
				nf.value = this.state.filter[f.key];
			}
			else if (f.value && f.value.length > 0) {
				if (this.props.dataContext[f.value]) {
					nf.value = this.props.dataContext[f.value];
				}
			}
			return nf;
		});
	}

	async query() {
		let {data}=await axios.post('/report/query', {
			script: this.props.script,
			filter: this.buildFilterValue()
		});
		if (data.success) {
			this.setState(
				$update(this.state, {
					data: {$set: data.data}
				})
			);
		}
		else {
			$error(data);
		}
	}

	renderFilter() {
		if (this.props.showFilter) {
			return (
				<div className="pure-u-1">
					{this.state.filterDefined.map((f, i)=> {
						let Control = inputs[f.type];
						return (
							<div
								key={i}
								className="report-inputs pure-u-xl-8-24 pure-u-lg-8-24 pure-u-md-24-24 pure-u-sm-24-24">
								<Control name={f.key} {...f} onChange={value=>{
									this.setState(
										$update(this.state,{
											filter:{
												[f.key]:{$set:value}
											}
										})
									);
								}}/>
							</div>
						);
					})}
				</div>
			);
		}
		return null;
	}

	render() {
		return (
			<div
				style={this.props.style}
				className={this.props.className}>
				{this.renderFilter()}
				<div className="flex" style={{flex:1,overflow:"auto"}}>
					<DataTable
						pageSize={this.state.data.length}
						total={this.state.data.length}
						style={{width:"100%"}}
						showToolbox={false}
						columns={this.columns}
						list={this.state.data}/>
				</div>
			</div>
		);
	}

	componentDidMount() {
		this.fetchFilter(this.props.script);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.script !== this.props.script) {
			this.fetchFilter(nextProps.script);
		}
	}
}