import React from "react";
import { useState, useEffect } from 'react';
import styled from "styled-components";
import TopNav from "./TopNav";
import PropTypes from "prop-types";
import { GlobalStyle } from "./GlobalStyles";

const PostWrapper = styled.div`
	margin-top: var(--S06);
	margin-bottom: var(--S07);
	width: 100%;
	display: grid;
	justify-items: center;
`;

const PostContent = styled.div`
	display: grid;
	grid-template-rows: repeat(auto-fit, auto);
	grid-gap: var(--S05);
`;

const PostHeader = styled.div`
	display: grid;
	grid-template-rows: repeat(2, auto);
	grid-gap: 20px;
	justify-self: center;

	img {
		width: 100vw;
	}

	h1 {
		color: var(--Gray05);
		padding-left: var(--S03);
		font-size: var(--F05);
		font-weight: 700;
	}

	@media only screen and (min-width: 768px) {
		width: 768px;

		img {
			width: 768px;
		}
		h1 {
			font-size: var(--F06);
		}
	}
`;

const PostCopy = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: var(--S03);
	padding: 0 var(--S06);

	p {
		font-size: var(--F01);
	}

	figure {
		justify-self: center;
		img {
			width: 100%;
		}
	}

	@media only screen and (min-width: 768px) {
		width: 768px;
		padding: 0;

		p {
			font-size: var(--F01);
		}

		figure {
			img {
				width: 768px;
			}
			figcaption {
				font-size: var(--F02);
			}
		}
	}
`;

const Post = (props) => {
	const [post, setPost] = useState(null);
	const [postHeaderUrl, setPostHeaderUrl] = useState(''); 

	useEffect(async () => {
		await loadPost(props.match.params.Slug)
	}, [props.posts]);

	const loadPost =  async (slug) => {
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

	const loadPostImages = async (post) => {
		const options = { postId: post.id };
    const postImages = (await props.loadImages(options));
		const [ headerImage ] = postImages.filter(image => image.name === 'Header.jpg');

		setPostHeaderUrl(headerImage.url);

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
				<PostContent>
					<PostHeader>
						<h1>
							{post ? post.title : ''}
						</h1>
						<img
							src={postHeaderUrl}
							alt={post ? post.title : ''}
						/>
					</PostHeader>
					<PostCopy dangerouslySetInnerHTML={{
						__html: post ? post.content : ''
					}}></PostCopy>
				</PostContent>
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
