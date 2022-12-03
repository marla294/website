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

  .row {
    display: grid;
    grid-template-columns: 1fr 3fr 7fr 3fr;

    h3 {
      margin-bottom: 0;
    }
  }

  a {
    cursor: pointer;
    color: blue;
  }
`;

const Manage = ({ posts, archivedPosts, history }) => {
  const {
    authWrapper,
  } = useAuth({});

  const allPosts = [...posts, ...archivedPosts];

  const renderPostLinks = ({id, title, date, status}) => {
    const slugify = require("slugify");
    const slugTitle = slugify(title, { remove: /\./ });
    const dateOptions = { year: '2-digit', month: 'numeric', day: 'numeric' };

    return <div className="row" key={id} >
      <a onClick={() => {
        history.push(`/Manage/Post/Edit/${slugTitle}`);
      }}>Edit</a>
      <div>{new Date(Date.parse(date)).toLocaleDateString("en-US", dateOptions)}</div>
      <div>{title}</div>
      <div>{status}</div>
    </div>
  };

  return authWrapper(
    <React.Fragment>
      <Wrapper>
        <ManageContentStyles>
          <h1>Manage</h1>
          <a onClick={() => {
            history.push('/Manage/About');
          }} style={{color: 'blue'}}>Edit About Page</a>
          <h3 style={{marginBottom: '0'}}>Manage Posts</h3>
          <PostListStyles>
            <div className="row">
              <div></div>
              <h3>Date</h3>
              <h3>Title</h3>
              <h3>Status</h3>
            </div>
            <hr />
            {allPosts ? allPosts
            .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
            .map(post => {
              return renderPostLinks(post);
            }) : 'No posts to display'}
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