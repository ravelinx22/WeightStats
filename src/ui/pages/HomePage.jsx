import React, { Component  } from "react";
import { Container, Row, Col } from "reactstrap";
import DatePicker from 'react-datepicker';
import dateFormat from 'dateformat';
import Constants from "../utils/Constants.js";
import * as d3 from "d3";

import { lineChart } from "../charts/lineChart.js";
import { getReadings } from "../../api/ReadingAPI.js";
import "../css/pages/HomePage.css";
import 'react-datepicker/dist/react-datepicker.css';

export default class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startDate: Constants.DEFAULT_START_DATE,
			endDate: Constants.DEFAULT_END_DATE,
			closeHovered: null,
			close2Hovered: null,
			dateHovered: null
		};
	}

	componentDidMount() {
		getReadings();
		this.renderChart();
	}

	componentDidUpdate() {
		this.reloadChart();
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
		this.state.chart
			.isMultiLine(false);
		getReadings({});
	}

	//	Helpers
	renderObjectiveOptions() {
		const options = [Constants.LOSS, Constants.GAIN];
		return options.map((option) => {
			return <option value={option} key={option}>{option}</option>
		});
	}

	renderWeightOptions() {
		const options = [Constants.POUND,Constants.TWO_POUNDS];
		return options.map((option) => {
			return <option value={option} key={option}>{option}</option>;
		});
	}

	renderChart() {
		var parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");

		var chart = lineChart()
			.yTitle("Weight (lbs)")
			.xValue(function(d) {
				return parseTime(d.taken) ? parseTime(d.taken) : d.taken;  })
			.firstYValue(function(d) { return +d.value;  })
			.secondYValue(function(d) { return +d.proyected;  })
			.onMouseOver((data) => {
				this.setState({
					closeHovered: data.close,
					close2Hovered: data.close2,
					dateHovered: dateFormat(data.taken, "mmmm dd yyyy")
				})
			});

		this.setState({
			chart: chart
		}, () => {
			this.reloadChart();
			window.addEventListener("resize", () => {
				this.reloadChart();
			});
		});
	}

	reloadChart() {
		const svg = d3.select("svg");

		svg.datum(this.props.data)
			.call(this.state.chart);
	}

	// Filters
	applyDateFilter() {
		this.state.chart
			.isMultiLine(false);
		getReadings({
			taken: {
				$gte: this.state.startDate.toDate(),
				$lte: this.state.endDate.toDate()
			}
		});	
	}

	applyObjectiveFilter() {
		this.state.chart
			.isMultiLine(true);
		this.reloadChart();
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
													<select defaultValue={this.props.objectiveFilter} onChange={this.props.onObjectiveFilterChange}>
														{this.renderObjectiveOptions()}	
													</select>
												</Col>
												<Col md="4" sm="4" xs="4" className="options_col">
													<div>Amount Weekly (lbs)</div>
													<select defaultValue={this.props.amountFilter} onChange={this.props.onAmountFilterChange}>
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
