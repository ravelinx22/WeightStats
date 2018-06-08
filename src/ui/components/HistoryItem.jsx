import React, { Component  } from "react";
import { Row, Col } from "reactstrap";

import "../css/components/HistoryItem.css";

export default class HistoryItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
	}

	render() {
		return (
			<Row className="history_item">
				<Col md="4" className="history_col">
					20-09-18
				</Col>
				<Col md="4" className="history_col">
					128 Kg
				</Col>
				<Col md="4" className="history_col">
					<Row className="justify-content-center">
						<button>Edit</button>
						<button>Remove</button>
					</Row>
				</Col>
			</Row>
		 );
	}
}
