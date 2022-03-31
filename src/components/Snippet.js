import React from "react";
import { useState, useEffect } from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import { GlobalStyle } from "./GlobalStyles";

const SnippetStyles = styled.div`
	position: relative;
	box-shadow: var(--bs);
	width: 100%;
	background-color: rgb(24, 24, 29, 1);

	img {
		width: 100%;
	}

	@media only screen and (min-width: 512px) {
		width: var(--S14);
		img {
			width: var(--S14);
		}
	}
`;

const SnippetDetails = styled.div`
	position: absolute;
	bottom: 0;
	width: 100%;
	display: grid;
	grid-gap: var(--S01);
	background: linear-gradient(rgb(24, 24, 29, 0), rgb(24, 24, 29, 1));
	color: white;
	padding: var(--S04);
	font-size: var(--F03);

	.date {
		color: white;
		font-size: var(--F01);
		text-transform: uppercase;
	}
`;

const PostSnippet = (props) => {
	const [postHeaderUrl, setPostHeaderUrl] = useState('');

	useEffect(() => {
		getPostHeaderUrl(props.post.id);
	}, [props.post]);

	const getPostHeaderUrl = (postId) => {
		let postImageRef = props.storageRef.child(`/${postId}/Header.jpg`);

		postImageRef.getDownloadURL().then(url => {
			setPostHeaderUrl(url);
		});
	};

	const goToPost = (event) => {
		event.preventDefault();
		const slugify = require("slugify");
		const slug = slugify(props.post.title, { remove: /\./ });
		props.push(`/Post/${slug}`);
	}

	const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

	return (
		<SnippetStyles onClick={goToPost}>
			<img src={`${postHeaderUrl}`} alt="" />
			<SnippetDetails>
				<p className="date">{new Date(Date.parse(props.post.date)).toLocaleDateString("en-US", dateOptions)}</p>
				<p>{props.post.title}</p>
			</SnippetDetails>
			<GlobalStyle />
		</SnippetStyles>
	);
};

PostSnippet.propTypes = {
	post: PropTypes.object.isRequired
};

export default PostSnippet;
