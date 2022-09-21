import React from "react";
import { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { GlobalStyle } from "../GlobalStyles";
import Wrapper from '../Styles/Wrapper';
import ManageContentStyles from '../Styles/ManageContentStyles';
import Submit from '../Styles/Submit';
import ManageFormStyles from "../Styles/ManageFormStyles";
import useForm from '../../lib/useForm';
import useAuth from '../../lib/useAuth';

const ManageAbout = ({updateAbout, uploadImages, aboutBlurb}) => {
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
    logout,
    authWrapper,
  } = useAuth({});

  useEffect(() => {
    setInputs({
      ...inputs,
      content: aboutBlurb
    });
  }, [aboutBlurb]);

  async function UpdateAbout(e) {
    e.preventDefault();
    uploadImages([inputs.aboutImage], { isAbout: true });
    await updateAbout({ blurb: inputs.content });
  };
  
  return authWrapper(
    <React.Fragment>
      <Wrapper>
        <ManageContentStyles>
          <h1>Update About Page</h1>
          <ManageFormStyles onSubmit={UpdateAbout}>
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
          <button onClick={logout}>Log Out!</button>
        </ManageContentStyles>
      </Wrapper>
      <GlobalStyle />
    </React.Fragment>
  );

};

export default ManageAbout;