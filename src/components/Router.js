import React, { useEffect, useState } from 'react';
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
import { firebaseApp, firebaseStorage } from '../base';

export default function Router() {
	const [posts, setPosts] = useState([]);
	const [archivedPosts] = useState([]);
	const [storageRef, setStorageRef] = useState(null);
	const [dbRef, setDbRef] = useState(null);
	const [aboutImageUrl, setAboutImageUrl] = useState(null);
	const [aboutBlurb, setAboutBlurb] = useState(null);

	useEffect(() => {
		setStorageRef(firebaseStorage.ref());
		setDbRef(firebaseApp.database().ref());
	}, []);

	useEffect(async () => {
		if (storageRef) {
			const aboutImageRef = storageRef.child('About.jpg');
			const url = await aboutImageRef.getDownloadURL();
			setAboutImageUrl(url);
		}
	}, [storageRef]);

	useEffect(async () => {
		if (dbRef) {
			const aboutDataRef = dbRef.child('data/about');
			const aboutData = await (await aboutDataRef.once('value')).val();
			setAboutBlurb(aboutData.blurb);

			const postDataRef = dbRef.child('data');
			const postData = await (await postDataRef.once('value')).val();

			if (postData) {
				const postsTemp = [];
				const postIds = Object.keys(postData.posts);
	
				for (let i = 0; i < postIds.length; i++) {
					postsTemp.push(postData.posts[postIds[i]]);
				}

				setPosts(postsTemp);
			}
		}
	}, [dbRef]);

	const updateAbout = async (about) => {
		if (dbRef) {
			const aboutDataRef = dbRef.child('data/about');
			await aboutDataRef.set({blurb: about.blurb});
			setAboutBlurb(about.blurb);
		}
	};

	// options object:
	// postId - associate all images with post
	// isAbout - if true then it is the About page image
	// isHeader - if true then rename the image to Header (postId should also be filled)
	const uploadImages = (images, options) => {
		if (options.isAbout) {
			const [ aboutImage ] = images;
			if (aboutImage) {
				const metaData = {
					contentType: aboutImage.type
				};
				const aboutImageRef = storageRef.child('About.jpg');
				aboutImageRef.put(aboutImage, metaData);
			}
			return;
		}
		if (options.isHeader && options.postId) {
			const [ headerImage ] = images;
			const metaData = {
				contentType: headerImage.type,
				public: true
			};
			const headerImageRef = storageRef.child(`/${options.postId}/Header.jpg`);
			headerImageRef.put(headerImage, metaData);
			return;
		}
		if (options.postId) {
			images.forEach((image) => {
				const metaData = {
					contentType: image.type
				};
				const postImageRef = storageRef.child(`/${options.postId}/${image.name}`);
				postImageRef.put(image, metaData);
			});
		}
	};

	// options object:
	// postId - return all images associated with a post
	const loadImages = async (options) => {
    const images = [];

		if (options.postId) {
			const imageRefArray = Array.from((await storageRef.child(`/${options.postId}`).listAll()).items);

			for (let i = 0; i < imageRefArray.length; i++) {
				const ref = imageRefArray[i];
				const url = await ref.getDownloadURL();
				images.push({
					url,
					name: ref.name,
				});
			}
		}
    
		return images;
	};

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" render={(props) => {
						return <Home 
							posts={posts} 
							storageRef={storageRef}
							{...props}
						/>;
					}} />
					<Route path="/About" render={(props) => {
						return <About 
							aboutImageUrl={aboutImageUrl}
							aboutBlurb={aboutBlurb}
							{...props} 
						/>
					}} />
					<Route path="/Post/:Slug" render={(props) => {
						return <Post 
							posts={posts} 
							storageRef={storageRef}
							loadImages={loadImages}
							{...props} 
						/>;
					}} />
					<Route path="/Blog" render={(props) => {
						return <Blog 
							posts={posts} 
							storageRef={storageRef}
							{...props} 
						/>;
					}} />
					<Route path="/Projects" render={(props) => {
						return <Projects posts={posts} {...props} />;
					}} />
					<Route path="/Manage/About" render={(props) => {
						return <ManageAbout 
									updateAbout={updateAbout} 
									uploadImages={uploadImages}
									aboutBlurb={aboutBlurb}
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
							posts={posts}
							archivedPosts={archivedPosts}
							storageRef={storageRef}
							{...props}
						/>
					}} />
					<Route path="/Manage" render={(props) => {
						return <Manage 
							posts={posts}
							archivedPosts={archivedPosts}
							{...props}
						/>
					}} />
				</Switch>
			</BrowserRouter>
		</ThemeProvider>
	);
}

class R extends React.Component {
	// state = {
	// 	data: {
	// 		about: {},
	// 		posts: [],
	// 	},
	// 	archivedPosts: [],
	// 	aboutImageUrl: "",
	// };

	async componentDidMount() {
		// this.storageRef = firebaseStorage.ref();
		// this.dbRef = firebaseApp.database().ref();

		const aboutImageRef = this.storageRef.child('About.jpg');
		const postDataRef = this.dbRef.child('data');
		const archiveDataRef = this.dbRef.child('private/archivedPosts');

		aboutImageRef.getDownloadURL().then(url => {
			this.setState({aboutImageUrl: url})
		});

		const postData = await (await postDataRef.once('value')).val();
		const posts = [];

		if (postData) {
			const postIds = Object.keys(postData.posts);

			for (let i = 0; i < postIds.length; i++) {
				posts.push(postData.posts[postIds[i]]);
			}
		}

		const archivedPostData = await (await archiveDataRef.once('value')).val();
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

			const postsRef = this.dbRef.child('data/posts');
			await postsRef.set(filteredPosts);
			const archivedPostsRef = this.dbRef.child('private/archivedPosts');
			await archivedPostsRef.set(updatedArchivedPosts);

		}
		else {
			const updatedPosts = [...filteredPosts, post];
	
			this.setState({ data: {
				about: {...this.state.data.about},
				posts: updatedPosts,
				},
				archivedPosts: filteredArchivedPosts,
			});

			const postsRef = this.dbRef.child('data/posts');
			await postsRef.set(updatedPosts);
			const archivedPostsRef = this.dbRef.child('private/archivedPosts');
			await archivedPostsRef.set(filteredArchivedPosts);

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
