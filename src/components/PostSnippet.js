import React from "react";

class PostSnippet extends React.Component {
	render() {
		return (
			<div className="snippet" onClick={this.goToPost}>
				<img
					className="snippet_img"
					src={`${this.props.post.headerImage}`}
					alt=""
				/>
				<div className="snippet_details">
					<h3 className="title">{this.props.post.title}</h3>
					<p className="date">{this.props.post.date}</p>
				</div>
			</div>
		);
	}
	goToPost = event => {
		event.preventDefault();
		this.props.push("/Post");
	};
}

export default PostSnippet;
