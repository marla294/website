import React from "react";
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import firebase from 'firebase';
import { GlobalStyle } from "./GlobalStyles";
import Wrapper from './Styles/Wrapper';
import ManageContentStyles from './Styles/ManageContentStyles';
import Submit from './Styles/Submit';
import ManageFormStyles from "./Styles/ManageFormStyles";
import Login from './Login';
import base, { firebaseApp } from '../base';
import useForm from '../lib/useForm';

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

  const [auth, setAuth] = useState({});

  useEffect(() => {
    firebase.auth().onIdTokenChanged(user => {
      if (user) {
        authHandler({user});
      }
    });
  }, []);

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

  const authHandler = async (authData) => {
    const owner = await base.fetch('owner', {context: this});

    setAuth({
      ...auth,
      uid: authData.user.uid,
      owner: owner || authData.user.uid,
    });
  };

  const authenticate = () => {
    const authProvider = new firebase.auth['GithubAuthProvider']();

    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(authHandler);
  };

  const logout = async () => {
    await firebase.auth().signOut();
    setAuth({
      ...auth,
      uid: null,
    });
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