/**
 * Created by jean.h.ma on 2/6/17.
 */
import React from "react";
import BasePage from "./BasePage";
import LayoutWithNav from "../components/LayoutWithNav";
import {Link} from "react-router";
import DataTable from '../components/DataTable'

export default class SimpleDataTable extends BasePage {
	constructor(props) {
		super(props);
		this.dataSource=[
			{name:"Jean",sex:"mail"},
			{name:"Jean2",sex:"mail"},
			{name:"Jean3",sex:"mail"},
			{name:"Jean4",sex:"mail"},
		]
	}

	render() {
		return (
			<LayoutWithNav>
				<DataTable columns={[{
					name:"Name",
					render:(rowData)=>rowData['name']
				},{
					name:"Sex",
					render:(rowData)=>rowData['sex']
				}]} dataSource={this.dataSource}></DataTable>
			</LayoutWithNav>
		);
	}
}
