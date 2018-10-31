import React from "react";
import PropTypes from "prop-types";
import "../css/Dropdown.css";

class Dropdown extends React.Component {
	getClassNames = option => {
		if (option === "Show All") {
			return "category-show-all";
		}

		return this.props.displayOptions.find(opt => opt === option) ? "option-show" : "";
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
		const categories = this.props.displayOptions;
		
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
			<div className="blog_posts_categories">
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
				<div className="label">
					{this.props.name === "Categories" ? this.renderCategoriesLabel() : this.props.displayOptions[0]}
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
	displayOptions: PropTypes.array.isRequired,
	clickFn: PropTypes.func.isRequired
};

export default Dropdown;
