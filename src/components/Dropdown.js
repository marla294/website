import React from "react";
import PropTypes from "prop-types";
import "../css/Dropdown.css";

class Dropdown extends React.Component {
	categoryClasses = category => {
		if (category === "Show All") {
			return "category-show-all";
		}

		return this.props.displayCategories.find(cat => cat === category)
			? "category-show"
			: "";
	};

	sortByClasses = option => {
		const optionFiltered = option.split(" ")[0];

		return this.props.sortBy === optionFiltered ? "sortBy-show" : "";
	};

	renderCategories = () => {
		const categories = this.props.categories;

		return categories.map(cat => (
			<a
				className={this.categoryClasses(cat)}
				key={cat}
				onClick={() => {
					this.props.clickCategory(cat);
				}}
			>
				{cat}
			</a>
		));
	};

	renderSortBy = () => {
		const options = ["Newest First", "Oldest First"];

		return options.map(opt => (
			<a
				className={this.sortByClasses(opt)}
				key={opt}
				onClick={() => {
					this.props.clickSortOption(opt);
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
					{this.props.name === "Categories" ? this.renderCategories() : this.renderSortBy()}
				</div>
			</div>
		);
	};
}

Dropdown.propTypes = {
	toggleDropdown: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	show: PropTypes.bool.isRequired
};

export default Dropdown;
