import React from "react";
import TopNav from "./TopNav";
import Footer from "./Footer";
import Snippet from "./PostSnippet";

class Blog extends React.Component {
	render() {
		return (
			<div className="wrapper">
				<TopNav push={this.props.history.push} />
				{Object.keys(this.props.posts).map(key => {
					return (
						<Snippet
							key={key}
							post={this.props.posts[key]}
							push={this.props.history.push}
						/>
					);
				})}
				<Footer />
			</div>
		);
	}
}

export default Blog;
