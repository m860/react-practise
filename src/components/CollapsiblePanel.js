/**
 * Created by jean.h.ma on 05/06/2017.
 */
import BaseComponent from "./BaseComponent.js"
import PropTypes from 'prop-types'

export default class CollapsiblePanel extends BaseComponent {
	static propTypes = {
		expand: PropTypes.bool,
		header: PropTypes.any.isRequired,
		headerButtons:PropTypes.array,
		children: PropTypes.any,
		onCollapse: PropTypes.func,
		style: PropTypes.any
	};
	static defaultProps = {
		expand: false,
		onCollapse: ()=>null,
		style: {},
		headerButtons:[]
	};

	constructor(props) {
		super(props);
		this.state = {
			expand: props.expand
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState(
			$update(this.state, {
				expand: {$set: nextProps.expand}
			})
		)
	}

	renderContent() {
		if (this.state.expand) {
			return this.props.children
		}
		return null;
	}

	render() {
		return (
			<div className="flex flex-col" style={{flex:1,border:"solid 1px silver",...this.props.style}}>
				<div className="flex flex-row" style={{backgroundColor:"silver",padding:"2px 5px"}}>
					<div className="flex" style={{flex:1,alignItems:"center"}}>
						{this.props.header}
					</div>
					<div className="flex" style={{flex:1,alignItems:"center",justifyContent:"flex-end"}}>
						{this.props.headerButtons.map((button)=>{
							return button;
						})}
						<a className="pure-button"
						   onClick={()=>{
						   		this.setState(
									$update(this.state,{
										expand:{$set:!this.state.expand}
									}),()=>{
										this.props.onCollapse(this.state.expand);
									}
								)
							}}>
							<i className={classNames("fa",this.state.expand?"fa-angle-up":"fa-angle-down")}></i>
						</a>
					</div>
				</div>
				<div className="flex" style={{flex:1,overflow:"hidden"}}>
					{this.renderContent()}
				</div>
			</div>
		);
	}
}