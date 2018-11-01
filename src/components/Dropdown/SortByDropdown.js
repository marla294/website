import React from "react";
import PropTypes from "prop-types";
import Dropdown from "./Dropdown";

class SortByDropdown extends React.Component {
	render () {
		return (
			<Dropdown
				name={"Sort By"}
				options={this.props.options}
				selectedOptions={this.props.selectedOptions}
				clickFn={this.props.clickFn}
				label={this.props.selectedOptions[0]}
			/>
		);
	};
}

SortByDropdown.propTypes = {
	options: PropTypes.array.isRequired,
	selectedOptions: PropTypes.array.isRequired,
	clickFn: PropTypes.func.isRequired
};

export default SortByDropdown;