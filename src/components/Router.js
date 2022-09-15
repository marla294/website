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
import base, { firebaseApp, firebaseStorage } from '../base';

class Router extends React.Component {
	state = {
		data: {
			about: {},
			posts: [],
		},
		archivedPosts: [],
		aboutImageUrl: "",
	};

	async componentDidMount() {
		// this.ref = base.syncState('data', {
		// 	context: this,
		// 	state: 'data'
		// });
		this.storageRef = firebaseStorage.ref();
		this.aboutImageRef = this.storageRef.child('About.jpg');
		this.dbRef = firebaseApp.database().ref();
		this.postDataRef = this.dbRef.child('data');
		this.archiveDataRef = this.dbRef.child('private/archivedPosts');

		this.aboutImageRef.getDownloadURL().then(url => {
			this.setState({aboutImageUrl: url})
		});

		const postData = await (await this.postDataRef.once('value')).val();
		const posts = [];

		if (postData) {
			const postIds = Object.keys(postData.posts);

			for (let i = 0; i < postIds.length; i++) {
				posts.push(postData.posts[postIds[i]]);
			}
		}



		const archivedPostData = await (await this.archiveDataRef.once('value')).val();
		const archivedPosts = [];

		if (archivedPostData) {
			const archivedPostIds = Object.keys(archivedPostData);
			for (let i = 0; i < archivedPostIds.length; i++) {
				archivedPosts.push(archivedPostData[archivedPostIds[i]]);
			}
		}
		
		this.setState({ data: {
			about: {...postData.about},
			posts: [...posts],
		},
		archivedPosts: [...archivedPosts]});
	}

	updateAbout = async (about) => {
		this.setState({ data: {
			about: {...about},
			posts: [...this.state.data.posts],
		},
		archivedPosts: [...this.state.archivedPosts]});

		const aboutDataRef = this.dbRef.child('data/about');
		await aboutDataRef.set({blurb: about.blurb});
	};

	// options object:
	// postId - associate all images with post
	// isAbout - if true then it is the About page image
	// isHeader - if true then rename the image to Header (postId should also be filled)
	uploadImages = (images, options) => {
		if (options.isAbout) {
			const [ aboutImage ] = images;
			if (aboutImage) {
				const metaData = {
					contentType: aboutImage.type
				};
				this.aboutImageRef.put(aboutImage, metaData);
			}
			return;
		}
		if (options.isHeader && options.postId) {
			const [ headerImage ] = images;
			const metaData = {
				contentType: headerImage.type,
				public: true
			};
			const headerImageRef = this.storageRef.child(`/${options.postId}/Header.jpg`);
			headerImageRef.put(headerImage, metaData);
			return;
		}
		if (options.postId) {
			images.forEach((image) => {
				const metaData = {
					contentType: image.type
				};
				const postImageRef = this.storageRef.child(`/${options.postId}/${image.name}`);
				postImageRef.put(image, metaData);
			});
		}
	};

	// options object:
	// postId - return all images associated with a post
	loadImages = async (options) => {
    let images = [];

		if (options.postId) {
			const imageRefArray = Array.from((await this.storageRef.child(`/${options.postId}`).listAll()).items);

			for (let i = 0; i < imageRefArray.length; i++) {
				let ref = imageRefArray[i];
				const url = await ref.getDownloadURL();
				images.push({
					url,
					name: ref.name,
				});
			}
		}
    
		return images;
	};

	deletePostImages = async (postId, imageNames) => {
		for (let i = 0; i < imageNames.length; i++) {
			const imageName = imageNames[i];
			const postImageRef = this.storageRef.child(`/${postId}/${imageName}`);
			await postImageRef.delete();
		}
	};

	addNewPost = async (post) => {
		if (post.status === 'archive') {
			const updatedPosts = this.state.archivedPosts ? [...this.state.archivedPosts, post] : [post];

			this.setState({ data: {
				about: {...this.state.data.about},
				posts: [...this.state.data.posts],
				},
				archivedPosts: updatedPosts,
			});

			const archivedPostsRef = this.dbRef.child('private/archivedPosts');
			await archivedPostsRef.set(updatedPosts);
		}
		else {
			const updatedPosts = this.state.data.posts ? [...this.state.data.posts, post] : [post];

			this.setState({ data: {
				about: {...this.state.data.about},
				posts: updatedPosts,
				},
				archivedPosts: [...this.state.archivedPosts],
			});

			const postsRef = this.dbRef.child('data/posts');
			await postsRef.set(updatedPosts);
		}
	};

	editPost = async (post) => {
		const filteredArchivedPosts = this.state.archivedPosts ? this.state.archivedPosts.filter(p => p.id !== post.id) : [];
		const filteredPosts = this.state.data.posts ? this.state.data.posts.filter(p => p.id !== post.id) : [];
		if (post.status === 'archive') {
			const updatedArchivedPosts = [...filteredArchivedPosts, post];
			
			this.setState({ data: {
				about: {...this.state.data.about},
				posts: filteredPosts,
				},
				archivedPosts: updatedArchivedPosts,
			});

			await base.post('private/archivedPosts', {data: updatedArchivedPosts});
		}
		else {
			const updatedPosts = [...filteredPosts, post];
	
			this.setState({ data: {
				about: {...this.state.data.about},
				posts: updatedPosts,
				},
				archivedPosts: filteredArchivedPosts,
			});

			await base.post('data/posts', {data: updatedPosts});
		}
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
								loadImages={this.loadImages}
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
						<Route path="/Manage/About" render={(props) => {
							return <ManageAbout 
										updateAbout={this.updateAbout} 
										about={this.state.data.about}
										uploadImages={this.uploadImages}
										{...props}
									/>
						}} />
						<Route path="/Manage/Post/Add" render={(props) => {
							return <AddPost
								addNewPost={this.addNewPost}
								uploadImages={this.uploadImages}
								{...props}
							/>
						}} />
						<Route path="/Manage/Post/Edit/:Slug" render={(props) => {
							return <EditPost
								editPost={this.editPost}
								uploadImages={this.uploadImages}
								deletePostImages={this.deletePostImages}
								loadImages={this.loadImages}
								posts={this.state.data.posts}
								archivedPosts={this.state.archivedPosts}
								storageRef={this.storageRef}
								{...props}
							/>
						}} />
						<Route path="/Manage" render={(props) => {
							return <Manage 
								posts={this.state.data.posts}
								archivedPosts={this.state.archivedPosts}
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
