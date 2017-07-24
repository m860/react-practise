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

export default class BarChartWithSVG extends BasePage{
	render(){
		return (
			<Layout>
				<svg id="chart"></svg>
			</Layout>
		);
	}
	componentDidMount(){
		super.componentDidMount();
		const data=[10,20,25,40,75,100,300];
		const width=d3.scaleLinear()
			.domain([0,d3.max(data)])
			.range([0,400]);
		const barHeight=30;
		let chart=d3.select('#chart')
			.attr('width',450)
			.attr("height",barHeight*data.length);

		let bar=chart.selectAll("g")
			.data(data)
			.enter()
			.append("g")
			.attr("transform",(data,i)=>`translate(0,${i*barHeight})`);

		bar.append("rect")
			.attr("width",width)
			.attr("fill","blue")
			.attr("height",barHeight-1);

		//append text
		bar.append("text")
			.attr("x",width)
			.attr("y",barHeight/2)
			.attr("dy",".35em")
			.attr("stroke",(d)=>{
				if(d>=50){
					return "red"
				}
				return "black"
			})
			.attr("fill",(d)=>{
				if(d>=50){
					return "red"
				}
				return "black"
			})
			.text(d=>d);
	}
}