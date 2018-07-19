import React from "react";
import "../css/Footer.css";

class Footer extends React.Component {
	render() {
		return (
			<footer className="footer">
				<p className="social">
					<i className="fab fa-facebook-f" />
					<i className="fab fa-linkedin-in" />
					<i className="fab fa-twitter" />
					<i className="fab fa-instagram" />
					<i className="fab fa-github" />
					<i className="far fa-envelope" />
				</p>
			</footer>
		);
	}
}

export default Footer;
