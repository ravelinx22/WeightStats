import React, { Component  } from "react";
import { Row, Col } from "reactstrap";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { createReading } from "../../api/ReadingAPI.js";

import "../css/components/NewHistory.css";
import 'react-datepicker/dist/react-datepicker.css';
import "../css/components/Btn.css";

export default class NewHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedDate: moment(),
			value: 0,
		};
	}

	componentDidMount() {
	}

	// Listeners
	onDateChange(date) {
			this.setState({
			selectedDate: date
		});
	}

	onValueChange(event) {
		event.preventDefault();
				this.setState({
			value: Number(event.target.value)
		});
	}

	onAdd() {
		createReading({
			value: this.state.value,
			taken: this.state.selectedDate.toDate()
		});
	}

	render() {
		return (
			<Row>
				<Col md="4" sm="4" xs="4" className="new_history_col">
					<DatePicker
						selected={this.state.selectedDate}
						onChange={this.onDateChange.bind(this)}
					/>
				</Col>
				<Col md="4" sm="4" xs="4" className="new_history_col">
					<input type="number" onChange={this.onValueChange.bind(this)} min="0" step="1" placeholder="0" />
				</Col>
				<Col md="4" sm="4" xs="4" className="new_history_col">
					<button className="option_btn" onClick={this.onAdd.bind(this)}>Add</button>
				</Col>
			</Row>
		);
	}
}
