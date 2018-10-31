import React from "react";
import PropTypes from "prop-types";
import "../css/Dropdown.css";

class Dropdown extends React.Component {
	getClassNames = option => {
		if (option === "Show All") {
			return "category-show-all";
		}

		if (this.props.name === "Sort By") {
			const optionFiltered = option.split(" ")[0];

			return this.props.sortBy === optionFiltered ? "option-show" : "";
		}

		return this.props.displayCategories.find(cat => cat === option) ? "option-show" : "";
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

	render() {
		return (
			<div className="dropdown">
				<button onClick={this.props.toggleDropdown} className="dropbtn">
					{this.props.name}
				</button>
				<div
					className={
						this.props.show
							? "dropdown-content show"
							: "dropdown-content"
					}
				>
					{this.renderDropdownOptions()}
				</div>
			</div>
		);
	};
}

Dropdown.propTypes = {
	toggleDropdown: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	show: PropTypes.bool.isRequired,
	options: PropTypes.array.isRequired
};

export default Dropdown;
