import React from "react";

class Dropdown extends React.Component {
	render() {
		<div className="dropdown">
			<button onClick={this.toggleCategoryDropdown} className="dropbtn">
				Categories
			</button>
			<div
				className={
					this.state.showCategoryDropdown
						? "dropdown-content show"
						: "dropdown-content"
				}
			>
				{this.renderCategories()}
			</div>
		</div>;
	}
}

export default Dropdown;
