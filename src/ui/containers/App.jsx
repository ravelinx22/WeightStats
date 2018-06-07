import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";

import SideMenu from "../components/SideMenu.jsx";

class App extends Component {
	render() {
		return (
			<Container fluid={true} className="App">
				<Row>
					<Col md="3" sm="3" xs="3">
						<SideMenu/>
					</Col>
					<Col md="9" sm="9" xs="9">
						{this.props.children}
					</Col>
				</Row>
			</Container>
		);
	}
}

export default App;
