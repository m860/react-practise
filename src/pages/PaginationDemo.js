/**
 * Created by jean.h.ma on 2/6/17.
 */
import React from "react";
import BasePage from "./BasePage";
import LayoutWithNav from "../components/LayoutWithNav";
import {Link} from "react-router";
import Pagination from '../components/meta/Pagination'

export default class PaginationDemo extends BasePage {
	render() {
		return (
			<LayoutWithNav>
				<h5>Pagination 从0开始分页</h5>
				<Pagination
					onPageChange={(pageInfo)=>{
						console.log('page change',pageInfo)
					}}
					total={23}/>
				<h5>Pagination 从1开始分页</h5>
				<Pagination
					startPageNumber={1}
					pageIndex={1}
					onPageChange={(pageInfo)=>{
						console.log('page change',pageInfo)
					}}
					total={100}/>
				<Pagination
					displayPageCount={7}
					startPageNumber={1}
					pageIndex={1}
					onPageChange={(pageInfo)=>{
						console.log('page change',pageInfo)
					}}
					total={100}/>
			</LayoutWithNav>
		);
	}
}
