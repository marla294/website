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
  }
`;

const Manage = ({ posts, history }) => {
  const {
    authWrapper,
  } = useAuth({});

  const renderPostLinks = ({id, title, date, status}) => {
    const slugify = require("slugify");
    const slugTitle = slugify(title, { remove: /\./ });
    const dateOptions = { year: '2-digit', month: 'numeric', day: 'numeric' };

    return <div className="row" key={id} >
      <a onClick={() => {
        history.push(`/Manage/Post/Edit/${slugTitle}`);
      }}><span role="img" aria-label="Edit">📝</span></a>
      <div>{new Date(Date.parse(date)).toLocaleDateString("en-US", dateOptions)}</div>
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
            <div className="row">
              <div></div>
              <h3>Date</h3>
              <h3>Title</h3>
              <h3>Status</h3>
            </div>
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