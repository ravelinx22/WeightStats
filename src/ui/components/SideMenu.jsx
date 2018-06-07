import React, { Component } from "react";
import "../css/SideMenu.css";
import { withRouter } from "react-router-dom";

class SideMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}	
	}

	componentDidMount() {
	}

	render() {
		return(
			<h1>Hello World</h1>					
		);			
	}
}

export default withRouter(SideMenu);
