import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';

import RouteProvider from "../ui/containers/RouteProvider.jsx";

export const renderRoutes = () => (
	<Router>
		<RouteProvider/>
	</Router>
);
