import React from "react";
import PropTypes from "prop-types";
import Wrapper from './Styles/Wrapper';
import ManageContentStyles from './Styles/ManageContentStyles';
import { GlobalStyle } from "./GlobalStyles";

const Manage = ({ posts, history }) => {

  return (
    <React.Fragment>
      <Wrapper>
        <ManageContentStyles>
          <h1>Manage</h1>
          <a onClick={() => {
            history.push('/Manage/About');
          }}>Manage About</a>
          <h3>Manage Posts</h3>
          {posts.map(post => {
            return <p>{post.title}</p>;
          })}
        </ManageContentStyles>
      </Wrapper>
      <GlobalStyle />
    </React.Fragment>
  );
}

Manage.propTypes = {
  history: PropTypes.object,
  posts: PropTypes.array
}

export default Manage;