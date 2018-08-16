import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Post from "./Post";
import Blog from "./Blog";
import Posts from "../blog-posts";

const home = props => {
	return <Home posts={Posts} {...props} />;
};

const post = props => {
	return <Post posts={Posts} {...props} />;
};

const blog = props => {
	return <Blog posts={Posts} {...props} />;
};

const Router = props => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" render={home} />
			<Route path="/About" component={About} />
			<Route path="/Post/:Slug" render={post} />
			<Route path="/Blog" render={blog} />
		</Switch>
	</BrowserRouter>
);

export default Router;
