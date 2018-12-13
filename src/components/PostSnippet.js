import React from "react";
import PropTypes from "prop-types";
import { GlobalStyle } from "./GlobalStyles";
import "../css/PostSnippet.css";

const goToPost = (post, push, event) => {
	event.preventDefault();
	const slugify = require("slugify");
	const slug = slugify(post.title, { remove: /\./ });
	push(`/Post/${slug}`);
};

const PostSnippet = ({ post, push }) => (
	<div
		className="snippet"
		onClick={event => {
			goToPost(post, push, event);
		}}
	>
		<div className="snippet_overlay">
			<div className="snippet_details">
				<h3 className="title">{post.title}</h3>
				<p className="date">{post.date}</p>
			</div>
		</div>
		<img className="snippet_img" src={`${post.headerImage}`} alt="" />
		<GlobalStyle />
	</div>
);

PostSnippet.propTypes = {
	post: PropTypes.object.isRequired
};

export default PostSnippet;
