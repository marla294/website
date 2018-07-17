import React from "react";
import Snippet from "./PostSnippetComponent";

class BlogComponent extends React.Component {
	render() {
		return (
			<div className="wrapper">
				<p>This is the blog component</p>
				<Snippet />
			</div>
		);
	}
}

export default BlogComponent;
