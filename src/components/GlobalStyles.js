import { createGlobalStyle } from "styled-components";

export const theme = {
	red: "#F4442E",
	taupeGray: "#909090",
	darkGray: "#2C2C34",
	bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)",
	Gray01: "EBEBEC",
	Gray02: "#C5C5C7",
	Gray03: "#9F9FA2",
	Gray04: "#78787D",
	Gray05: "#525258",
	Gray06: "#2C2C34",
	Gray07: "#18181D",
	Red01: "#FAAAA0",
	Red02: "#F8887A",
	Red03: "#F66654",
	Red04: "#F4442E",
	Red05: "#C83826",
	Red06: "#9C2C1E",
	Red07: "#591911",
	S01: "4px",
	S02: "8px",
	S03: "12px",
	S04: "16px",
	S05: "24px",
	S06: "32px",
	S07: "48px",
	S08: "64px",
	S09: "96px",
	S10: "128px",
	S11: "192px",
	S12: "256px",
	S13: "384px",
	S14: "512px",
	S15: "640px",
	S16: "768px",
	F01: "12px",
	F02: "14px",
	F03: "16px",
	F04: "18px",
	F05: "20px",
	F06: "24px",
	F07: "30px",
	F08: "36px",
	F09: "48px",
	F10: "60px",
	F11: "72px"
};

export const GlobalStyle = createGlobalStyle`
	html {
		font-family: 'Open Sans', sans-serif;
		color: ${props => props.theme.darkGray};
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	body {
		font-family: 'Open Sans', sans-serif;
		font-size: 16px;
		margin: 0;
		box-sizing: border-box;
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
