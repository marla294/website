import React from "react";
import styled from "styled-components";
import TopNav from "./TopNav";
import Project from "./Project";
import { GlobalStyle } from "./GlobalStyles";

const ProjectsWrapper = styled.div`
	margin-top: var(--S06);
	width: 100%;
	display: grid;
	justify-items: center;
`;

const ProjectsContent = styled.div`
	margin-top: var(--S06);
	display: grid;
	grid-template-rows: repeat(auto-fit, auto);
	grid-gap: 20px;

	h1 {
		color: var(--Gray05);
		padding-left: var(--S03);
		font-size: var(--F06);
	}

	@media only screen and (min-width: 768px) {
		margin-bottom: var(--S07);
	}
`;

const MyProjects = [
	{
		name: "Marla Foreman Home",
		url: "https://www.marlaforeman.com",
		desc: "This website!  A blog and a portfolio, all rolled into one cool-looking package.",
		tech: ["React"]
	}, 
	{
		name: "My BookList",
		url: "https://www.mybooklist.io",
		desc: "My version of the GoodReads website.",
		tech: ["React", ".NET Framework", "PostgreSQL"]
	}, 
	{
		name: "Fishy Friends",
		url: "https://www.fishy-friends.com",
		desc: "Check compatibility between various types of common saltwater aquarium fish.",
		tech: ["React", ".NET Framework", "PostgreSQL"]
	},
	{
		name: "PostgreSQL-ORM",
		url: "https://github.com/marla294/PostgreSQL-ORM",
		desc: "An ORM useful for connecting C# applications to PostgreSQL databases.",
		tech: [".NET Framework", "PostgreSQL"]
	}
];

class Projects extends React.Component {
	render() {
		return (
			<React.Fragment>
				<TopNav push={this.props.history.push} />
				<ProjectsWrapper>
					<ProjectsContent>
						<h1>My Projects</h1>
						{
							MyProjects.map((project, index) => {
								return <Project 
									key={index} 
									project={project} 
								/>;
							})
						}
					</ProjectsContent>
					<GlobalStyle />
				</ProjectsWrapper>
			</React.Fragment>
		);
	}
}

export default Projects;