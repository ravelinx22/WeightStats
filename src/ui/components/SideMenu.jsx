import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container } from "reactstrap";

import "../css/components/SideMenu.css";
import SideMenuBtn from "./SideMenuBtn.jsx";

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
			<Container>
				<SideMenuBtn text="Home" url="/" />
				<SideMenuBtn text="History" url="/history" />
			</Container>
		);			
	}
}

export default withRouter(SideMenu);
