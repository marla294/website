import React from "react";
import "../css/Footer.css";

class Footer extends React.Component {
	render() {
		return (
			<footer className="footer">
				<p className="social">
					<a
						href="https://www.facebook.com/profile.php?id=1925590"
						target="_blank"
					>
						<i className="fab fa-facebook-f" />
					</a>
					<a
						href="https://www.linkedin.com/in/marlaforeman/"
						target="_blank"
					>
						<i className="fab fa-linkedin-in" />
					</a>
					<a href="https://twitter.com/marla294" target="_blank">
						<i className="fab fa-twitter" />
					</a>
					<a
						href="https://www.instagram.com/marla294/"
						target="_blank"
					>
						<i className="fab fa-instagram" />
					</a>
					<a href="https://github.com/marla294" target="_blank">
						<i className="fab fa-github" />
					</a>
				</p>
			</footer>
		);
	}
}

export default Footer;
