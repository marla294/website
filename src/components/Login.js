import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Styles/Wrapper';
import ManageContentStyles from './Styles/ManageContentStyles';
import { GlobalStyle } from './GlobalStyles';
import ButtonStyles from './Styles/ButtonStyles';

const Login = ({authenticate}) => (
  <React.Fragment>
    <Wrapper>
      <ManageContentStyles>
        <h2>Login</h2>
        <p>Sign in to manage your website, Marla E. Foreman</p>
        <ButtonStyles type="button" onClick={() => authenticate('Github')}>
          Log In With Github, Marla
        </ButtonStyles>
      </ManageContentStyles>
    </Wrapper>
    <GlobalStyle />
  </React.Fragment>
);

Login.propTypes = {
    authenticate: PropTypes.func.isRequired
};

export default Login;