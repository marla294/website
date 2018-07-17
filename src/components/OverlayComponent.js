import React from "react";

class OverlayComponent extends React.Component {
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

export default OverlayComponent;
