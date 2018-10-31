import React from "react";
import PropTypes from "prop-types";
import "../css/Dropdown.css";

class Dropdown extends React.Component {
	getClassNames = option => {
		if (option === "Show All") {
			return "show_all";
		}

		return this.props.selectedOptions.find(opt => opt === option) ? "selected_option" : "";
	};

	renderDropdownOptions = () => {
		return this.props.options.map(opt => (
			<a
				className={this.getClassNames(opt)}
				key={opt}
				onClick={() => {
					this.props.clickFn(opt);
				}}
			>
				{opt}
			</a>
		));
	};

	renderCategoriesLabel = () => {
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

	render() {
		return (
			<div className="options">
				<div>
					<button onClick={this.props.toggleDropdown} className="dropbtn">
						{this.props.name}
					</button>
					<div className={this.props.show ? "dropdown_content show" : "dropdown_content"}>
						{this.renderDropdownOptions()}
					</div>
				</div>
				<div className="label">
					{this.props.name === "Categories" ? this.renderCategoriesLabel() : this.props.selectedOptions[0]}
				</div>
			</div>
		);
	};
}

Dropdown.propTypes = {
	toggleDropdown: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	show: PropTypes.bool.isRequired,
	options: PropTypes.array.isRequired,
	selectedOptions: PropTypes.array.isRequired,
	clickFn: PropTypes.func.isRequired
};

export default Dropdown;
