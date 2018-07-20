/* 
Method of lazy loading react components from here: https://reactjs.org/blog/2017/05/18/whats-new-in-create-react-app.html#code-splitting-with-dynamic-import
*/
import React from "react";
import TopNav from "./TopNav";
import Footer from "./Footer";
import Overlay from "./Overlay";
import "../css/Post.css";

class Post extends React.Component {
	/* Overlay stuff */
	state = {
		show: false,
		PostContent: null,
		PostID: this.props.match.params.PostID
	};

	imgURL = "";

	showFullImage = event => {
		this.imgURL = event.currentTarget.src;
		this.setState({ show: true });
	};

	hideFullImage = () => {
		this.setState({ show: false });
	};

	/* Grabbing the post html data to display */
	async componentDidMount() {
		const { default: PostContent } = await import(`../Posts/${
			this.state.PostID
		}.js`);
		this.setState({
			PostContent: <PostContent showFullImage={this.showFullImage} />
		});
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
						{this.state.PostContent || <h3>Loading...</h3>}
					</article>
				</div>
				<Footer />
			</div>
		);
	}
}

export default Post;
