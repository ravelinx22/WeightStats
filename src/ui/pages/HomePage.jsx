import React, { Component  } from "react";
import { Row, Col } from "reactstrap";
import "../css/HomePage.css";

import SideMenu from "../components/SideMenu.jsx";

export default class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
	}

	render() {
		return (
			<Row>
				<Col md="4" sm="4" xs="4" className="p">
					<SideMenu/>
				</Col>
				<Col md="8" sm="8" xs="8" className="s">
					Buenas
				</Col>
			</Row>
		);
	}
}
