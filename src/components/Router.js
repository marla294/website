import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Post from "./Post";
import Blog from "./Blog";
import Posts from "../blog-posts";
// import Contact from "./Contact";

class Router extends React.Component {
	state = {
		Posts
	};

	home = props => {
		return <Home posts={this.state.Posts} {...props} />;
	};

	post = props => {
		return <Post posts={this.state.Posts} {...props} />;
	};

	blog = props => {
		return <Blog posts={this.state.Posts} {...props} />;
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
