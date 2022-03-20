import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import Wrapper from '../Styles/Wrapper';
import ManageContentStyles from '../Styles/ManageContentStyles';
import { GlobalStyle } from "../GlobalStyles";
import ButtonStyles from '../Styles/ButtonStyles';
import useAuth from '../../lib/useAuth';

const PostListStyles = styled.div`
  margin-bottom: var(--S05);
  
  div {
    display: grid;
    grid-template-columns: repeat()(1fr, 4);
  }

  a {
    cursor: pointer;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const Manage = ({ posts, history }) => {
  const {
    authWrapper,
  } = useAuth({});

  const renderPostLinks = ({id, title, date, status}) => {
    const slugify = require("slugify");
    const slugTitle = slugify(title, { remove: /\./ });

    return <div key={id} >
      <a onClick={() => {
        history.push(`/Manage/Post/Edit/${slugTitle}`);
      }}>Edit</a>
      <div>{date}</div>
      <div>{title}</div>
      <div>{status}</div>
    </div>
  };

  return authWrapper(
    <React.Fragment>
      <Wrapper>
        <ManageContentStyles>
          <h1>Manage Ur Website</h1>
          <a onClick={() => {
            history.push('/Manage/About');
          }}>Edit About Page</a>
          <h3>Manage Posts</h3>
          <PostListStyles>
            {posts
            .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
            .map(post => {
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