import React, { Component  } from "react";
import { Container, Row, Col } from "reactstrap";
import { getReadings } from "../../api/ReadingAPI.js";

import NewHistory from "../components/NewHistory";
import HistoryList from "../components/HistoryList";
import "../css/pages/HistoryPage.css";

export default class HistoryPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
		getReadings();
	}

	render() {
		return (
			<Container>
				<Row>
					<h3 className="page_title title">Weight History</h3>
				</Row>
				<Row>
					<Col md="4" sm="4" xs="4" className="title row_title">Date</Col>
					<Col md="4" sm="4" xs="4" className="title row_title">Weight (lbs)</Col>
					<Col md="4" sm="4" xs="4" className="title row_title">Options</Col>
				</Row>
				<NewHistory/>
				<HistoryList data={this.props.data}/>
			</Container>
		);
	}
}
