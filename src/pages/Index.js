/**
 * Created by jean.h.ma on 2/6/17.
 */
import React from 'react'
import BasePage from './BasePage'
import Layout from '../components/Layout'
import Nav from '../components/Nav'
import PropTypes from 'prop-types'
import {getDefinedPaths} from '../config/routes.config'
import {Link} from 'react-router'

export default class Index extends BasePage {
	constructor(props){
		super(props);
		this._paths=getDefinedPaths();
	}
	renderPaths(){
		return (
			<ul>
				{this._paths.map((p,i)=>(
					<li key={i}>
						<Link to={p.url}>{p.name}</Link>
					</li>
				))}
			</ul>
		);
	}
	render() {
		return (
			<Layout>
				<Nav title="D3JS Demos"></Nav>
				{this.renderPaths()}
			</Layout>
		);
	}
}
