import React from "react";

class PostSnippet extends React.Component {
	componentDidMount() {
		console.log(this.props.post);
	}
	render() {
		return (
			<div>
				<p className="title">{this.props.post.title}</p>
				<p className="date">{this.props.post.date}</p>
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
