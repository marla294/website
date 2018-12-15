import React from "react";
import styled from "styled-components";
import TopNav from "./TopNav";
import Posts from "../blog-posts";
import PropTypes from "prop-types";
import { GlobalStyle } from "./GlobalStyles";

const PostWrapper = styled.div`
	width: 100%
	display: grid;
	justify-items: center;
`;

const PostContent = styled.div`
	margin: 40px 0;
	display: grid;
	grid-template-rows: repeat(auto-fit, auto);
	grid-gap: 20px;
`;

const PostDiv = styled.div`
	justify-self: center;
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 40px;
	justify-items: center;
`;

const PostHeader = styled.div`
	display: grid;
	grid-template-rows: repeat(2, auto);
	grid-gap: var(--S02);

	img {
		width: 100%
	}

	@media only screen and (min-width: 768px) {
		width: 768px;
	}
`;

const PostCopy = styled.div`
	margin-top: 1.25em;
	display: grid;
	grid-gap: var(--gridGap);
	grid-template-columns: 1fr;

	figure {
		justify-self: center;
		img {
			width: 100%;
		}
	}

	@media only screen and (min-width: 768px) {
		figure {
			img {
				width: 768px;
			}
		}
	}
`;

class Post extends React.Component {
	state = {
		Posts,
		PostContent: null,
		Slug: this.props.match.params.Slug
	};

	/* Helper Methods */

	getPostID = slug => {
		let PostID = null;
		const slugify = require("slugify");
		Object.entries(this.state.Posts).forEach(entry => {
			const slugTitle = slugify(entry[1].title, { remove: /\./ });
			if (slugTitle === slug) {
				PostID = entry[0];
			}
		});
		return PostID;
	};

	async importPostContent() {
		const postID = this.getPostID(this.state.Slug);
		const { default: PostContent } = await import(`../Posts/${postID}.js`);
		this.setState({
			PostContent: <PostContent showFullImage={this.showFullImage} />
		});
	}

	/* Lifecycle */

	componentDidMount() {
		this.importPostContent();
	}

	/* Render Methods */

	renderPostHeader = () => {
		let postHeader = "";
		Object.keys(this.props.posts).forEach(key => {
			if (key === this.getPostID(this.state.Slug)) {
				postHeader = (
					<React.Fragment>
						<PostHeader>
							<h2>
								{this.props.posts[key].title}
							</h2>
							<img
								src={`${this.props.posts[key].headerImage}`}
								alt=""
							/>
						</PostHeader>
					</React.Fragment>
				);
			}
		});
		return postHeader;
	};

	render() {
		return (
			<React.Fragment>
				<TopNav push={this.props.history.push} />
				<PostWrapper>
					<PostContent>
						<PostDiv>
						{this.renderPostHeader()}
						<PostCopy>{this.state.PostContent}</PostCopy>
						</PostDiv>
					</PostContent>
				</PostWrapper>
				<GlobalStyle />
			</React.Fragment>
		);
	}
}

Post.propTypes = {
	match: PropTypes.object.isRequired,
	posts: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
};

export default Post;
