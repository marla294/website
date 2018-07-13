import React from "react";

class TopNavComponent extends React.Component {
	render() {
		return (
			<nav className="top">
				<a href="" onClick={this.props.goToHome} className="sitename">
					Marla Foreman
				</a>
				<ul className="menu-top">
					<li>
						<a href="" onClick={this.props.goToAbout}>
							About
						</a>
					</li>
					<li>
						<a href="">Blog</a>
					</li>
					<li>
						<a href="">Gallery</a>
					</li>
					<li>
						<a href="">Contact</a>
					</li>
				</ul>
			</nav>
		);
	}
}

export default TopNavComponent;
