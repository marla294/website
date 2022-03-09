import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TopNav from "./TopNav";
import Snippet from "./Snippet";
import { GlobalStyle } from "./GlobalStyles";

const BlogWrapper = styled.div`
	width: 100%
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

class Blog extends React.Component {
	state = {
        numberPostsToDisplay: 5,
		posts: [],
    };

	componentDidMount() {
		this.setPosts();
	};

	componentDidUpdate(prevProps) {
        if (this.props.posts !== prevProps.posts) {
            this.setPosts();
        }
    };

	setPosts = () => {
		let posts = [...this.props.posts].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

		if (this.props.totalPostsToDisplay) {
			posts = posts.slice(0, this.props.totalPostsToDisplay);
		};

		this.setState({...this.state, posts});
	}

	loadMorePosts = () => {
		const numberPostsToDisplay = this.state.numberPostsToDisplay + 3;
		this.setState({...this.state, numberPostsToDisplay});
	};

	renderPostSnippets = () => {
		const displayPosts = [...this.state.posts].slice(0, this.state.numberPostsToDisplay);

		return displayPosts.map((post, index) => {
			return (
				<Snippet
					key={index}
					index={index}
					post={post}
					storageRef={this.props.storageRef}
					push={this.props.history.push}
				/>
			);
		});
	};

	renderLoadMoreButton = () => {
		if (this.state.numberPostsToDisplay < this.state.posts.length) {
			return (
				<LoadMoreButton onClick={this.loadMorePosts}>Load More</LoadMoreButton>
			);
		}
	};

	render() {
		return (
			<React.Fragment>
				<TopNav push={this.props.history.push} />
					<BlogWrapper>
						<BlogContent>
							<h1>Blog Posts</h1>
							<BlogPosts>
								{this.renderPostSnippets()}
								{this.renderLoadMoreButton()}
							</BlogPosts>
						</BlogContent>
						<GlobalStyle />
					</BlogWrapper>
			</React.Fragment>
		);
	}
}

Blog.propTypes = {
	history: PropTypes.object,
	totalPostsToDisplay: PropTypes.number,
};

export default Blog;