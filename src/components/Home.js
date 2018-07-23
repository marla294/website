import React from "react";
import TopNav from "./TopNav";
import Footer from "./Footer";
import Overlay from "./Overlay";
import Snippet from "./PostSnippet";
import "../css/Home.css";

class Home extends React.Component {
	state = {
		show: false
	};

	/* Image Overlay Stuff */
	imgURL = "";

	showFullImage = event => {
		this.imgURL = event.currentTarget.src;
		this.setState({ show: true });
	};

	hideFullImage = () => {
		this.setState({ show: false });
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
							src={require("../Assets/Pictures/SelfPortraits/20180607_SagradaFamilia.jpg")}
							alt=""
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
					<section className="blog">
						<h1>From the blog...</h1>
						<div className="snippets">
							{Object.keys(this.props.posts).map(key => {
								return (
									<div className="home_snippet post1">
										<Snippet
											key={key}
											index={key}
											post={this.props.posts[key]}
											push={this.props.history.push}
										/>
									</div>
								);
							})}
						</div>
					</section>
				</div>
				<Footer />
			</div>
		);
	}
	goToAbout = event => {
		event.preventDefault();
		this.props.history.push("/About");
	};
}

export default Home;
