import React, { Component  } from "react";
import { Row } from "reactstrap";
import { withRouter } from "react-router-dom";

import "../css/components/SideMenuBtn.css";

class SideMenuBtn extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
	}

	onClick() {
		this.props.history.push(this.props.url);
	}

	render() {
		return (
			<Row className="side_menu_btn" onClick={this.onClick.bind(this)}>
				{this.props.text}
			</Row>
		 );
	}
}

export default withRouter(SideMenuBtn);
