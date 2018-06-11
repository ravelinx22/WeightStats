import React, { Component  } from "react";
import { Container, Row, Col } from "reactstrap";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import * as d3 from "d3";

import { lineChart } from "../charts/lineChart.js";
import { getData } from "../utils/testData.js";
import "../css/pages/HomePage.css";
import "../css/components/Btn.css";
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
		this.renderChart();
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
			return <option value={option} key={option}>{option}</option>
		});
	}

	renderFrequencyOptions() {
		const options = ["Weekly", "Montly"];
		return options.map((option) => {
			return <option value={option} key={option}>{option}</option> 
		});
	}

	renderWeightOptions() {
		const options = ["0.5","1.0"];
		return options.map((option) => {
			return <option value={option} key={option}>{option}</option>;
		});
	}

	renderChart() {
		var parseTime = d3.timeParse("%d-%b-%y");

		var chart = lineChart()
			.xValue(function(d) { 
				return parseTime(d.date) ? parseTime(d.date) : d.date;  })
			.firstYValue(function(d) { return +d.close;  })
			.secondYValue(function(d) { return +d.close2;  });

		const svg = d3.select("svg");
		const d = getData();

		svg.datum(d)
			.call(chart);
	}

	render() {
		return (
			<Container>
				<Row>
					<h3 className="page_title title">Weight Stats</h3>
				</Row>
				<Row>
					<svg width="960" height="500"></svg>
				</Row>
				<Container>
					<h6 className="title">Filter by date</h6>
					<Row>
						<Col md="6" sm="6" xs="6">
							<DatePicker
								selected={this.state.startDate}
								onChange={this.onStartDateChange.bind(this)}
							/>
						</Col>
						<Col md="6" sm="6" xs="6">
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
						<Col md="4" sm="4" xs="4" className="options_col">
							<div>Objective</div>
							<select>
								{this.renderObjectiveOptions()}	
							</select>
						</Col>
						<Col md="4" sm="4" xs="4" className="options_col">
							<div>Frequency</div>
							<select>
								{this.renderFrequencyOptions()}	
							</select>
						</Col>
						<Col md="4" sm="4" xs="4" className="options_col">
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
