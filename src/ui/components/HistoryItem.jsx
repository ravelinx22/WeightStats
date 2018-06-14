import React, { Component  } from "react";
import { Row, Col } from "reactstrap";
import dateFormat from 'dateformat';

import RemoveBtn from "./RemoveBtn.jsx";
import "../css/components/HistoryItem.css";

export default class HistoryItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
	}

	onRemove() {
		console.log("buenas");
	}

	render() {
		return (
			<Row className="history_item">
				<Col md="4" sm="4" xs="4" className="history_col">
					{dateFormat(this.props.item.date, "mmmm dd, yyyy")}
				</Col>
				<Col md="4" sm="4" xs="4" className="history_col">
					{this.props.item.value} lbs
				</Col>
				<Col md="4" sm="4" xs="4" className="history_col">
					<Row className="justify-content-end">
						<RemoveBtn onRemove={this.onRemove.bind(this)} />
					</Row>
				</Col>
			</Row>
		 );
	}
}
