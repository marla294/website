import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Post from "./Post";
import Blog from "./Blog";

class Router extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/About" component={About} />
					<Route path="/Post" component={Post} />
					<Route path="/Blog" component={Blog} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default Router;
