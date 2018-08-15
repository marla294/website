import React from "react";
import "../css/PostSnippet.css";

class PostSnippet extends React.Component {
	/* Click Events */

	goToPost = event => {
		event.preventDefault();
		const slugify = require("slugify");
		const slug = slugify(this.props.post.title, { remove: /\./ });
		this.props.push(`/Post/${slug}`);
	};

	render() {
		return (
			<div className="snippet" onClick={this.goToPost}>
				<div className="snippet_overlay">
					<div className="snippet_details">
						<h3 className="title">{this.props.post.title}</h3>
						<p className="date">{this.props.post.date}</p>
					</div>
				</div>
				<img
					className="snippet_img"
					src={`${this.props.post.headerImage}`}
					alt=""
				/>
			</div>
		);
	}
}

export default PostSnippet;
