import React from "react";
import Snippet from "./PostSnippet";

class Blog extends React.Component {
	render() {
		return (
			<div className="wrapper">
				<p>This is the blog component</p>
				<Snippet />
			</div>
		);
	}
}

export default Blog;
