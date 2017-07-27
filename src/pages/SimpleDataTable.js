/**
 * Created by jean.h.ma on 2/6/17.
 */
import React from "react";
import BasePage from "./BasePage";
import LayoutWithNav from "../components/LayoutWithNav";
import {Link} from "react-router";
import DataTable from "../components/DataTable";

export default class SimpleDataTable extends BasePage {
	constructor(props) {
		super(props);
		this.dataSource = [
			{name: "Jean", sex: "mail"},
			{name: "Jean2", sex: "mail"},
			{name: "Jean3", sex: "mail"},
			{name: "Jean4", sex: "mail"},
			{name: "Jean5", sex: "mail"},
			{name: "Jean6", sex: "mail"},
			{name: "Jean7", sex: "mail"},
			{name: "Jean8", sex: "mail"},
			{name: "Jean9", sex: "mail"},
			{name: "Jean10", sex: "mail"},
			{name: "Jean11", sex: "mail"},
			{name: "Jean12", sex: "mail"},
		];
		this.dataTableColumns = [{
				name: "Name",
				render: (rowData)=>rowData['name']
			}, {
				name: "Sex",
				render: (rowData)=>rowData['sex']
			}];
	}

	render() {
		return (
			<LayoutWithNav>
				<h5>Simple DataTable</h5>
				<DataTable columns={this.dataTableColumns} dataSource={this.dataSource.slice(0,3)}></DataTable>
				<h5>Empty DataTable</h5>
				<DataTable columns={this.dataTableColumns}></DataTable>
				<h5>Radio DataTable</h5>
				<DataTable columns={[{
					name:"",
					render:rowData=>{
						return (
							<input type="radio" value={rowData.name} name="dt-radio"/>
						);
					}
				},...this.dataTableColumns]} dataSource={this.dataSource.slice(0,3)}/>
				<h5>Checkbox DataTable</h5>
				<DataTable columns={[{
					name:"",
					render:rowData=>{
						return (
							<input type="checkbox" value={rowData.name}/>
						);
					}
				},...this.dataTableColumns]} dataSource={this.dataSource.slice(0,3)}/>
			</LayoutWithNav>
		);
	}
}
