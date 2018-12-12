/* 
Method of lazy loading react components from here: https://reactjs.org/blog/2017/05/18/whats-new-in-create-react-app.html#code-splitting-with-dynamic-import
*/
import React from "react";
import TopNav from "./TopNav";
import Overlay from "./Overlay";
import Posts from "../blog-posts";
import PropTypes from "prop-types";
import "../css/Post.css";

class Post extends React.Component {
	state = {
		show: false,
		Posts,
		PostContent: null,
		Slug: this.props.match.params.Slug
	};

	/* Overlay */

	imgURL = "";

	showFullImage = event => {
		this.imgURL = event.currentTarget.src;
		this.setState({ show: true });
	};

	hideFullImage = () => {
		this.setState({ show: false });
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
					<div className="post_header_wrapper">
						<div className="post_header">
							<figure className="post_headImg">
								<img
									onClick={this.showFullImage}
									src={`${this.props.posts[key].headerImage}`}
									alt=""
								/>
							</figure>
							<div className="post_header_content">
								<div key={key}>
									<h2 key={`${key}title`}>
										{this.props.posts[key].title}
									</h2>
									<h4 key={`${key}date`}>
										{this.props.posts[key].date}
									</h4>
								</div>
							</div>
						</div>
					</div>
				);
			}
		});
		return postHeader;
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
					<article>
						{this.renderPostHeader()}
						{this.state.PostContent || (
							<div className="post_content">
								<h3>Loading...</h3>
							</div>
						)}
					</article>
				</div>
			</div>
		);
	}
}

Post.propTypes = {
	match: PropTypes.object.isRequired,
	posts: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
};

export default Post;
