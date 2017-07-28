import React from 'react'
import BasePage from './BasePage'
import Layout from '../components/meta/Layout'

export default class NoMatch extends BasePage {
	render() {
		return (
			<Layout>
				<div>404</div>
			</Layout>
		);
	}
}

