import React from "react";
import BaseComponent from "../BaseComponent.js";
import PropTypes from "prop-types";

export default class UploadFile extends BaseComponent {
	static propTypes = {
		files: PropTypes.array,
		onChange: PropTypes.func
	};
	static defaultProps = {
		files: [],
		onChange:()=>null
	};

	constructor(props) {
		super(props);
		this.state = {
			files: props.files
		};
	}

	render() {
		return (
			<div className="upload-file">
				{this.state.files.map((f, i)=> {
					return (
						<div key={`upload-file-${i}`} className="file">
							{f.name}
							<a href="javascript:void(0)" onClick={()=>{
								this.updateState({
									files:{$splice:[[i,1]]}
								},()=>{
									this.props.onChange([f],[...this.state.files]);
								})
							}}><i className="fa fa-close"></i></a>
						</div>
					);
				})}
				<div className="file-add">
					<i className="fa fa-plus"></i>
					<input type="file" onChange={event=>{
						const files=event.target.files;
						const len=files.length;
						if(len>0){
							let f=[];
							for(let i=0;i<len;i++){
								f.push(files[i])
							}
							this.updateState({
								files:{$push:f}
							},()=>{
								this.props.onChange(f,[...this.state.files]);
							});
						}
					}}/>
				</div>
			</div>
		);
	}
}
