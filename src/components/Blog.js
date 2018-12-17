import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TopNav from "./TopNav";
import Snippet from "./PostSnippet";
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

class Blog extends React.Component {
	/* Click Events */

	goToAbout = event => {
		event.preventDefault();
		this.props.history.push("/About");
	};

	/* Render Functions */

	renderPostSnippets = () => {
		const displayKeys = Object.entries(this.props.posts)
			.sort((a, b) => b[1].order - a[1].order)
			.map(post => post[0]);

		return displayKeys.map(key => {
			return (
				<Snippet
					key={key}
					index={key}
					post={this.props.posts[key]}
					push={this.props.history.push}
				/>
			);
		});
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
							</BlogPosts>
						</BlogContent>
						<GlobalStyle />
					</BlogWrapper>
			</React.Fragment>
		);
	}
}

Blog.propTypes = {
	posts: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
};

export default Blog;