import React from "react";
import PropTypes from "prop-types";

class Dropdown extends React.Component {
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
					{this.props.renderDropdown()}
				</div>
			</div>
		);
	}
}

Dropdown.propTypes = {
	toggleDropdown: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	show: PropTypes.bool.isRequired
};

export default Dropdown;
