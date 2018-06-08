import React, { Component  } from "react";
import { Container, Row, Col } from "reactstrap";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import * as d3 from "d3";

import "../css/pages/HomePage.css";
import 'react-datepicker/dist/react-datepicker.css';

export default class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startDate: moment(),
			endDate: moment().add(1, "Y")
		};
	}

	componentDidMount() {
	}

	// Listeners

	onStartDateChange(date) {
		this.setState({
			startDate: date
		});
	}

	onEndDateChange(date) {
		this.setState({
			endDate: date
		});
	}

	//	Helpers
	renderObjectiveOptions() {
		const options = ["Loss", "Gain"];
		return options.map((option) => {
			return <option value={option}>{option}</option>
		});
	}

	renderFrequencyOptions() {
		const options = ["Weekly", "Montly"];
		return options.map((option) => {
			return <option value={option}>{option}</option> 
		});
	}

	renderWeightOptions() {
		const options = ["0.5","1.0"];
		return options.map((option) => {
			return <option value={option}>{option}</option>;
		});
	}

	render() {
		return (
			<Container>
				<Row>
					<h3 className="page_title title">Weight Stats</h3>
				</Row>
				<Container>
					<h6 className="title">Filter by date</h6>
					<Row>
						<Col md="6">
							<DatePicker
								selected={this.state.startDate}
								onChange={this.onStartDateChange.bind(this)}
							/>
						</Col>
						<Col md="6">
							<DatePicker
								selected={this.state.endDate}
								onChange={this.onEndDateChange.bind(this)}
							/>
						</Col>
					</Row>
				</Container>
				<Container>
					<h6 className="title">Compare with objective</h6>
					<Row>
						<Col md="4" className="options_col">
							<div>Objective</div>
							<select>
								{this.renderObjectiveOptions()}	
							</select>
						</Col>
						<Col md="4" className="options_col">
							<div>Frequency</div>
							<select>
								{this.renderFrequencyOptions()}	
							</select>
						</Col>
						<Col md="4" className="options_col">
							<div>Amount (lbs)</div>
							<select>
								{this.renderWeightOptions()}
							</select>
						</Col>
					</Row>
				</Container>
			</Container>
		);
	}
}
