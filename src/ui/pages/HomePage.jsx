import React, { Component  } from "react";
import { Container, Row, Col } from "reactstrap";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import dateFormat from 'dateformat';
import * as d3 from "d3";

import { lineChart } from "../charts/lineChart.js";
import { getData } from "../utils/testData.js";
import { createReading, getReadings, deleteReading } from "../../api/ReadingAPI.js";
import "../css/pages/HomePage.css";
import "../css/components/Btn.css";
import 'react-datepicker/dist/react-datepicker.css';

export default class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startDate: moment(),
			endDate: moment().add(1, "Y"),
			closeHovered: null,
			close2Hovered: null,
			dateHovered: null
		};
	}

	componentDidMount() {
		this.renderChart();
	}

	componentWillUnmount() {
		window.addEventListener("resize", null);
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

	onRefresh() {
		console.log("Refresh");
	}

	//	Helpers
	renderObjectiveOptions() {
		const options = ["Loss", "Gain"];
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
			.yTitle("Weight (lbs)")
			.xValue(function(d) { 
				return parseTime(d.date) ? parseTime(d.date) : d.date;  })
			.firstYValue(function(d) { return +d.close;  })
			.secondYValue(function(d) { return +d.close2;  })
			.isMultiLine(true)
			.onMouseOver((data) => {
				this.setState({
					closeHovered: data.close,
					close2Hovered: data.close2,
					dateHovered: dateFormat(data.date, "mmmm dd yyyy")
				})
			});

		this.setState({
			chart: chart
		}, () => {
			this.reloadChart();
			window.addEventListener("resize", () => {
				this.reloadChart()
			});
		});
	}

	reloadChart() {
		const svg = d3.select("svg");
		const d = getData();

		svg.datum(d)
			.call(this.state.chart);
	}

	// Filters
	applyDateFilter() {
		console.log("Date filter");
	}

	applyObjectiveFilter() {
		console.log("Objective filter");
	}

	render() {
		return (
			<Container>
				<Row>
					<h3 className="page_title title weight_title">Weight Stats</h3>
					<button className="page_title option_btn title refresh_btn" onClick={this.onRefresh.bind(this)} >
						<i className="fa fa-refresh"></i>
					</button>
				</Row>
				<Row>
					<svg></svg>
				</Row>
				<Row>
					{this.state.close2Hovered ? 
					<div className="reading_hovered">Reading: {this.state.closeHovered} lbs</div> : null }
				</Row>
				<Row>
					{this.state.close2Hovered ? 
					<div className="reading_hovered">Projected: {this.state.close2Hovered} lbs</div> : null }
				</Row>
				<Row>
					{this.state.dateHovered ? 
					<div className="reading_hovered">Date: {this.state.dateHovered}</div> : null }
				</Row>
				<Container>
					<h6 className="title">Filter by date</h6>
					<Row>
						<Col md="4" sm="4" xs="4">
							<DatePicker
								selected={this.state.startDate}
								onChange={this.onStartDateChange.bind(this)}
							/>
						</Col>
						<Col md="4" sm="4" xs="4">
							<DatePicker
								selected={this.state.endDate}
								onChange={this.onEndDateChange.bind(this)}
							/>
						</Col>
						<Col md="4" sm="4" xs="4"> 
							<button className="full_btn option_btn" onClick={this.applyDateFilter.bind(this)}>Apply</button>
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
							<div>Amount Weekly (lbs)</div>
							<select>
								{this.renderWeightOptions()}
							</select>
						</Col>
						<Col md="4" sm="4" xs="4" className="options_col">
							<div>Options</div>
							<button className="option_btn" onClick={this.applyObjectiveFilter.bind(this)}>Apply</button>
						</Col>
					</Row>
				</Container>
			</Container>
		);
	}
}
