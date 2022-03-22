import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./GlobalStyles";
import Home from "./Home";
import About from "./About";
import Post from "./Post";
import Blog from "./Blog";
import Projects from './Projects';
import ManageAbout from "./Manage/ManageAbout";
import AddPost from "./Manage/AddPost";
import EditPost from './Manage/EditPost';
import Manage from './Manage/Manage';
import base, { firebaseStorage } from '../base';

class Router extends React.Component {
	state = {
		data: {
			about: {},
			posts: [],
		},
		aboutImageUrl: "",
	};

	componentDidMount() {
		this.ref = base.syncState('data', {
			context: this,
			state: 'data'
		});

		this.storageRef = firebaseStorage.ref();
		this.aboutImageRef = this.storageRef.child('About.jpg');

		this.aboutImageRef.getDownloadURL().then(url => {
			this.setState({aboutImageUrl: url})
		});
	}

	componentWillUnmount() {
    base.removeBinding(this.ref);
		base.removeBinding(this.storageRef);
    }

	updateAbout = (about) => {
		this.setState({ data: {
			about: {...about},
			posts: [...this.state.data.posts]
		}});
	}

	uploadAboutImage = (image) => {
		const metaData = {
			contentType: 'image/jpeg'
		};

		this.aboutImageRef.put(image, metaData);
	}

	uploadPostHeader = (image, postId) => {
		const metaData = {
			contentType: 'image/jpeg'
		};

		this.postImageRef = this.storageRef.child(`/${postId}/Header.jpg`);

		this.postImageRef.put(image, metaData);
	};

	uploadPostImages = (images, postId, startIndex) => {
		const metaData = {
			contentType: 'image/jpeg'
		};

		images.forEach((image, i) => {
			this.postImageRef = this.storageRef.child(`/${postId}/image_${i + startIndex}.jpg`);

			this.postImageRef.put(image, metaData);
		});
	};

	addNewPost = (post) => {
		const updatedPosts = this.state.data.posts ? [...this.state.data.posts, post] : [post];

		this.setState({ data: {
			about: {...this.state.data.about},
			posts: updatedPosts
		}});
	};

	editPost = (post) => {
		const filteredPosts = this.state.data.posts ? this.state.data.posts.filter(p => p.id !== post.id) : [];
		const updatedPosts = [...filteredPosts, post];

		this.setState({ data: {
			about: {...this.state.data.about},
			posts: updatedPosts
		}});
	};

	render() {
		return (
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" render={(props) => {
							return <Home 
								posts={this.state.data.posts} 
								{...props} 
								storageRef={this.storageRef}
							/>;
						}} />
						<Route path="/About" render={(props) => {
							return <About 
								about={this.state.data.about} 
								aboutImageUrl={this.state.aboutImageUrl}
								{...props} 
							/>
						}} />
						<Route path="/Post/:Slug" render={(props) => {
							return <Post 
								posts={this.state.data.posts} 
								storageRef={this.storageRef}
								{...props} 
							/>;
						}} />
						<Route path="/Blog" render={(props) => {
							return <Blog 
								posts={this.state.data.posts} 
								storageRef={this.storageRef}
								{...props} 
							/>;
						}} />
						<Route path="/Projects" render={(props) => {
							return <Projects posts={this.state.data.posts} {...props} />;
						}} />
						<Route path="/Manage/About" render={() => {
							return <ManageAbout 
										updateAbout={this.updateAbout} 
										about={this.state.data.about}
										uploadAboutImage={this.uploadAboutImage}
									/>
						}} />
						<Route path="/Manage/Post/Add" render={(props) => {
							return <AddPost
								addNewPost={this.addNewPost}
								uploadPostHeader={this.uploadPostHeader}
								{...props}
							/>
						}} />
						<Route path="/Manage/Post/Edit/:Slug" render={(props) => {
							return <EditPost
								editPost={this.editPost}
								uploadPostHeader={this.uploadPostHeader}
								uploadPostImages={this.uploadPostImages}
								posts={this.state.data.posts} 
								storageRef={this.storageRef}
								{...props}
							/>
						}} />
						<Route path="/Manage" render={(props) => {
							return <Manage 
								posts={this.state.data.posts}
								{...props}
							/>
						}} />
					</Switch>
				</BrowserRouter>
			</ThemeProvider>
		);
	}
}

export default Router;
