import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// import "../css/TopNav.css";

const TopNavWrapper = styled.nav`
	display: grid;
	grid-template-rows: auto auto;
	align-items: center;
	justify-items: center;
	background: var(--darkGray);
	z-index: 10;
	a {
		color: var(--taupeGray);
	}
`;

const TitleWrapper = styled.div`
	position: relative;
	display: inline-block;
	background: var(--red);
	width: 36rem;
	a {
		font-size: 5rem;
		font-style: italic;
		color: white;
		z-index: 100;
	}
	:after {
	  	content: '';
	  	position: absolute;
	  	top: 0;
	  	left: 0;
	  	width: 38.5rem;
	  	height: 100%;
	  	background: #000;
	  	background: var(--red);
	  	-webkit-transform-origin: 100% 0;
	  	-ms-transform-origin: 100% 0;
	  	transform-origin: 100% 0;
	  	-webkit-transform: skew(-15deg);
	  	-ms-transform: skew(-15deg);
	  	transform: skew(-15deg);
	  	z-index: -1;
	}
`;

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
	<TopNavWrapper>
		<TitleWrapper>
			<a
				href=""
				onClick={event => {
					goToHome(props, event);
				}}
			>
				Marla Foreman
			</a>
		</TitleWrapper>
	</TopNavWrapper>
);

TopNav.propTypes = {
	push: PropTypes.func.isRequired
};

export default TopNav;


