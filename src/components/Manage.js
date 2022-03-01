import React from "react";
import PropTypes from "prop-types";
import Wrapper from './Styles/Wrapper';
import ManageContent from './Styles/ManageContent';
import { GlobalStyle } from "./GlobalStyles";

class Manage extends React.Component {
	static propTypes = {
		history: PropTypes.object
	};

    render() {
        return (
            <React.Fragment>
                <Wrapper>
                    <ManageContent>
                        <h1>Manage</h1>
                        <a onClick={() => {
                            this.props.history.push('/Manage/About');
                        }}>Manage About</a>
                    </ManageContent>
                </Wrapper>
                <GlobalStyle />
            </React.Fragment>
        );
    }
}

export default Manage;