import React, { Component  } from "react";
import { Row, Col } from "reactstrap";

import RemoveBtn from "./RemoveBtn.jsx";
import EditBtn from "./EditBtn.jsx";
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
				<Col md="4" sm="4" xs="4" className="history_col">
					20-09-18
				</Col>
				<Col md="4" sm="4" xs="4" className="history_col">
					128 lbs
				</Col>
				<Col md="4" sm="4" xs="4" className="history_col">
					<Row className="justify-content-center">
						<EditBtn/>
						<RemoveBtn/>
					</Row>
				</Col>
			</Row>
		 );
	}
}
