import React, { Component  } from "react";
import { Container } from "reactstrap";

import HistoryItem from "./HistoryItem.jsx";
import "../css/components/HistoryList.css";

export default class HistoryList extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
	}

	renderHistoryItems() {
		const test = [1,2,3,4,5];

		return test.map((item) => {
			return <HistoryItem key={item} />
		});
	}

	render() {
		return (
			<Container className="history_list">
				{this.renderHistoryItems()}
			</Container>
		 );
	}
}
