import React from "react";

class OverlayComponent extends React.Component {
	state = {
		show: false
	};

	imgURL = "";

	showFullImage = event => {
		this.imgURL = event.currentTarget.src;
		this.setState({ show: true });
	};

	hideFullImage = () => {
		this.setState({ show: false });
	};

	render() {
		<div className={this.state.show ? "overlay open" : "overlay closed"}>
			<div className="overlay-inner">
				<button className="close" onClick={this.hideFullImage}>
					× Close
				</button>
				<img src={`${this.imgURL}`} />
			</div>
		</div>;
	}
}

export default OverlayComponent;
