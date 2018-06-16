import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";
import { Route, Switch } from 'react-router-dom';

import SideMenu from "../components/SideMenu.jsx";
import HomePage from "../pages/HomePage.jsx";
import HistoryPage from "../pages/HistoryPage.jsx";
import "../css/containers/RouteProvider.css";
import "../css/components/Btn.css";

class RouteProvider extends Component {
	render() {
		return (
			<Container fluid={true} className="app">
				<Row className="row_app">
					<Col md="3" sm="3" xs="3" className="left_side">
						<SideMenu/>
					</Col>
					<Col md="9" sm="9" xs="9" className="right_side">
						<Switch>
							<Route exact path="/" component={HomePage} />
							<Route exact path="/history" component={HistoryPage} />
						</Switch>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default RouteProvider;
