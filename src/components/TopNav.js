import React from "react";
import "../css/TopNav.css";

/* Click Events */

const goToAbout = (props, event) => {
	event.preventDefault();
	props.push("/About");
};

const goToBlog = (props, event) => {
	event.preventDefault();
	props.push("/Blog");
};

const goToHome = (props, event) => {
	event.preventDefault();
	props.push("/");
};

const TopNav = props => (
	<nav className="top">
		<p
			onClick={event => {
				goToHome(props, event);
			}}
			className="sitename"
		>
			Marla Foreman
		</p>
		<ul className="menu-top">
			<li>
				<a
					href=""
					onClick={event => {
						goToAbout(props, event);
					}}
				>
					About
				</a>
			</li>
			<li>
				<a
					href=""
					onClick={event => {
						goToBlog(props, event);
					}}
				>
					Blog
				</a>
			</li>
		</ul>
	</nav>
);

export default TopNav;
