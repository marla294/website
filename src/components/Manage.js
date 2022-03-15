import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import Wrapper from './Styles/Wrapper';
import ManageContentStyles from './Styles/ManageContentStyles';
import { GlobalStyle } from "./GlobalStyles";
import ButtonStyles from './Styles/ButtonStyles';

const PostListStyles = styled.ul`
  margin-bottom: var(--S05);
  list-style-type: none;

  li {
    cursor: pointer;
  }

  li:hover {
    text-decoration: underline;
  }
`;

const Manage = ({ posts, history }) => {

  const renderPostLinks = ({id, title}) => {
    const slugify = require("slugify");
    const slugTitle = slugify(title, { remove: /\./ });

    return <li key={id} onClick={() => {
      history.push(`/Manage/Post/Edit/${slugTitle}`);
    }}>{title}</li>
  };

  return (
    <React.Fragment>
      <Wrapper>
        <ManageContentStyles>
          <h1>Manage Ur Website</h1>
          <a onClick={() => {
            history.push('/Manage/About');
          }}>Edit About Page</a>
          <h3>Manage Posts</h3>
          <PostListStyles>
            {posts.map(post => {
              return renderPostLinks(post);
            })}
          </PostListStyles>
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