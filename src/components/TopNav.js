import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { GlobalStyle } from "./GlobalStyles";

const TopNavWrapper = styled.nav`
	display: grid;
	grid-template-rows: auto auto;
	align-items: center;
	justify-items: center;
	background: var(--Red04);
	box-shadow: ${props => props.theme.bs};
`;

const TitleWrapper = styled.div`
	position: relative;
	display: inline-block;
	background: var(--Red04);
	z-index: 100;
	padding: var(--S05) 0 var(--S04) 0;
	font-family: 'Josefin Sans', sans-serif;
	a {
		font-size: 40px;
		color: white;
	}
`;

const MenuWrapper = styled.div`
	width: 100%
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	padding: var(--S04) 0 var(--S03) 0;
	background: var(--Gray03);
	font-family: 'Josefin Sans', sans-serif;
	box-shadow: ${props => props.theme.bs};
	a {
		justify-self: center;
		font-size: var(--F03);
		color: white;
		font-weight: 300;
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
					MARLA FOREMAN
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
		<GlobalStyle />
	</div>
);

TopNav.propTypes = {
	push: PropTypes.func.isRequired
};

export default TopNav;


