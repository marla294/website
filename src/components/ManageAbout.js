import React from "react";
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import { GlobalStyle } from "./GlobalStyles";
import Wrapper from './Styles/Wrapper';
import ManageContentStyles from './Styles/ManageContentStyles';
import Submit from './Styles/Submit';
import ManageFormStyles from "./Styles/ManageFormStyles";
import Login from './Login';
import useForm from '../lib/useForm';
import useAuth from '../lib/useAuth';

const ManageAbout = (props) => {
  const { 
    inputs, 
    setInputs,
    handleChange,
    handleEditorChange,
  } = useForm({
    content: '',
    aboutImage: null,
  });

  const {
    auth,
    authenticate,
    logout,
  } = useAuth({});

  useEffect(() => {
    setInputs({
      ...inputs,
      content: props.about.blurb
    });
  }, [props.about]);

  const updateAbout = (e) => {
    e.preventDefault();
    props.updateAbout({ blurb: inputs.content });
    props.uploadAboutImage(inputs.aboutImage);
  };

  if (!auth.uid) {
    return <Login authenticate={authenticate} />
  }

  if (auth.uid !== auth.owner) {
    return <div>
      <p>Hey, you're not Marla Foreman!  Stop trying to break into my site!</p>
      <button onClick={logout}>Log Out!</button>
    </div>
  }

  return (
    <React.Fragment>
      <Wrapper>
        <ManageContentStyles>
          <h1>Update About Page</h1>
          <ManageFormStyles onSubmit={updateAbout}>
            <label>Image:</label>
            <input 
              name="aboutImage"
              type="file" 
              onChange={handleChange} 
            />
            <label>Blurb:</label>
            <Editor
              apiKey="6iwtqmlk62i53rbkbzwap5z37phnitxrj9fsdyy9ri2k2ykj"
              value={inputs.content}
              onEditorChange={handleEditorChange}
            />
            <Submit type="submit">Submit</Submit>
          </ManageFormStyles>
        </ManageContentStyles>
      </Wrapper>
      <GlobalStyle />
    </React.Fragment>
  );
};

ManageAbout.propTypes = {
  updateAbout: PropTypes.func,
  about: PropTypes.shape({
    blurb: PropTypes.string
  }),
};

export default ManageAbout;