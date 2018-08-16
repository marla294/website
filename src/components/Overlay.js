import React from "react";
import PropTypes from "prop-types";
import "../css/Overlay.css";

const Overlay = ({ show, hideFullImage, imgURL }) => (
	<div className={show ? "overlay open" : "overlay closed"}>
		<div className="overlay-inner">
			<div className="btn_overlay">
				<button className="close" onClick={hideFullImage}>
					×
				</button>
			</div>
			<img src={`${imgURL}`} alt="" />
		</div>
	</div>
);

Overlay.propTypes = {
	show: PropTypes.bool.isRequired,
	hideFullImage: PropTypes.func.isRequired,
	imgURL: PropTypes.string.isRequired
};

export default Overlay;
