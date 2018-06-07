import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";

import SideMenu from "../components/SideMenu.jsx";
import "../css/containers/App.css";

class App extends Component {
	render() {
		return (
			<Container fluid={true} className="app">
				<Row className="row_app" fluid={true}>
					<Col md="3" sm="3" xs="3" className="left_side">
						<SideMenu/>
					</Col>
					<Col md="9" sm="9" xs="9" className="right_side">
						{this.props.children}
					</Col>
				</Row>
			</Container>
		);
	}
}

export default App;
