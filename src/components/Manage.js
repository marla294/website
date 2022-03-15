import React from "react";
import PropTypes from "prop-types";
import Wrapper from './Styles/Wrapper';
import ManageContentStyles from './Styles/ManageContentStyles';
import { GlobalStyle } from "./GlobalStyles";
import ButtonStyles from './Styles/ButtonStyles';

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
          <div>
            {posts.map(post => {
              return renderPostLinks(post);
            })}
          </div>
          <ButtonStyles type="button" onClick={(event) => {
            event.preventDefault();
            history.push('/Manage/Post/Add');
          }}>Add Blog Post</ButtonStyles>
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