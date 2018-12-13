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
	a {
		color: white;
	}
`;

const TitleWrapper = styled.div`
	position: relative;
	display: inline-block;
	background: var(--red);
	width: 36rem;
	z-index: 100;
	a {
		font-size: 5rem;
		font-style: italic;
		color: white;
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
	@media only screen and (max-width: 768px) {
		width: 29rem;
		a {
			font-size: 4rem;
		}
		:after {
			width: 30.5rem;
		}
	}
`;

const MenuWrapper = styled.div`
	width: 100%
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	padding: 0.7rem 0;
	background: var(--red);
	a {
		justify-self: center;
		font-style: italic;
		font-size: 2rem;
		color: white;
		font-weight: 700;
		text-transform: uppercase;
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
	<div>
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
	<MenuWrapper>
			<a
				href=""
				onClick={event => {
					goToAbout(props, event);
				}}
			>
				About
			</a>
			<a
				href=""
				onClick={event => {
					goToBlog(props, event);
				}}
			>
				Blog
			</a>
	</MenuWrapper>
	</div>
);

TopNav.propTypes = {
	push: PropTypes.func.isRequired
};

export default TopNav;


