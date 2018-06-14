import React, { Component  } from "react";
import { Container, Row, Col } from "reactstrap";
import { createReading, getReadings, deleteReading } from "../../api/ReadingAPI.js";

import NewHistory from "../components/NewHistory";
import HistoryList from "../components/HistoryList";
const { ipcRenderer } = window.require('electron');
const ObjectID = require("bson-objectid");

export default class HistoryPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
	}

	componentDidMount() {
		this.setupSubscriptions();
		getReadings();
	}
	
	componentWillUnmount() {
		this.unSetupSubscriptions();
	}
	
	setupSubscriptions() {
		ipcRenderer.on("responseGetReadings", this.handleGetReadings.bind(this));
		ipcRenderer.on("responseCreateReading", this.handleGetReadings.bind(this));
		ipcRenderer.on("responseDeleteReading", this.handleGetReadings.bind(this));
	}

	unSetupSubscriptions() {
		ipcRenderer.removeListener("responseGetReadings", this.handleGetReadings);
		ipcRenderer.removeListener("responseCreateReading", this.handleGetReadings);
		ipcRenderer.removeListener("responseDeleteReading", this.handleGetReadings);
	}

	// Response handlers
	handleGetReadings(event, docs) {
		const data = docs.map((d) => {
			d._doc._id = ObjectID(d._doc._id.id).str;
			return d._doc;	
		});
		this.setState({
			data: data
		});
	}

	handleCreateReading(event) {
		console.log("Se creo");
	}

	handleDeleteReading(event) {
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
				<HistoryList data={this.state.data}/>
			</Container>
		 );
	}
}
