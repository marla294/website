/* 
Method of lazy loading react components from here: https://reactjs.org/blog/2017/05/18/whats-new-in-create-react-app.html#code-splitting-with-dynamic-import
*/
import React from "react";
import TopNav from "./TopNav";
import Footer from "./Footer";
import Overlay from "./Overlay";

class Post extends React.Component {
	/* Overlay stuff */
	state = {
		show: false,
		PostContent: null
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
			this.props.match.params.PostID
		}.js`);
		this.setState({ PostContent: <PostContent /> });
	}

	render() {
		return (
			<div>
				<Overlay
					show={this.state.show}
					imgURL={this.imgURL}
					hideFullImage={this.hideFullImage}
				/>
				<div className="wrapper">
					<TopNav push={this.props.history.push} />
					<article className="post">
						<div className="post_header">
							<figure className="post_headImg">
								<img
									onClick={this.showFullImage}
									src={require("../Assets/Pictures/Spain/20180607_Flags.jpg")}
									alt="Spanish Flags"
								/>
							</figure>
							<div className="post_header_content">
								<h2>When We Went To Barcelona</h2>
								<h4>July 16, 2018</h4>
							</div>
						</div>
						{this.state.PostContent || <h3>Loading...</h3>}
					</article>
					<Footer />
				</div>
			</div>
		);
	}
}

export default Post;
