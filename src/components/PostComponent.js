import React from "react";
import TopNavComponent from "./TopNavComponent";
import FooterComponent from "./FooterComponent";

class PostComponent extends React.Component {
	render() {
		return (
			<div className="wrapper">
				<TopNavComponent push={this.props.history.push} />
				<FooterComponent />
			</div>
		);
	}
}

export default PostComponent;
