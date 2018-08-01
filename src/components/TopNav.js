import React from "react";
import "../css/TopNav.css";

class TopNav extends React.Component {
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
						<a href="" onClick={this.goToBlog}>
							Blog
						</a>
					</li>
					<li>
						<a href="" onClick={this.goToContact}>
							Contact
						</a>
					</li>
				</ul>
			</nav>
		);
	}
	goToAbout = event => {
		event.preventDefault();
		this.props.push("/About");
	};
	goToBlog = event => {
		event.preventDefault();
		this.props.push("/Blog");
	};
	goToHome = event => {
		event.preventDefault();
		this.props.push("/");
	};
	goToContact = event => {
		event.preventDefault();
		this.props.push("/Contact");
	};
}

export default TopNav;
