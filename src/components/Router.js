import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./GlobalStyles";
import Home from "./Home";
import About from "./About";
import Post from "./Post";
import Blog from "./Blog";
import Posts from "../blog-posts";
import Projects from './Projects';
import ManageAbout from "./ManageAbout";
import base from '../base';

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

const projects = props => {
	return <Projects posts={Posts} {...props} />;
};

class Router extends React.Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" render={home} />
						<Route path="/About" component={About} />
						<Route path="/Post/:Slug" render={post} />
						<Route path="/Blog" render={blog} />
						<Route path="/Projects" render={projects} />
						<Route path="/Manage/About" component={ManageAbout} />
					</Switch>
				</BrowserRouter>
			</ThemeProvider>
		);
	}
}

export default Router;
