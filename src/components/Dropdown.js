import React from "react";

class Dropdown extends React.Component {
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

// <div className="dropdown">
// 	<button
// 		onClick={this.toggleCategoryDropdown}
// 		className="dropbtn"
// 	>
// 		Categories
// 	</button>
// 	<div
// 		className={
// 			this.state.showCategoryDropdown
// 				? "dropdown-content show"
// 				: "dropdown-content"
// 		}
// 	>
// 		{this.renderCategories()}
// 	</div>
// </div>
