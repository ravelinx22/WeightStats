import React, { Component  } from "react";

import "../css/components/Btn.css";

export default class RemoveBtn extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
	}

	render() {
		return (
			<button className="option_btn" onClick={this.props.onRemove}>
				<i className="fa fa-trash"></i>
			</button>
		 );
	}
}
