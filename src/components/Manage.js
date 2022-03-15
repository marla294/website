import React from "react";
import PropTypes from "prop-types";
import Wrapper from './Styles/Wrapper';
import ManageContent from './Styles/ManageContent';
import { GlobalStyle } from "./GlobalStyles";

const Manage = (props) => {
  return (
    <React.Fragment>
      <Wrapper>
        <ManageContent>
          <h1>Manage</h1>
          <a onClick={() => {
              props.history.push('/Manage/About');
          }}>Manage About</a>
        </ManageContent>
      </Wrapper>
      <GlobalStyle />
    </React.Fragment>
  );
}

Manage.propTypes = {
  history: PropTypes.object
}

export default Manage;