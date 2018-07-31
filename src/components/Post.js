/* 
Method of lazy loading react components from here: https://reactjs.org/blog/2017/05/18/whats-new-in-create-react-app.html#code-splitting-with-dynamic-import
*/
import React from "react";
import TopNav from "./TopNav";
import Footer from "./Footer";
import Overlay from "./Overlay";
import Posts from "../blog-posts";
import "../css/Post.css";

class Post extends React.Component {
	/* Overlay stuff */
	state = {
		show: false,
		PostContent: null,
		Slug: this.props.match.params.Slug,
		Posts,
		PostsID: null
	};

	imgURL = "";

	showFullImage = event => {
		this.imgURL = event.currentTarget.src;
		this.setState({ show: true });
	};

	hideFullImage = () => {
		this.setState({ show: false });
	};

	/* Get PostID using the slug from router */
	getPostID = slug => {
		let PostID = null;
		Object.entries(this.state.Posts).forEach(entry => {
			if (entry[1].slug === slug) {
				PostID = entry[0];
			}
		});
		this.setState({ PostID });
		return PostID;
	};

	/* Async import the post content */
	async importPostContent() {
		let postID = this.getPostID(this.state.Slug);
		let { default: PostContent } = await import(`../Posts/${postID}.js`);
		this.setState({
			PostContent: <PostContent showFullImage={this.showFullImage} />
		});
	}

	componentDidMount() {
		this.importPostContent();
	}

	renderPostHeader = () => {
		let postHeader;
		Object.keys(this.props.posts).forEach(key => {
			if (key === this.state.PostID) {
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
				<Footer />
			</div>
		);
	}
}

export default Post;
