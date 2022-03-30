import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { GlobalStyle } from "./GlobalStyles";

const SnippetStyles = styled.div`
	display: grid;
	grid-template-rows: repeat(2, auto);
	box-shadow: var(--bs);
	width: 100%;

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
	display: grid;
	grid-gap: var(--S02);
	background: ${props => props.theme.Gray03};
	color: white;
	padding: var(--S04);
	font-size: var(--F03);

	p {
		color: ${props => props.theme.Gray01};
		font-size: var(--F01);
		text-transform: uppercase;
	}
`;

class PostSnippet extends React.Component {
	state = {
		postHeaderUrl: ''
	};

	componentDidMount() {
		this.getPostHeaderUrl(this.props.post.id);
	}

	componentDidUpdate(prevProps) {
		if (this.props.post !== prevProps.post) {
			this.getPostHeaderUrl(this.props.post.id);
		}
	};

	getPostHeaderUrl = (postId) => {
		this.postImageRef = this.props.storageRef.child(`/${postId}/Header.jpg`);

		this.postImageRef.getDownloadURL().then(url => {
			this.setState({postHeaderUrl: url});
		});
	};

	goToPost = (event) => {
		event.preventDefault();
		const slugify = require("slugify");
		const slug = slugify(this.props.post.title, { remove: /\./ });
		this.props.push(`/Post/${slug}`);
	}

	render() {
		const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
		return (
			<SnippetStyles onClick={this.goToPost}>
				<img src={`${this.state.postHeaderUrl}`} alt="" />
				<SnippetDetails>
					<p>{new Date(Date.parse(this.props.post.date)).toLocaleDateString("en-US", dateOptions)}</p>
					<h4>{this.props.post.title}</h4>
				</SnippetDetails>
				<GlobalStyle />
			</SnippetStyles>
		);
	}
};


PostSnippet.propTypes = {
	post: PropTypes.object.isRequired
};

export default PostSnippet;
