import React from "react";
import PropTypes from "prop-types";
import Blog from "./Blog";

class Home extends React.Component {
	render() {
		return (
			<Blog 
				posts={this.props.posts} 
				history={this.props.history}
				totalPostsToDisplay={2}
			></Blog>
		);
	}
}

Home.propTypes = {
	posts: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
};

export default Home;