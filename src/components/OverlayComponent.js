import React from "react";

class OverlayComponent extends React.Component {
	render() {
		return (
			<div
				className={this.props.show ? "overlay open" : "overlay closed"}
			>
				<div className="overlay-inner">
					<button
						className="close"
						onClick={this.props.hideFullImage}
					>
						× Close
					</button>
					<img src={`${this.props.imgURL}`} />
				</div>
			</div>
		);
	}
}

export default OverlayComponent;
