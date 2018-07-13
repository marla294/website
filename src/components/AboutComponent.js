import React from "react";
import TopNavComponent from "./TopNavComponent";
import FooterComponent from "./FooterComponent";

class AboutComponent extends React.Component {
	render() {
		return (
			<div className="wrapper">
				<TopNavComponent push={this.props.history.push} />
				<section className="about">
					<h1 className="title">About Me</h1>
					<div className="pic_about">
						<img
							src={require("../Assets/Pictures/SelfPortraits/20180607_Graffiti.jpg")}
						/>
					</div>
					<div className="desc_about">
						<p>
							If you came to this page on purpose, I am taking
							that as a sign that you wanted to get to know me a
							little better. So here we go.
						</p>

						<p>
							I am a 36-year-old web developer from Omaha,
							Nebraska. I grew up in Ohio, in a small-ish town
							(Lima). Went to college at the University of
							Illinois in Urbana-Champaign. Played on the women's
							golf team there while getting my degree in
							electrical engineering. Met my husband, Graydon, in
							an ice skating class, which was weird because we're
							both engineers.
						</p>

						<p>
							After college I worked as a RF engineer (a type of
							electrical engineer) at Northrop Grumman in Chicago
							for 3 years. EE wasn't doing it for me anymore, so I
							switched to software quality assurance for 8 more
							years. During that time, we had our son (Miles) and
							moved to Omaha to be closer to my husband's family.
						</p>

						<p>
							I realized a while ago that what I really REALLY
							wanted to be doing was developing software and
							making stuff. I'd spent my entire career (up to a
							year ago) testing things that other people had
							already made - even while I was an electrical
							engineer at Northrop Grumman. Throughout my life and
							even as a kid, I've gotten my kicks from being the
							maker of things, not being the person who critiques
							them. I held myself back from becoming a developer
							for a long time, mostly because I didn't believe in
							myself. But finally, a year ago I worked up the
							courage to try this. I took a non-traditional path -
							I have taught myself rather than go to a bootcamp or
							go back to college.
						</p>

						<p>
							Outside of work, I like home decorating and cooking
							and running and coffee and watching YouTube. My son
							and I play a ridiculous amount of Minecraft. I also
							have an addiction to plants, and am really good at
							taking care of petunias. I like to travel, whenever
							I can.
						</p>

						<p>- Marla</p>
					</div>
				</section>
				<FooterComponent />
			</div>
		);
	}
}

export default AboutComponent;
