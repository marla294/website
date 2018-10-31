import React from "react";
import PropTypes from "prop-types";
import Dropdown from "./Dropdown";

class CategoryDropdown extends React.Component {
	getLabel = () => {
		const categories = this.props.selectedOptions;

		return categories.length === 0
			? "All"
			: categories.map((cat, i) => {
					if (i < categories.length - 1) {
						return `${cat}, `;
					} else {
						return cat;
					}
			  });
	};

	render () {
		return (
			<Dropdown
				name={"Categories"}
				show={this.props.show}
				toggleDropdown={this.props.toggleDropdown}
				options={this.props.options}
				selectedOptions={this.props.selectedOptions}
				clickFn={this.props.clickFn}
				label={this.getLabel()}
			/>
		);
	};
}

CategoryDropdown.propTypes = {
	toggleDropdown: PropTypes.func.isRequired,
	show: PropTypes.bool.isRequired,
	options: PropTypes.array.isRequired,
	selectedOptions: PropTypes.array.isRequired,
	clickFn: PropTypes.func.isRequired
};

export default CategoryDropdown;