import React from "react";
import styled from "styled-components";
import TopNav from "./TopNav";
import PropTypes from "prop-types";
import { GlobalStyle } from "./GlobalStyles";

const PostWrapper = styled.div`
	margin-top: var(--S06);
	margin-bottom: var(--S07);
	width: 100%
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

class Post extends React.Component {
	state = {
		post: null,
		postHeaderUrl: '',
	};

	componentDidMount() {
		this.loadPost(this.props.match.params.Slug);
	};

	componentDidUpdate(prevProps) {
        if (this.props.posts !== prevProps.posts) {
            this.loadPost(this.props.match.params.Slug);
        }
    };

	loadPost(slug) {
		const slugify = require("slugify");

		this.props.posts.forEach(post => {
			const slugTitle = slugify(post.title, { remove: /\./ });
			if (slugTitle === slug) {
				this.setState({
					...this.state,
					post: post
				});
				this.getPostHeaderUrl(post.id);
			}
		});
	};

	getPostHeaderUrl = (postId) => {
		this.postImageRef = this.props.storageRef.child(`/${postId}/Header.jpg`);

		this.postImageRef.getDownloadURL().then(url => {
			this.setState({...this.state, postHeaderUrl: url});
		});
	};

	render() {
		return (
			<React.Fragment>
				<TopNav push={this.props.history.push} />
				<PostWrapper>
					<PostContent>
						<PostHeader>
							<h1>
								{this.state.post ? this.state.post.title : ''}
							</h1>
							<img
								src={this.state.postHeaderUrl}
								alt={this.state.post ? this.state.post.title : ''}
							/>
						</PostHeader>
						<PostCopy dangerouslySetInnerHTML={{
							__html: this.state.post ? this.state.post.content : ''
						}}></PostCopy>
					</PostContent>
				</PostWrapper>
				<GlobalStyle />
			</React.Fragment>
		);
	}
}

// Post.propTypes = {
// 	match: PropTypes.object.isRequired,
// 	history: PropTypes.object
// };

export default Post;
