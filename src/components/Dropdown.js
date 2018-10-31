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
					{this.props.label}
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
	clickFn: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired
};

export default Dropdown;
