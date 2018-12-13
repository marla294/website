import React from "react";
import TopNav from "./TopNav";
import Overlay from "./Overlay";
import Snippet from "./PostSnippet";
import PropTypes from "prop-types";
import "../css/Home.css";
import { GlobalStyle } from "./GlobalStyles";


class Home extends React.Component {
	/* Overlay */
	state = {
		show: false
	};

	imgURL = "";

	showFullImage = event => {
		this.imgURL = event.currentTarget.src;
		this.setState({ show: true });
	};

	hideFullImage = () => {
		this.setState({ show: false });
	};

	/* Click Events */

	goToAbout = event => {
		event.preventDefault();
		this.props.history.push("/About");
	};

	/* Render Functions */

	renderPostSnippets = () => {
		/* Because sorting works differently on Safari than on Chrome */
		const isChrome =
			navigator.userAgent.indexOf("Chrome") !== -1 ? true : false;

		const displayKeys = Object.entries(this.props.posts)
			.map(post => post[0])
			.slice(-2)
			.sort(() => {
				return isChrome ? 1 : -1;
			});
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
			<div className="container">
				<Overlay
					show={this.state.show}
					imgURL={this.imgURL}
					hideFullImage={this.hideFullImage}
				/>
				<div className="wrapper">
					<TopNav push={this.props.history.push} />
					<section className="blog_posts_container">
						<h1 className="blog_posts_header">Latest Blog Posts</h1>
						<div className="blog_posts">
							{this.renderPostSnippets()}
						</div>
					</section>
				</div>
				<GlobalStyle />
			</div>
		);
	}
}

Home.propTypes = {
	posts: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
};

export default Home;