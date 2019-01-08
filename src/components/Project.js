import React from "react";
import PropTypes from "prop-types";

const Project = (props) => {
	return <div>Project</div>;
}

Project.propTypes = {
	project: PropTypes.shape({
		name: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired,
		desc: PropTypes.string.isRequired,
		tech: PropTypes.array.isRequired,
	})
};

export default Project;