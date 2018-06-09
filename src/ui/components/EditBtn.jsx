import React, { Component  } from "react";

import "../css/components/Btn.css";

export default class EditBtn extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
	}

	render() {
		return (
			<button className="option_btn">
				<i className="fa fa-edit"></i>
			</button>
		 );
	}
}
