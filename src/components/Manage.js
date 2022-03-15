import React from "react";
import PropTypes from "prop-types";
import Wrapper from './Styles/Wrapper';
import ManageContentStyles from './Styles/ManageContentStyles';
import { GlobalStyle } from "./GlobalStyles";

const Manage = ({ posts, history }) => {

  const renderPostLinks = ({id, title}) => {
    const slugify = require("slugify");
    const slugTitle = slugify(title, { remove: /\./ });
    
    return <a key={id} onClick={() => {
      history.push(`/Manage/Post/Edit/${slugTitle}`);
    }}>{title}</a>
  };

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
            return renderPostLinks(post);
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