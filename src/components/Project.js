import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { GlobalStyle } from "./GlobalStyles";

const ProjectContainer = styled.div`
	width: 100vw;

	display: grid;
	grid-gap: ${props => props.theme.S01};
	background: ${props => props.theme.Gray03};
	color: white;
	padding: ${props => props.theme.S06};
	font-size: ${props => props.theme.F04};
	box-shadow: ${props => props.theme.bs};

	a {
		color: ${props => props.theme.Gray01};
		font-size: ${props => props.theme.F02};
		text-transform: uppercase;
	}

	p {
		margin-top: ${props => props.theme.S04};
		font-size: ${props => props.theme.F03};
	}

	@media only screen and (min-width: 768px) {
		width: 768px;
		min-width: 0;
		border-bottom-left-radius: ${props => props.theme.S02};
		border-bottom-right-radius: ${props => props.theme.S02};
		border-top-left-radius: ${props => props.theme.S02};
		border-top-right-radius: ${props => props.theme.S02};
	}
`;

const ImageContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, 62px);
	grid-gap: ${props => props.theme.S03};

	margin-top: ${props => props.theme.S04};
`;

const Project = ({project}) => (
<ProjectContainer>
		<h2>{project.name}</h2>
		<a href={project.url} target="_blank" alt={project.name}>{project.url}</a>
		<p>{project.desc}</p>
		<ImageContainer>
			{project.tech.map(image => {
				return <img src={`/Images/Tech/${image}.png`} alt="" />
			})}
		</ImageContainer>
	<GlobalStyle />
</ProjectContainer>
);

Project.propTypes = {
	project: PropTypes.shape({
		name: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired,
		desc: PropTypes.string.isRequired,
		tech: PropTypes.array.isRequired,
	})
};

export default Project;