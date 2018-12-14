import React from "react";
import TopNav from "./TopNav";
import PropTypes from "prop-types";
import { GlobalStyle } from "./GlobalStyles";
import styled from "styled-components";

const AboutWrapper = styled.div`
	width: 100%
	display: grid;
	justify-items: center;
`;

const AboutContent = styled.div`
	width: 300px;
	margin: 40px 0;
	display: grid;
	grid-template-rows: repeat(auto-fit, auto);
	grid-gap: 20px;
	img {
		width: 300px;
	}

	@media only screen and (min-width: 768px) {
		width: 500px;
		img {
			width: 500px;
		}
	}
`;

class About extends React.Component {
	render() {
		return (
			<React.Fragment>
					<TopNav push={this.props.history.push} />
					<AboutWrapper>
						<AboutContent>
							<img
								src={require("../Assets/Pictures/SelfPortraits/20171001_Self.jpg")}
								alt="Marla Foreman"
							/>
							<p>I am a self-taught full stack software developer living in Omaha, Nebraska.  My languages of choice are JavaScript with React and .NET, but I am friendly and open to trying just about anything.  Currently I'm learning GraphQL, advanced React concepts, and UI design.</p>

							<p>When I'm not making stuff, I'm typically hanging out with my 6 year old (the coolest person I know), reading a good book, or practicing yoga and meditation.  Or, playing more Minecraft than is typically considered healthy for an adult.</p>

							<p>If you'd like to reach me, you can email me at marla294@gmail.com.</p>
						</AboutContent>
					</AboutWrapper>
				<GlobalStyle />
			</React.Fragment>
		);
	}
}

About.propTypes = {
	history: PropTypes.object.isRequired
};

export default About;