import React from "react";

class Dropdown extends React.Component {
	state = { disableClick: false, show: false };

	render() {
		return (
			<div className="dropdown">
				<button
					onClick={this.props.toggleCategoryDropdown}
					className="dropbtn"
				>
					Categories
				</button>
				<div
					className={
						this.props.show
							? "dropdown-content show"
							: "dropdown-content"
					}
				>
					{this.props.renderCategories()}
				</div>
			</div>
		);
	}
}

export default Dropdown;

