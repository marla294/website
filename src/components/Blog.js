import React from "react";
import TopNav from "./TopNav";
import Footer from "./Footer";
import Snippet from "./PostSnippet";
import "../css/Blog.css";

class Blog extends React.Component {
	state = {
		show: false
	};

	toggleShow = () => {
		this.setState({
			show: !this.state.show
		});
	};

	render() {
		return (
			<div className="container">
				<div className="wrapper">
					<TopNav push={this.props.history.push} />
					<div className="blog_posts_container">
						<div className="blog_posts_header">
							<h1>Blog Posts</h1>
							<div className="dropdown">
								<button
									onClick={this.toggleShow}
									className="dropbtn"
								>
									Dropdown
								</button>
								<div
									id="myDropdown"
									className={
										this.state.show
											? "dropdown-content show"
											: "dropdown-content"
									}
								>
									<a href="#">Link 1</a>
									<a href="#">Link 2</a>
									<a href="#">Link 3</a>
								</div>
							</div>
						</div>
						<div className="blog_posts">
							{Object.keys(this.props.posts).map(key => {
								return (
									<Snippet
										key={key}
										index={key}
										post={this.props.posts[key]}
										push={this.props.history.push}
									/>
								);
							})}
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default Blog;
