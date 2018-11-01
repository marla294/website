import React from "react";
import PropTypes from "prop-types";
import "./Dropdown.css";

class Dropdown extends React.Component {
	state = {
		showDropdown: false
	};

	toggleDropdown = () => {
		this.setState({showDropdown: !this.state.showDropdown});
	};

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
					this.toggleDropdown();
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
					<button onClick={this.toggleDropdown} className="dropbtn">
						{this.props.name}
					</button>
					<div className={this.state.showDropdown ? "dropdown_content show" : "dropdown_content"}>
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
	name: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	selectedOptions: PropTypes.array.isRequired,
	clickFn: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired
};

export default Dropdown;
