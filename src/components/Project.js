import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { GlobalStyle } from "./GlobalStyles";

const ProjectContainer = styled.div`
	width: 100%;
	max-width: 100%;

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
		border-bottom-left-radius: ${props => props.theme.S02};
		border-bottom-right-radius: ${props => props.theme.S02};
		border-top-left-radius: ${props => props.theme.S02};
		border-top-right-radius: ${props => props.theme.S02};
	}
`;

const Project = ({project}) => (
<ProjectContainer>
		<h2>{project.name}</h2>
		<a href={project.url}>{project.url}</a>
		<p>{project.desc}</p>
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