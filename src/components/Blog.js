import React from "react";
import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";
import TopNav from "./TopNav";
import Snippet from "./Snippet";
import { GlobalStyle } from "./GlobalStyles";

const BlogWrapper = styled.div`
	width: 100%;
	display: grid;
	justify-items: center;
`;

const BlogContent = styled.div`
	margin-top: var(--S06);
	display: grid;
	grid-template-rows: repeat(auto-fit, auto);
	grid-gap: 20px;
	
	h1 {
		color: var(--Gray05);
		padding-left: var(--S03);
		font-size: var(--F06);
	}

	@media only screen and (min-width: 768px) {
		margin-bottom: var(--S07);
	}
`;

const BlogPosts = styled.div`
	justify-self: center;
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 40px;
	justify-items: center;
`;

const LoadMoreButton = styled.button`
	background-color: ${props => props.theme.taupeGray};
	color: white;
	padding: 10px 20px;
	font-size: 16px;
	border: none;
	outline: none;
	cursor: pointer;
	margin-bottom: var(--S05);
	border-radius: ${props => props.theme.S02};
`;

const Blog = (props) => {
	const [numberPostsToDisplay, setNumberPostsToDisplay] = useState(5);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		loadPosts();
	}, [props.posts]);

	const loadPosts = () => {
		const filteredPosts = [...props.posts].filter(post => 
			post.status === "public" &&
			Date.parse(new Date()) > Date.parse(post.date)
		);
		let postsToDisplay = filteredPosts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

		if (props.totalPostsToDisplay) {
			postsToDisplay = postsToDisplay.slice(0, props.totalPostsToDisplay);
		};

		setPosts(postsToDisplay);
	};

	const renderPostSnippets = (displayPosts) => {
		return displayPosts.map((post, index) => {
			return (
				<Snippet
					key={index}
					index={index}
					post={post}
					storageRef={props.storageRef}
					push={props.history.push}
				/>
			);
		});
	};

	const renderBlogContent = () => {
		const displayPosts = posts.slice(0, numberPostsToDisplay);
		
		if (displayPosts.length > 0) {
			return (
				<React.Fragment>
					<h1>Blog Posts</h1>
					<BlogPosts>
						{renderPostSnippets(displayPosts)}
						{() => {
							if (numberPostsToDisplay < posts.length) {
								return (
									<LoadMoreButton onClick={() => setNumberPostsToDisplay(numberPostsToDisplay + 3)}>Load More</LoadMoreButton>
								);
							}
						}}
					</BlogPosts>
				</React.Fragment>
			);
		}
		else {
			return (
				<React.Fragment>
					<h1>Blog Posts</h1>
					<p>No posts to display</p>
				</React.Fragment>
			);
		}
	};

	return (
		<React.Fragment>
			<TopNav push={props.history.push} />
				<BlogWrapper>
					<BlogContent>
						{renderBlogContent()}
					</BlogContent>
					<GlobalStyle />
				</BlogWrapper>
		</React.Fragment>
	);
};

Blog.propTypes = {
	history: PropTypes.object,
	totalPostsToDisplay: PropTypes.number,
};

export default Blog;