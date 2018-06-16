import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";
import { Route, Switch } from 'react-router-dom';
import { getReadings } from "../../api/ReadingAPI.js";
import { weeksPassed } from "../utils/Date.js";
import Constants from "../utils/Constants.js";

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
			data: [],
			objectiveFilter: Constants.LOSS,
			amountFilter: Constants.POUND
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
		const firstReading = (docs.length > 0) ? docs[docs.length-1] : null; 
		const data = docs.map((d) => {
			d._doc._id = ObjectID(d._doc._id.id).str;
			d._doc.proyected = this.getProyected(d._doc, firstReading._doc);
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

	// Listeners
	onObjectiveFilterChange(event) {
		this.setState({
			objectiveFilter: event.target.value
		}, () => {
			this.reloadProyected();
		});
	}

	onAmountFilterChange(event) {
		this.setState({
			amountFilter: event.target.value
		}, () => {
			this.reloadProyected();
		});
	}

	// Helpers
	getProyected(data, firstReading) {
		if(!firstReading) return;
		const startDate = new Date(firstReading.taken);
		const endDate = new Date(data.taken);
		const weeks = weeksPassed(startDate, endDate);
		const amount = weeks * this.state.amountFilter;

		if(this.state.objectiveFilter === Constants.LOSS) {
			return firstReading.value - amount;
		} else if(this.state.objectiveFilter === Constants.GAIN) {
			return firstReading.value + amount;
		}
	}

	reloadProyected() {
		const firstReading = (this.state.data.length > 0) ? this.state.data[this.state.data.length-1] : null; 
		this.state.data.map((d) => {
			d.proyected = this.getProyected(d, firstReading);
		});
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
								return React.createElement(HomePage, {...props, 
									data: this.state.data,
									objectiveFilter: this.state.objectiveFilter,
									amountFilter: this.state.amountFilter,
									onObjectiveFilterChange: this.onObjectiveFilterChange.bind(this),
									onAmountFilterChange: this.onAmountFilterChange.bind(this)
								});
							}} />
						<Route exact path="/history" render={(props) => {
							return React.createElement(HistoryPage, {...props,
								data: this.state.data
							});
						}} />
				</Switch>
			</Col>
		</Row>
	</Container>
		);
	}
}

export default RouteProvider;
