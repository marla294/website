import React from "react";
import TopNav from "./TopNav";
import Footer from "./Footer";
import Overlay from "./Overlay";
import Snippet from "./PostSnippet";
import PropTypes from "prop-types";
import "../css/Home.css";

class Home extends React.Component {
	/* Overlay */

	state = {
		show: false
	};

	imgURL = "";

	showFullImage = event => {
		this.imgURL = event.currentTarget.src;
		this.setState({ show: true });
	};

	hideFullImage = () => {
		this.setState({ show: false });
	};

	/* Click Events */

	goToAbout = event => {
		event.preventDefault();
		this.props.history.push("/About");
	};

	/* Render Functions */

	renderPostSnippets = () => {
		/* Because sorting works differently on Safari than on Chrome */
		const isChrome =
			navigator.userAgent.indexOf("Chrome") !== -1 ? true : false;

		const displayKeys = Object.entries(this.props.posts)
			.map(post => post[0])
			.slice(-2)
			.sort(() => {
				return isChrome ? 1 : -1;
			});
		return displayKeys.map(key => {
			return (
				<Snippet
					key={key}
					index={key}
					post={this.props.posts[key]}
					push={this.props.history.push}
				/>
			);
		});
	};

	render() {
		return (
			<div className="container">
				<Overlay
					show={this.state.show}
					imgURL={this.imgURL}
					hideFullImage={this.hideFullImage}
				/>
				<div className="wrapper">
					<TopNav push={this.props.history.push} />
					<section className="about_homepage">
						<img
							onClick={this.showFullImage}
							className="pic_homepage"
							src="/Images/Pictures/Common/Selfie_SagradaFamilia.jpg"
							alt="Marla Foreman"
						/>
						<div className="desc_homepage">
							<p>
								Hi, I'm Marla, a self-taught Web Developer
								currently calling Omaha, Nebraska home.{" "}
							</p>
							<a href="" onClick={this.goToAbout}>
								<i>Read More...</i>
							</a>
						</div>
					</section>
					<section className="blog_posts_container">
						<h1 className="blog_posts_header">Latest Blog Posts</h1>
						<div className="blog_posts">
							{this.renderPostSnippets()}
						</div>
					</section>
				</div>
				<Footer />
			</div>
		);
	}
}

Home.propTypes = {
	posts: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
};

export default Home;
