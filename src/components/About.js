import React from "react";
import { useState, useEffect } from 'react';
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

const About = ({storageRef, dbRef, history }) => {
	const [aboutImageUrl, setAboutImageUrl] = useState(null);
	const [blurb, setBlurb] = useState(null);

	useEffect(async () => {
		if (storageRef) {
			const aboutImageRef = storageRef.child('About.jpg');
			const url = await aboutImageRef.getDownloadURL();
			setAboutImageUrl(url);
		}
	}, [storageRef]);

	useEffect(async () => {
		if (dbRef) {
			const aboutDataRef = dbRef.child('data/about');
			const aboutData = await (await aboutDataRef.once('value')).val();
			setBlurb(aboutData.blurb);
		}
	}, [dbRef]);

	return (
		<React.Fragment>
			<TopNav push={history.push} />
			<Wrapper>
				<AboutContent>
					{aboutImageUrl && blurb ? <img
						src={aboutImageUrl}
						alt="Marla Foreman"
					/> : <div className="loading-div"></div>}
					<Blurb>
						{aboutImageUrl && blurb ? <React.Fragment>
							<Copy>
								<h2>Hello! <span role="img" aria-label="wave">👋</span></h2>
							</Copy>
							<Copy dangerouslySetInnerHTML={{
								__html: blurb
							}}></Copy>
							<Copy>
								<p>If you would like to reach me, my email address is: <a href="mailto:marla294@gmail.com">marla294@gmail.com</a></p>
							</Copy>
						</React.Fragment> : <Copy><TextBlock rows={7} ready={blurb}></TextBlock></Copy>}
					</Blurb>
				</AboutContent>
			</Wrapper>
			<GlobalStyle />
		</React.Fragment>
	);
};

export default About;