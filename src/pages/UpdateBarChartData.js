/**
 * Created by jean.h.ma on 24/07/2017.
 */
import React from "react";
import BasePage from "./BasePage";
import Layout from "../components/Layout";
import * as d3 from "d3";

export default class UpdateBarChartData extends BasePage {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				Math.floor(d3.randomUniform(0, 1000)()),
				Math.floor(d3.randomUniform(0, 1000)()),
				Math.floor(d3.randomUniform(0, 1000)()),
				Math.floor(d3.randomUniform(0, 1000)()),
				Math.floor(d3.randomUniform(0, 1000)()),
			]
		};
	}

	render() {
		return (
			<Layout>
				<button
					onClick={()=>{

						this.updateState({
							data:{$set:[
								Math.floor(d3.randomUniform(0,1000)()),
								Math.floor(d3.randomUniform(0,1000)()),
								Math.floor(d3.randomUniform(0,1000)()),
								Math.floor(d3.randomUniform(0,1000)()),
								Math.floor(d3.randomUniform(0,1000)()),
								]}
						})

						/*
						this.updateState({
							data:{$push:[Math.floor(d3.randomUniform(0,1000)())]}
						})
						*/
					}}
					type="button">ADD DATA
				</button>
				<svg id="chart"></svg>
			</Layout>
		);
	}

	drawChart(data) {
		console.log(`draw chart data length=${data.length}`)
		const chartWidth = 450;
		const chartHeight = 450;

		const dataScale = d3.scaleLinear()
			.domain([0, d3.max(data)])
			.range([0, 400]);

		const xAxisScale = d3.scaleLinear()
			.domain([0, data.length])
			.range([0, 400]);

		const yAxisScale = d3.scaleLinear()
			.domain([0, d3.max(data)])
			.range([400, 0]);

		const xAxis = d3.axisBottom(xAxisScale)
			.tickValues(d3.range(0, data.length));

		const yAxis = d3.axisLeft(yAxisScale);

		const barWidthScale = d3.scaleLinear()
			.domain([0, data.length])
			.range([30, 5]);

		const chart = d3.select('#chart')
			.style("background-color", "silver")
			.attr('width', chartWidth)
			.attr("height", chartHeight);
		let defaultY=data.map(d=>(chartHeight - 20));
		let defaultHeight=data.map(d=>0);
		const bar = chart.selectAll("g.bar")
			.each(function(d,i){
				const rect=d3.select(this).select('rect');
				defaultY[i]=rect.attr("y");
				defaultHeight[i]=rect.attr("height")
			})
			.remove()
			.exit()
			.data(data)
			.enter()
			.append("g")
			.attr("class", "bar")
			.attr("transform", (data, i)=>`translate(${xAxisScale(i) + 30},0)`);

		bar.append("rect")
			.attr("width", 30)
			.attr("fill", "blue")
			.attr("y", (d,i)=>defaultY[i])
			.attr("height", (d,i)=>defaultHeight[i])
			.transition()
			.delay(100)
			.duration(1000)
			.attr("height", dataScale)
			.attr("y", d=>chartHeight - 20 - dataScale(d));

		// append text
		bar.append("text")
			.attr("x", 0)
			.attr("y", (d)=>chartHeight - 20 - dataScale(d) - 2)
			.attr("dx", ".45em")
			.attr("stroke", (d)=> {
				if (d >= 50) {
					return "red"
				}
				return "black"
			})
			.attr("fill", (d)=> {
				if (d >= 50) {
					return "red"
				}
				return "black"
			})
			.text(d=>d);

		// draw x axis

		chart.select("g.x-axis")
			.call(xAxis);

		chart.selectAll("g.y-axis")
			.call(yAxis);
	}

	componentWillUpdate() {
		console.log("will update ...")
	}

	componentDidUpdate() {
		console.log('did update !')
	}

	shouldComponentUpdate(nextProps, nextState) {
		this.drawChart(nextState.data);
		return false;
	}

	componentDidMount() {
		super.componentDidMount();
		console.log("did mount !");
		const chartWidth = 450;
		const chartHeight = 450;
		// append x axis
		d3.select("#chart").append("g")
			.attr('class', 'x-axis')
			.attr("transform", `translate(30,${chartHeight - 20})`);
		// append y axis
		d3.select("#chart").append("g")
			.attr('class', 'y-axis')
			.attr("transform", `translate(30,30)`);
		this.drawChart(this.state.data);
	}
}