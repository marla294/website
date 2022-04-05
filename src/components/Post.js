import React from "react";
import { useState, useEffect } from 'react';
import styled from "styled-components";
import TopNav from "./TopNav";
import PropTypes from "prop-types";
import { GlobalStyle } from "./GlobalStyles";

const PostWrapper = styled.div`
	margin: var(--S06) 0;
	width: 100%;
	display: grid;
	justify-items: center;
	grid-gap: var(--S05);

	@media only screen and (min-width: 512px) {
		width: auto;
	}
`;

const PostHeader = styled.div`
	display: grid;
	grid-gap: var(--S04);
	width: 100%;

	img, .loading-div {
		width: 100%;
		height: 400px;
	}

	img {
		object-fit: cover;
	}

	.loading-div {
		background-color: var(--Gray03);
	}

	h1 {
		padding-left: var(--S03);
		font-size: var(--F05);
	}

	@media only screen and (min-width: 512px) {
		width: var(--S16);

		img, .loading-div {
			width: var(--S16);
			height: 600px;
		}
		h1 {
			padding-left: 0;
		}
	}
`;

const PostCopy = styled.div`
	display: grid;
	grid-gap: var(--S03);
	padding: 0 var(--S03);

	figure {
		justify-self: center;
		img {
			max-width: 100%;
		}
	}

	@media only screen and (min-width: 512px) {
		width: var(--S16);
		padding: 0;
	}
`;

const Post = (props) => {
	const [post, setPost] = useState(null);
	const [postHeaderUrl, setPostHeaderUrl] = useState('');
	const [isHeaderImageLoaded, setIsHeaderImageLoaded] = useState(false);

	useEffect(async () => {
		await loadPost(props.match.params.Slug)
	}, [props.posts]);

	const loadPost = async (slug) => {
		if (!props.posts || props.posts.length === 0) return;

		const slugify = require("slugify");

		const filteredPosts = props.posts.filter(post =>
			post.status !== "archive"
		);

		for (let i = 0; i < filteredPosts.length; i++) {
			const post = filteredPosts[i];
			const slugTitle = slugify(post.title, { remove: /\./ });
			if (slugTitle === slug) {
				setPost(post);
				await loadPostImages(post);
			}
		}
	};

	const loadPostHeaderImage = async (url) => {
		if (url && url !== '') {
			const img = new Image();
			img.src = url;
			await img.decode();
			setIsHeaderImageLoaded(true);
		}
	};

	const loadPostImages = async (post) => {
		const options = { postId: post.id };
		const postImages = (await props.loadImages(options));
		const [headerImage] = postImages.filter(image => image.name === 'Header.jpg');

		setPostHeaderUrl(headerImage.url);
		await loadPostHeaderImage(headerImage.url);

		if (postImages.length > 1) {
			let { content } = { ...post };
			postImages.forEach(image => {
				const imageTag = `
				<figure>
					<img
						src=${image.url}
						alt="${image.name}"
					/>
				</figure>
				`;
				content = content.replace(image.name, imageTag);
			});

			const updatedPost = {
				...post,
				content,
			};
			setPost(updatedPost);
		}
	};

	return (
		<React.Fragment>
			<TopNav push={props.history.push} />
			<PostWrapper>
				<PostHeader>
					<h1>
						{post ? post.title : ''}
					</h1>
					{isHeaderImageLoaded ?
						<img
							src={postHeaderUrl}
							alt={post ? post.title : ''}
						/>
						: <div className="loading-div"></div>}

				</PostHeader>
				<PostCopy dangerouslySetInnerHTML={{
					__html: post ? post.content : ''
				}}></PostCopy>
			</PostWrapper>
			<GlobalStyle />
		</React.Fragment>
	);
}

Post.propTypes = {
	storageRef: PropTypes.object,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired,
	}),
	match: PropTypes.shape({
		params: PropTypes.shape({
			Slug: PropTypes.string.isRequired,
		}),
	}),
	posts: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		date: PropTypes.string,
		title: PropTypes.string.isRequired,
		status: PropTypes.string,
		content: PropTypes.string,
	})),
	loadImages: PropTypes.func.isRequired,
};

export default Post;
