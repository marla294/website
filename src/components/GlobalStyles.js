import { createGlobalStyle } from "styled-components";

export const theme = {
	red: "#F4442E",
	taupeGray: "#909090",
	darkGray: "#2C2C34",
	bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)"
};

export const GlobalStyle = createGlobalStyle`
	html {
		box-sizing: border-box;
		font-family: 'Open Sans', sans-serif;
		color: ${props => props.theme.gray};
		padding: 0;
		margin: 0;
	}

	body {
		font-family: 'Open Sans', sans-serif;
	}

	*, *:before, *:after {
		box-sizing: inherit;
	}

	h1, h2, h3, h4, h5, h6, p, ul, li, figure {
		margin: 0;
		padding: 0;
	}

	a {
		text-decoration: none;
	}

	a:hover {
		text-decoration: none;
	}
`;