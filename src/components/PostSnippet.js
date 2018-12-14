import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { GlobalStyle } from "./GlobalStyles";

const Snippet = styled.div`
	display: grid;
	grid-template-rows: repeat(2, auto);
	box-shadow: ${props => props.theme.bs};

	img {
		width: 300px;
	}

	@media only screen and (min-width: 768px) {
		img {
			width: 600px;
		}
	}
`;

const SnippetDetails = styled.div`
	display: grid;
	grid-gap: 5px;
	background: ${props => props.theme.red};
	color: white;
	padding: 15px;

	p {
		font-style: italic;
	}
`;

const goToPost = (post, push, event) => {
	event.preventDefault();
	const slugify = require("slugify");
	const slug = slugify(post.title, { remove: /\./ });
	push(`/Post/${slug}`);
};

const PostSnippet = ({ post, push }) => (
	<Snippet
		onClick={event => {
			goToPost(post, push, event);
		}}
	>
		<img src={`${post.headerImage}`} alt="" />
		<SnippetDetails>
			<h4>{post.title}</h4>
			<p>{post.date}</p>
		</SnippetDetails>
		<GlobalStyle />
	</Snippet>
);

PostSnippet.propTypes = {
	post: PropTypes.object.isRequired
};

export default PostSnippet;
