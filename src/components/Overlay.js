import React from "react";
import PropTypes from "prop-types";
import "../css/Overlay.css";

class Overlay extends React.Component {
	render() {
		return (
			<div
				className={this.props.show ? "overlay open" : "overlay closed"}
			>
				<div className="overlay-inner">
					<div className="btn_overlay">
						<button
							className="close"
							onClick={this.props.hideFullImage}
						>
							×
						</button>
					</div>
					<img src={`${this.props.imgURL}`} alt="" />
				</div>
			</div>
		);
	}
}

Overlay.propTypes = {
	show: PropTypes.bool.isRequired,
	hideFullImage: PropTypes.func.isRequired,
	imgURL: PropTypes.string.isRequired
};

export default Overlay;
