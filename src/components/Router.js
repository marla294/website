import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Post from "./Post";
import Blog from "./Blog";
import Posts from "../blog-posts";
// import Contact from "./Contact";

class Router extends React.Component {
	home = props => {
		return <Home posts={Posts} {...props} />;
	};

	post = props => {
		return <Post posts={Posts} {...props} />;
	};

	blog = props => {
		return <Blog posts={Posts} {...props} />;
	};

	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" render={this.home} />
					<Route path="/About" component={About} />
					<Route path="/Post/:Slug" render={this.post} />
					<Route path="/Blog" render={this.blog} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default Router;
