import React from "react";
import styled from "styled-components";

const Block = styled.code`
	width: 100%;
	background: ${props => props.theme.Gray01};
	padding: ${props => props.theme.S04} ${props => props.theme.S04};
	margin: ${props => props.theme.S03} 0;
	white-space: pre-wrap;

	font-size: ${props => props.theme.F01};

	@media only screen and (min-width: 768px) {
		width: 768px;
	}
`;

// Pass children as an array please
export default class CodeBlock extends React.Component {
	render() {
		return (
			<Block language="javascript">
				{this.props.children}
			</Block>
		);
	}
}