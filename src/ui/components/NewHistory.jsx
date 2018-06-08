import React, { Component  } from "react";
import { Row, Col } from "reactstrap";

import "../css/components/NewHistory.css";

export default class NewHistory extends Component {
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
				<Col md="4" className="new_history_col">
				</Col>
				<Col md="4" className="new_history_col">
					<input type="number"/>
				</Col>
				<Col md="4" className="new_history_col">
					<button>Add</button>
				</Col>
			</Row>
		 );
	}
}
