import React from "react";
import styled from "styled-components";
import TopNav from "./TopNav";

const ProjectsWrapper = styled.div`
	margin-top: var(--S06);
	width: 100%;
	display: grid;
	justify-items: center;
`;

class Projects extends React.Component {
	render() {
		return (
			<React.Fragment>
				<TopNav push={this.props.history.push} />
				<ProjectsWrapper>
					<div>Projects Page</div>
				</ProjectsWrapper>
			</React.Fragment>
		);
	}
}

export default Projects;