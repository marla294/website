import React from "react";
import PropTypes from "prop-types";
import Wrapper from './Styles/Wrapper';
import ManageContent from './Styles/ManageContent';
import { GlobalStyle } from "./GlobalStyles";

const Manage = ({ posts, history }) => {

  return (
    <React.Fragment>
      <Wrapper>
        <ManageContent>
          <h1>Manage</h1>
          <a onClick={() => {
            history.push('/Manage/About');
          }}>Manage About</a>
          {posts.map(post => {
            return <p>{post.title}</p>;
          })}
        </ManageContent>
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