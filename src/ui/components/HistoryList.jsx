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
		console.log(this.props.data);
		return this.props.data.map((item) => {
			return <HistoryItem key={item._id} item={item}/>
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
