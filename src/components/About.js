import React from "react";
import TopNav from "./TopNav";
import { GlobalStyle } from "./GlobalStyles";
import Wrapper from './Styles/Wrapper';
import styled from "styled-components";
import { TextBlock } from 'react-placeholder/lib/placeholders';

const AboutContent = styled.div`
	display: grid;
	width: 100%;

	img, .loading-div {
		width: 100%;
		height: 400px;
	}

	img {
		object-fit: cover;
	}

	.loading-div {
		height: 400px;
		background-color: var(--Gray03);
	}

	@media only screen and (min-width: 512px) {
		margin-bottom: var(--S07);
		img, .loading-div {
			justify-self: center;
			width: var(--S13);
		}
	}
`;

const Blurb = styled.div`
	padding:  var(--S05) var(--S06) var(--S06) var(--S06);
	justify-self: center;
	width: 100%;

	@media only screen and (min-width: 768px) {
		width: var(--S16);
	}
`;

const Copy = styled.div`
	display: grid;
	grid-gap: var(--S02);
	padding-top: var(--S02);
`;

const About = ({aboutImageUrl, aboutBlurb, history}) => {
	return (
		<React.Fragment>
			<TopNav push={history.push} />
			<Wrapper>
				<AboutContent>
					{aboutImageUrl && aboutBlurb ? <img
						src={aboutImageUrl}
						alt="Marla Foreman"
					/> : <div className="loading-div"></div>}
					<Blurb>
						{aboutImageUrl && aboutBlurb ? <React.Fragment>
							<Copy>
								<h2>Hello! <span role="img" aria-label="wave">👋</span></h2>
							</Copy>
							<Copy dangerouslySetInnerHTML={{
								__html: aboutBlurb
							}}></Copy>
							<Copy>
								<p>If you would like to reach me, my email address is: <a href="mailto:marla294@gmail.com">marla294@gmail.com</a></p>
							</Copy>
						</React.Fragment> : <Copy><TextBlock rows={7} ready={aboutBlurb}></TextBlock></Copy>}
					</Blurb>
				</AboutContent>
			</Wrapper>
			<GlobalStyle />
		</React.Fragment>
	);
};

export default About;