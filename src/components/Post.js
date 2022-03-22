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
			border-top-left-radius: var(--S02);
			border-top-right-radius: var(--S02);
			border-bottom-left-radius: var(--S02);
			border-bottom-right-radius: var(--S02);
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
	font-size: var(--F04);

	p {
		font-size: var(--F02);
	}

	figure {
		justify-self: center;
		img {
			width: 100%;
			border-top-left-radius: var(--S02);
			border-top-right-radius: var(--S02);
			border-bottom-left-radius: var(--S02);
			border-bottom-right-radius: var(--S02);
		}
		figcaption {
			font-size: var(--F01);
			font-style: italic;
		}
	}

	@media only screen and (min-width: 768px) {
		width: 768px;
		padding: 0;
		font-size: var(--F05);

		p {
			font-size: var(--F03);
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

	useEffect(() => {
		loadPost(props.match.params.Slug)
	}, [props.posts]);

	const loadPost = (slug) => {
		const slugify = require("slugify");

		props.posts.forEach(post => {
			const slugTitle = slugify(post.title, { remove: /\./ });
			if (slugTitle === slug) {
				setPost(post);
				getPostHeaderUrl(post.id);
				loadPostImages(post);
			}
		});
	};

	const getPostHeaderUrl = (postId) => {
		const postImageRef = props.storageRef.child(`/${postId}/Header.jpg`);

		postImageRef.getDownloadURL().then(url => {
			setPostHeaderUrl(url);
		});
	};

	const loadPostImages = (post) => {
		if (post.numberOfImages && post.numberOfImages > 0) {
			for (let i = 0; i < post.numberOfImages; i++) {
				const imageRef = props.storageRef.child(`/${post.id}/image_${i}.jpg`);

				imageRef.getDownloadURL().then(url => {
					debugger;
				});
			}
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
    categories: PropTypes.array,
    content: PropTypes.string,
    headerImage: PropTypes.string,
  })),
};

export default Post;
