import React from "react";
import TopNav from "./TopNav";
import PropTypes from "prop-types";
import { GlobalStyle } from "./GlobalStyles";
import Wrapper from './Styles/Wrapper';
import styled from "styled-components";

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

const Blurb = styled.div`
	background: var(--Gray03);
	color: white;
	padding:  var(--S05) var(--S06) var(--S06) var(--S06);
	font-size: var(--F03);
	justify-self: center;
	box-shadow: ${props => props.theme.bs};
	width: 100%;

	@media only screen and (min-width: 768px) {
		width: 768px;
		border-bottom-left-radius: var(--S02);
		border-bottom-right-radius: var(--S02);
	}
`;

const Copy = styled.div`
	display: grid;
	grid-gap: var(--S02);
	padding-top: var(--S02);
`;

class About extends React.Component {
	static propTypes = {
		about: PropTypes.shape({
			blurb: PropTypes.string
		}),
		history: PropTypes.object
	};

	render() {
		return (
			<React.Fragment>
				<TopNav push={this.props.history.push} />
				<Wrapper>
					<AboutContent>
						<h1>About Me</h1>
						<img
							src={this.props.aboutImageUrl}
							alt="Marla Foreman"
						/>
						<Blurb>
							<Copy dangerouslySetInnerHTML={{
								__html: this.props.about.blurb
							}}></Copy>
							<Copy>
								<p>If you would like to reach me, my email address is: <a href="mailto:marla294@gmail.com">marla294@gmail.com</a></p>
							</Copy>
						</Blurb>
					</AboutContent>
				</Wrapper>
				<GlobalStyle />
			</React.Fragment>
		);
	}
}

export default About;