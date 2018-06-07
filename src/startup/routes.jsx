import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from "../ui/containers/App.jsx";
import HomePage from "../ui/pages/HomePage.jsx";
import HistoryPage from "../ui/pages/HistoryPage.jsx";

export const renderRoutes = () => (
	<Router>
		<App>
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route exact path="/history" component={HistoryPage} />
			</Switch>
		</App>
	</Router>
);
