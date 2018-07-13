import React from "react";
import TopNavComponent from "./TopNavComponent";

class HomeComponent extends React.Component {
	render() {
		return (
			<div className="wrapper">
				<TopNavComponent
					goToHome={this.goToHome}
					goToAbout={this.goToAbout}
				/>
				<section className="about_homepage">
					<img
						className="pic_homepage"
						src={require("../Assets/Pictures/SelfPortraits/20180607_SagradaFamilia.jpg")}
					/>
					<p className="desc_homepage">
						Hi, I'm Marla, a self-taught Web Developer currently
						calling Omaha, Nebraska home.{" "}
						<a href="">Read More...</a>
					</p>
				</section>
				<section className="blog">
					<h1>From the blog...</h1>
					<div className="snippets">
						<div className="snippet post1">
							<h3>Post Title I</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipisicing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation
								ullamco laboris nisi ut aliquip ex ea commodo
								consequat. Duis aute irure dolor in
								reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint
								occaecat cupidatat non proident, sunt in culpa
								qui officia deserunt mollit anim id est laborum.
							</p>
						</div>
						<div className="snippet post2">
							<h3>Post Title II</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipisicing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation
								ullamco laboris nisi ut aliquip ex ea commodo
								consequat. Duis aute irure dolor in
								reprehenderit in voluptate velit esse cillum
								dolore eu fugiat nulla pariatur. Excepteur sint
								occaecat cupidatat non proident, sunt in culpa
								qui officia deserunt mollit anim id est laborum.
							</p>
						</div>
					</div>
				</section>
				<footer className="contact">
					<h1>Connect with me</h1>
					<p className="email">marla294@gmail.com</p>
					<p className="phone">312-576-4246</p>
					<div className="social">
						<p>LinkedIn, Twitter, Instagram, Github</p>
					</div>
				</footer>
			</div>
		);
	}
	goToAbout = event => {
		event.preventDefault();
		this.props.history.push("/About");
	};
	goToHome = event => {
		event.preventDefault();
		this.props.history.push("/");
	};
}

export default HomeComponent;
