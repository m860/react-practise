/**
 * Created by jean.h.ma on 24/07/2017.
 */
import React from 'react'
import BasePage from './BasePage'
import Layout from '../components/Layout'
import Nav from '../components/Nav'
import PropTypes from 'prop-types'
import {getDefinedPaths} from '../config/routes.config'
import {Link} from 'react-router'
import * as d3 from 'd3'

export default class LessonBarChart extends BasePage{
	render(){
		return (
			<Layout>
				<div id="chart"></div>
			</Layout>
		);
	}
	componentDidMount(){
		super.componentDidMount();
		const data=[10,20,25,40,75,100,300];
		const width=d3.scaleLinear()
			.domain([0,d3.max(data)])
			.range([0,400]);
		d3.select('#chart')
			.selectAll('div')
			.data(data)
			.enter()
			.append('div')
			.style("margin-top","1px")
			.style("height","30px")
			.append("div")
			.style("height","100%")
			.style('background-color','blue')
			.style("display","inline-block")
			.style("width",(d)=>`${width(d)}px`)
			.select(function(){return this.parentNode})
			.append('span')
			.style("display","inline-block")
			.text((d)=>d)
			.exit()
			.remove()
	}
}