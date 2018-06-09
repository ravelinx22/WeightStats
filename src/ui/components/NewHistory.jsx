import React, { Component  } from "react";
import { Row, Col } from "reactstrap";
import DatePicker from 'react-datepicker';
import moment from 'moment';

import "../css/components/NewHistory.css";
import 'react-datepicker/dist/react-datepicker.css';
import "../css/components/Btn.css";

export default class NewHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedDate: moment(),
		};
	}

	componentDidMount() {
	}

	onDateChange(date) {
		this.setState({
			selectedDate: date
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
					<input type="number"/>
				</Col>
				<Col md="4" sm="4" xs="4" className="new_history_col">
					<button className="option_btn">Add</button>
				</Col>
			</Row>
		);
	}
}
