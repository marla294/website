import React from "react";
import { useState, useEffect } from 'react';
import TopNav from "./TopNav";
import PropTypes from "prop-types";
import { GlobalStyle } from "./GlobalStyles";
import Wrapper from './Styles/Wrapper';
import styled from "styled-components";
// import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders';

const AboutContent = styled.div`
	display: grid;
	grid-template-rows: repeat(auto-fit, auto);

	h1 {
		margin-bottom: 20px;
		color: var(--Gray05);
		padding-left: var(--S03);
		font-size: var(--F06);
	}

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
	font-size: var(--F01);
	justify-self: center;
	width: 100%;

	@media only screen and (min-width: 512px) {
		width: var(--S15);
	}
`;

const Copy = styled.div`
	display: grid;
	grid-gap: var(--S02);
	padding-top: var(--S02);
`;

const About = (props) => {
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	useEffect(async () => {
		if (props.aboutImageUrl && props.aboutImageUrl !== '') {
			const img = new Image();
			img.src = props.aboutImageUrl;
			await img.decode();
			setIsImageLoaded(true);
		}
	}, [props.aboutImageUrl]);

	return (
		<React.Fragment>
			<TopNav push={props.history.push} />
			<Wrapper>
				<AboutContent>
					{isImageLoaded ? <img
						src={props.aboutImageUrl}
						alt="Marla Foreman"
					/> : <div className="loading-div"></div>}
					<Blurb>
						<Copy>
							<h2>Hello! <span role="img" aria-label="wave">👋</span></h2>
						</Copy>
						<Copy dangerouslySetInnerHTML={{
							__html: props.about.blurb
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
};

About.propTypes = {
	about: PropTypes.shape({
		blurb: PropTypes.string
	}),
	history: PropTypes.object
};

export default About;