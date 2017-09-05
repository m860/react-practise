/**
 * Created by jean.h.ma on 2/6/17.
 */
import React, {Component} from "react";
import BasePage from "./BasePage";
import LayoutWithNav from "../components/LayoutWithNavigation";
import {Link} from "react-router";
import Flicker from '../components/animations/Flicker'

class FadeAnimationDemo extends Component {
	render() {
		return (
			<Flicker>
				<div>hello fade animation !!!</div>
			</Flicker>
		);
	}
}

export default class AnimationDemo extends BasePage {
	render() {
		return (
			<LayoutWithNav>
				<h5>Fade Animatioin</h5>
				<FadeAnimationDemo/>
			</LayoutWithNav>
		);
	}
}
