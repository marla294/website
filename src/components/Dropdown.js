import React from "react";

class Dropdown extends React.Component {
	render() {
		return (
			<div className="dropdown">
				<button onClick={this.props.toggleDropdown} className="dropbtn">
					Categories
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

export default Dropdown;
