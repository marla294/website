import React from "react";
import PropTypes from "prop-types";
import Blog from "./Blog";

class Home extends React.Component {
	render() {
		return (
			<Blog 
				posts={this.props.posts} 
				history={this.props.history}
				storageRef={this.props.storageRef}
				totalPostsToDisplay={2}
			></Blog>
		);
	}
}

Home.propTypes = {
	posts: PropTypes.array,
	history: PropTypes.object
};

export default Home;