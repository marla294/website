import React from "react";
import PropTypes from "prop-types";
import Dropdown from "./Dropdown";

class SortByDropdown extends React.Component {
	render () {
		return (
			<Dropdown
				name={"Sort By"}
				show={this.props.show}
				toggleDropdown={this.props.toggleDropdown}
				options={this.props.options}
				selectedOptions={this.props.selectedOptions}
				clickFn={this.props.clickFn}
			/>
		);
	};
}

SortByDropdown.propTypes = {
	toggleDropdown: PropTypes.func.isRequired,
	show: PropTypes.bool.isRequired,
	options: PropTypes.array.isRequired,
	selectedOptions: PropTypes.array.isRequired,
	clickFn: PropTypes.func.isRequired
};

export default SortByDropdown;