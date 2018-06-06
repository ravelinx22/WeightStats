import React, { Component } from 'react';
import { Container } from "reactstrap";

class App extends Component {
  render() {
    return (
		<Container fluid={true} className="App">
			{this.props.children}
		</Container>
    );
  }
}

export default App;
