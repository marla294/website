import React from "react";
import TopNav from "./TopNav";
import PropTypes from "prop-types";
import { GlobalStyle } from "./GlobalStyles";
import styled from "styled-components";

const AboutWrapper = styled.div`
	margin-top: var(--S06);
	width: 100%;
	display: grid;
	justify-items: center;
`;

const AboutContent = styled.div`
	display: grid;
	grid-template-rows: repeat(auto-fit, auto);

	h1 {
		margin-bottom: 20px;
		color: var(--Gray05);
		padding-left: var(--S03);
		font-size: var(--F06);
	}

	img {
		width: 100%;
	}

	@media only screen and (min-width: 768px) {
		margin-bottom: var(--S07);
		img {
			justify-self: center;
			width: 768px;
			border-top-left-radius: var(--S02);
			border-top-right-radius: var(--S02);
		}
	}
`;

const Copy = styled.div`
	display: grid;
	grid-gap: var(--S03);
	background: var(--Gray03);
	color: white;
	padding: var(--S06);
	font-size: var(--F03);
	justify-self: center;
	box-shadow: ${props => props.theme.bs};

	@media only screen and (min-width: 768px) {
		width: 768px;
		border-bottom-left-radius: var(--S02);
		border-bottom-right-radius: var(--S02);
	}
`;

class About extends React.Component {
	render() {
		return (
			<React.Fragment>
					<TopNav push={this.props.history.push} />
					<AboutWrapper>
						<AboutContent>
							<h1>About Me</h1>
							<img
								src="/Images/About.jpg"
								alt="Marla Foreman"
							/>
							<Copy>
							<p>I am a self-taught web developer living in Omaha, Nebraska.  I recently started my first full-time development job at Volano Solutions, a software consulting company here in Omaha.  My languages of choice are JavaScript with React and .NET, but I am friendly and open to trying just about anything.  Currently I'm learning GraphQL, advanced React concepts, and ASP.NET MVC with Entity Framework.</p>

							<p>When I'm not making stuff, I'm typically hanging out with my 6 year old (the coolest person I know), reading a good book, or practicing yoga and meditation.  Or, playing more Minecraft than is typically considered healthy for an adult.</p>

							<p>If you'd like to reach me, my email is: marla294@gmail.com</p>
							</Copy>
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