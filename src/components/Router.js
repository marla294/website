import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Post from "./Post";
import Blog from "./Blog";
import posts from "../blog-posts";

class Router extends React.Component {
	/* Blog posts live in the router for now */
	state = {
		posts: {}
	};

	/* Load blog posts into state */
	loadBlogPosts = () => {
		this.setState({ posts });
	};

	componentDidMount() {
		this.loadBlogPosts();
	}

	blog = () => {
		return <Blog posts={this.state.posts} />;
	};

	/* Home component needs the router props to pass to TopNav component */
	home = props => {
		return <Home posts={this.state.posts} {...props} />;
	};

	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" render={this.home} />
					<Route path="/About" component={About} />
					<Route path="/Post" component={Post} />
					<Route path="/Blog" render={this.blog} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default Router;
