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
	const [archivedPosts, setArchivedPosts] = useState([]);
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

			const archivedPostsDataRef = dbRef.child('private/archivedPosts');
			const archivedPostData = await (await archivedPostsDataRef.once('value')).val();

			if (archivedPostData) {
				const archivedPostsTemp = [];
				const archivedPostIds = Object.keys(archivedPostData);
	
				for (let i = 0; i < archivedPostIds.length; i++) {
					archivedPostsTemp.push(archivedPostData[archivedPostIds[i]]);
				}

				setArchivedPosts(archivedPostsTemp);
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

	const deletePostImages = async (postId, imageNames) => {
		for (let i = 0; i < imageNames.length; i++) {
			const imageName = imageNames[i];
			const postImageRef = storageRef.child(`/${postId}/${imageName}`);
			await postImageRef.delete();
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

	const updateArchivedPosts = async (posts) => {
		if (dbRef) {
			const archivedPostsRef = dbRef.child('private/archivedPosts');
			await archivedPostsRef.set(posts);
			setArchivedPosts(posts);
		}
	}

	const updatePosts = async (posts) => {
		if (dbRef) {
			const postsRef = dbRef.child('data/posts');
			await postsRef.set(posts);
			setPosts(posts);
		}
	}

	const addNewPost = async (post) => {
		if (post.status === 'archive') {
			const updatedArchivedPosts = archivedPosts && archivedPosts.length > 0 ? [...archivedPosts, post] : [post];
			await updateArchivedPosts(updatedArchivedPosts);
		}
		else {
			const updatedPosts = posts && posts.length > 0 ? [...posts, post] : [post];
			await updatePosts(updatedPosts);
		}
	};

	const editPost = async (post) => {
		const filteredArchivedPosts = archivedPosts && archivedPosts.length > 0 ? archivedPosts.filter(p => p.id !== post.id) : [];
		const filteredPosts = posts && posts.length > 0 ? posts.filter(p => p.id !== post.id) : [];
		if (post.status === 'archive') {
			await updateArchivedPosts([...filteredArchivedPosts, post]);
			await updatePosts(filteredPosts);
		}
		else {
			await updateArchivedPosts(filteredArchivedPosts);
			await updatePosts([...filteredPosts, post]);
		}
	};

	const deletePost = async (postId) => {
		const filteredArchivedPosts = archivedPosts && archivedPosts.length > 0 ? archivedPosts.filter(p => p.id !== postId) : [];
		const filteredPosts = posts && posts.length > 0 ? posts.filter(p => p.id !== postId) : [];
		await updateArchivedPosts(filteredArchivedPosts);
		await updatePosts(filteredPosts);
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
							addNewPost={addNewPost}
							uploadImages={uploadImages}
							{...props}
						/>
					}} />
					<Route path="/Manage/Post/Edit/:Slug" render={(props) => {
						return <EditPost
							editPost={editPost}
							deletePost={deletePost}
							uploadImages={uploadImages}
							deletePostImages={deletePostImages}
							loadImages={loadImages}
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
