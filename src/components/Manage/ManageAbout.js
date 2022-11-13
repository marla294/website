import React, { useState } from "react";
import { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { GlobalStyle } from "../GlobalStyles";
import Wrapper from '../Styles/Wrapper';
import ManageContentStyles from '../Styles/ManageContentStyles';
import Submit from '../Styles/Submit';
import ManageFormStyles from "../Styles/ManageFormStyles";
import useForm from '../../lib/useForm';
import useAuth from '../../lib/useAuth';
import ButtonStyles from "../Styles/ButtonStyles";

const ManageAbout = ({updateAbout, uploadImages, aboutBlurb, history}) => {
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
    authWrapper,
  } = useAuth({});

  const [isSubmitComplete, setIsSubmitComplete] = useState(false);

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

    setIsSubmitComplete(true);
  };
  
  return authWrapper(
    <React.Fragment>
      <Wrapper>
        <ManageContentStyles>
          <h1>Update About Page</h1>
          <ManageFormStyles onSubmit={UpdateAbout}  style={{display: isSubmitComplete ? "none" : "grid"}}>
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
          <div style={{display: isSubmitComplete ? "block" : "none"}}>
            <p style={{marginBottom: "10px"}}>Your change has been submitted.  Thank you.</p>
            <ButtonStyles type="button" onClick={(event) => {
              event.preventDefault();
              history.push('/Manage');
            }}>⬅ Back to manage content</ButtonStyles>
          </div>
        </ManageContentStyles>
      </Wrapper>
      <GlobalStyle />
    </React.Fragment>
  );

};

export default ManageAbout;