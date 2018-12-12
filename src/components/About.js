import React from "react";
import TopNav from "./TopNav";
import Overlay from "./Overlay";
import PropTypes from "prop-types";
import "../css/About.css";

class About extends React.Component {
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
					<section className="about">
						<h1 className="title">About Me</h1>
						<div className="pic_about">
							<img
								onClick={this.showFullImage}
								src={require("../Assets/Pictures/SelfPortraits/20180607_Graffiti.jpg")}
								alt=""
							/>
						</div>
						<div className="desc_about">
							<p>I am a self-taught full stack software developer living in Omaha, Nebraska.  My languages of choice are JavaScript with React and .NET, but I am friendly and open to trying just about anything.  Currently I'm learning GraphQL, advanced React concepts, and UI design.</p>

							<p>When I'm not making stuff, I'm typically hanging out with 6 year old (the coolest person I know), reading a good book, or practicing yoga and meditation.  Or playing more Minecraft than is typically considered healthy for an adult.</p>

							<p>If you'd like to reach me you can at marla294@gmail.com.</p>
						</div>
					</section>
				</div>
			</div>
		);
	}
}

About.propTypes = {
	history: PropTypes.object.isRequired
};

export default About;
