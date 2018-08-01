import React from "react";
import TopNav from "./TopNav";
import Footer from "./Footer";
import Overlay from "./Overlay";
import "../css/Contact.css";

class Contact extends React.Component {
	/* Overlay stuff */
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
					<section className="contact">
						<h1 className="title">Contact Me</h1>
						<div className="pic_contact">
							<img
								onClick={this.showFullImage}
								src="../Images/Pictures/SelfPortraits/20171001_Self.jpg"
								alt=""
							/>
						</div>
						<div className="desc_contact">
							<p>
								I am currently looking for web development
								opportunities. If you're interested in chatting,
								please feel free to email or contact me via
								LinkedIn (link in footer). My email is:&nbsp;
								<a href="mailto:marla294@gmail.com">
									marla294@gmail.com
								</a>.
							</p>
						</div>
					</section>
				</div>
				<Footer />
			</div>
		);
	}
}

export default Contact;
