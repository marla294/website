import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./GlobalStyles";
import Home from "./Home";
import About from "./About";
import Post from "./Post";
import Blog from "./Blog";
import Posts from "../blog-posts";

/* Render Functions */

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
	<ThemeProvider theme={theme}>
		<BrowserRouter>
			<Switch>
				<Route exact path="/" render={home} />
				<Route path="/About" component={About} />
				<Route path="/Post/:Slug" render={post} />
				<Route path="/Blog" render={blog} />
			</Switch>
		</BrowserRouter>
	</ThemeProvider>
);

export default Router;
