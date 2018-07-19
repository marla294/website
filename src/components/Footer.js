import React from "react";
import "../css/Footer.css";

class Footer extends React.Component {
	render() {
		return (
			<footer className="footer">
				<h1>Connect with me</h1>
				<p className="email">marla294@gmail.com</p>
				<p className="phone">312-576-4246</p>
				<div className="social">
					<p>Facebook, LinkedIn, Twitter, Instagram, Github</p>
				</div>
			</footer>
		);
	}
}

export default Footer;
