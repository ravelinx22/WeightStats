import React, { Component  } from "react";
import { Container, Row } from "reactstrap";
import * as d3 from "d3";

import "../css/pages/HomePage.css";

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
			<Container>
				<Row>
					<h3 className="page_title title">Weight Stats</h3>
				</Row>
				<Row>
					<h6 className="title">Filter by date</h6>
				</Row>
				<Row>
					<h6 className="title">Compare with objective</h6>
				</Row>
			</Container>
		);
	}
}
