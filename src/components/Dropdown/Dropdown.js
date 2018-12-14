import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { GlobalStyle } from "../GlobalStyles";
import "./Dropdown.css";

const DropdownWrapper = styled.div`
	display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 10px;
    position: relative;

    label {
    	align-self: center;
    }
`;

const DropBtn = styled.button`
    background-color: ${props => props.theme.taupeGray};
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    outline: none;
    cursor: pointer;
`;

const DropContent = styled.div`
	display: ${props => props.show};
    position: absolute;
    top: 38px;
    background-color: white;
    box-shadow: ${props => props.theme.bs};
    z-index: 1000;
    a {
    	display: block;
    	font-size: 16px;
    	width: 200px;
    	cursor: pointer;
    	padding: 10px;
    }
    a:hover {
    	background-color: #ddd;
    	color: black;
    }
`;

class Dropdown extends React.Component {
	state = {
		showDropdown: false
	};

	toggleDropdown = () => {
		this.setState({showDropdown: !this.state.showDropdown});
	};

	getClassNames = option => {
		if (option === "Show All") {
			return "show_all";
		}

		return this.props.selectedOptions.find(opt => opt === option) ? "selected_option" : "";
	};

	renderDropdownOptions = () => {
		return this.props.options.map(opt => (
			<a
				className={this.getClassNames(opt)}
				key={opt}
				onClick={() => {
					this.props.clickFn(opt);
					this.toggleDropdown();
				}}
			>
				{opt}
			</a>
		));
	};

	render() {
		return (
			<DropdownWrapper>
				<DropBtn onClick={this.toggleDropdown}>
					{this.props.name}
				</DropBtn>
				<DropContent show={this.state.showDropdown ? "grid" : "none"}>
					{this.renderDropdownOptions()}
				</DropContent>
				<label>
					{this.props.label}
				</label>
				<GlobalStyle />
			</DropdownWrapper>
		);
	};
}

Dropdown.propTypes = {
	name: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	selectedOptions: PropTypes.array.isRequired,
	clickFn: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired
};

export default Dropdown;
