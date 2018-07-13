import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeComponent from "./HomeComponent";
import AboutComponent from "./AboutComponent";

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={HomeComponent} />
			<Route path="/About" component={AboutComponent} />
		</Switch>
	</BrowserRouter>
);

export default Router;
