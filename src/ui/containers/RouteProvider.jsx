import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";
import { Route, Switch } from 'react-router-dom';
import { getReadings } from "../../api/ReadingAPI.js";

import SideMenu from "../components/SideMenu.jsx";
import HomePage from "../pages/HomePage.jsx";
import HistoryPage from "../pages/HistoryPage.jsx";
import "../css/containers/RouteProvider.css";
import "../css/components/Btn.css";

const { ipcRenderer } = window.require('electron');
const ObjectID = require("bson-objectid");

class RouteProvider extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
	}

	componentDidMount() {
		this.setupSubscriptions();
	}

	componentWillUnmount() {
		this.unSetupSubscriptions();
	}

	// Subscriptions
	setupSubscriptions() {
		ipcRenderer.on("responseGetReadings", this.handleGetReadings.bind(this));
		ipcRenderer.on("responseCreateReading", this.handleCreateReading.bind(this));
		ipcRenderer.on("responseDeleteReading", this.handleDeleteReading.bind(this));
	}

	unSetupSubscriptions() {
		ipcRenderer.removeListener("responseGetReadings", () => {});
		ipcRenderer.removeListener("responseCreateReading", () => {});
		ipcRenderer.removeListener("responseDeleteReading", () => {});
	}

	// Response Handlers
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
		getReadings({});
	}

	handleDeleteReading(event) {
		getReadings({});
	}

	render() {
		return (
			<Container fluid={true} className="app">
				<Row className="row_app">
					<Col md="3" sm="3" xs="3" className="left_side">
						<SideMenu/>
					</Col>
					<Col md="9" sm="9" xs="9" className="right_side">
						<Switch>
							<Route exact path="/" render={(props) => {
								return React.createElement(HomePage, {...props});
							}} />
						<Route exact path="/history" render={(props) => {
							return React.createElement(HistoryPage, {...props, data: this.state.data});
						}} />
				</Switch>
			</Col>
		</Row>
	</Container>
		);
	}
}

export default RouteProvider;
