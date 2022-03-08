import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { GlobalStyle } from "./GlobalStyles";

const SnippetStyles = styled.div`
	display: grid;
	grid-template-rows: repeat(2, auto);
	box-shadow: ${props => props.theme.bs};
	width: 100%;

	img {
		width: 100%;
	}

	@media only screen and (min-width: 768px) {
		width: 768px;
		border-bottom-left-radius: ${props => props.theme.S02};
		border-bottom-right-radius: ${props => props.theme.S02};
		img {
			width: 768px;
			border-top-left-radius: ${props => props.theme.S02};
			border-top-right-radius: ${props => props.theme.S02};
		}
	}
`;

const SnippetDetails = styled.div`
	display: grid;
	grid-gap: ${props => props.theme.S05};
	background: ${props => props.theme.Gray03};
	color: white;
	padding: ${props => props.theme.S06};
	font-size: ${props => props.theme.F04};

	p {
		color: ${props => props.theme.Gray01};
		font-size: ${props => props.theme.F02};
		text-transform: uppercase;
	}

	@media only screen and (min-width: 768px) {
		border-bottom-left-radius: ${props => props.theme.S02};
		border-bottom-right-radius: ${props => props.theme.S02};
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
		return (
			<SnippetStyles onClick={this.goToPost}>
				<img src={`${this.state.postHeaderUrl}`} alt="" />
				<SnippetDetails>
					<h4>{this.props.post.title}</h4>
					<p>{this.props.post.date}</p>
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
