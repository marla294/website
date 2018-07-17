import React from "react";

class TopNavComponent extends React.Component {
	render() {
		return (
			<nav className="top">
				<p onClick={this.goToHome} className="sitename">
					Marla Foreman
				</p>
				<ul className="menu-top">
					<li>
						<a href="" onClick={this.goToAbout}>
							About
						</a>
					</li>
					<li>
						<a href="" onClick={this.goToPost}>
							Blog
						</a>
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
	goToAbout = event => {
		event.preventDefault();
		this.props.push("/About");
	};
	goToPost = event => {
		event.preventDefault();
		this.props.push("/Post");
	};
	goToHome = event => {
		event.preventDefault();
		this.props.push("/");
	};
}

export default TopNavComponent;
