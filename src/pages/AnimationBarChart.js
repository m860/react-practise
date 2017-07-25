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

export default class AnimationBarChart extends BasePage{
	render(){
		return (
			<Layout>
				<svg id="chart"></svg>
			</Layout>
		);
	}
	componentDidMount(){
		super.componentDidMount();

		const data=[10,20,25,40,75,100,200];

		const chartWidth=450;
		const chartHeight=450;

		const dataScale=d3.scaleLinear()
			.domain([0,d3.max(data)])
			.range([0,400]);

		const bottomAxisScale=d3.scaleLinear()
			.domain([0,data.length])
			.range([0,400]);

		const barHeight=30;
		const barWidth=30;

		const axisHeight=50;

		let chart=d3.select('#chart')
			.style("background-color","silver")
			.attr('width',chartWidth)
			.attr("height",chartHeight);

		let bar=chart.selectAll("g")
			.data(data)
			.enter()
			.append("g")
			.attr("transform",(data,i)=>`translate(${bottomAxisScale(i)+30},0)`);

		bar.append("rect")
			.attr("width",barWidth)
			.attr("fill","blue")
			.attr("y",(d)=>chartHeight-20)
			.attr("height",0)
			.transition()
			.delay(100)
			.duration(1000)
			.attr("height",dataScale)
			.attr("y",d=>chartHeight-20-dataScale(d));

		// append text
		bar.append("text")
			.attr("x",0)
			.attr("y",(d)=>chartHeight-20-dataScale(d)-2)
			.attr("dx",".45em")
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


		const bottomAxis=d3.axisBottom(bottomAxisScale)
			.tickValues(d3.range(0,data.length));

		chart.append("g")
			.attr("transform",`translate(30,${chartHeight-20})`)
			.call(bottomAxis);

		const leftScale=d3.scaleLinear()
			.domain([0,d3.max(data)])
			.range([400,0]);

		const leftAxis=d3.axisLeft(leftScale);

		chart.append("g")
			.attr("transform",`translate(30,30)`)
			.call(leftAxis);
	}
}