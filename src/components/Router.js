import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeComponent from "./HomeComponent";
import AboutComponent from "./AboutComponent";
import PostComponent from "./PostComponent";

class Router extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={HomeComponent} />
					<Route path="/About" component={AboutComponent} />
					<Route path="/Post" component={PostComponent} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default Router;
