import React from 'react';
import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { GlobalStyle } from "../GlobalStyles";
import Wrapper from '../Styles/Wrapper';
import ManageContentStyles from '../Styles/ManageContentStyles';
import ManageFormStyles from '../Styles/ManageFormStyles';
import Submit from '../Styles/Submit';
import ButtonStyles from '../Styles/ButtonStyles';
import useForm from '../../lib/useForm';
import useAuth from '../../lib/useAuth';
import DisplayErrors from '../DisplayErrors';
import PropTypes from 'prop-types';

const AddPost = (props) => {
  const { 
    inputs, 
    handleChange,
    handleDateChange,
    handleEditorChange,
  } = useForm({
    date: new Date(),
    title: '',
    status: 'draft',
    content: '',
    headerImage: null,
  });

  const {
    authWrapper,
  } = useAuth({});

  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  const [errors, setErrors] = useState([]);

  const addNewPost = async e => {
    e.preventDefault();
    setErrors([]);
    let addPostErrors = [];

    if (!inputs.date) {
      addPostErrors.push('Date is required!!!1!');
    }

    if (!inputs.title || inputs.title.length === 0) {
      addPostErrors.push('Title is required!!!1!');
    }

    if (!inputs.content || inputs.content.length === 0) {
      addPostErrors.push('Post Content is required!!!1!');
    }

    if (addPostErrors.length) {
      setErrors(addPostErrors);
      return;
    }

    const post = {
      date: inputs.date.toDateString(),
      title: inputs.title,
      status: inputs.status,
      content: inputs.content,
      id: `Post_${new Date().getTime()}`
    };

    await props.addNewPost(post);
    props.uploadImages([inputs.headerImage], { postId: post.id, isHeader: true });
    setIsSubmitComplete(true);
  };

  return authWrapper(
    <React.Fragment>
      <Wrapper>
        <ManageContentStyles>
          <h1>Add New Blog Post</h1>
          <DisplayErrors isError={errors.length > 0} errors={errors} />
          <ManageFormStyles onSubmit={addNewPost} style={{display: isSubmitComplete ? "none" : "auto"}}>
            <label>Date:<span className="required">&nbsp;*</span></label>
            <div>
                <DatePicker 
                    selected={inputs.date}
                    onChange={handleDateChange}
                />
            </div>
            <label>Image:</label>
            <input 
                name="headerImage"
                type="file" 
                onChange={handleChange} 
            />
            <label>Title:<span className="required">&nbsp;*</span></label>
            <input 
                type="text"
                name="title"
                onChange={handleChange}
                value={inputs.title}
            />
            <label>Status:</label>
            <select 
                type="text" 
                name="status" 
                onChange={handleChange} 
                value={inputs.status}
            >
                <option value="draft">Draft</option>
                <option value="public">Public</option>
                <option value="archive">Archive</option>
            </select>
            <label>Post Content:<span className="required">&nbsp;*</span></label>
            <Editor
                apiKey="6iwtqmlk62i53rbkbzwap5z37phnitxrj9fsdyy9ri2k2ykj"
                value={inputs.content}
                onEditorChange={handleEditorChange}
            />
            <Submit type="submit">Submit</Submit>
          </ManageFormStyles>
          <div style={{display: isSubmitComplete ? "block" : "none"}}>
            <p style={{marginBottom: "10px"}}>Your post has been submitted.  Thank you.</p>
            <ButtonStyles type="button" onClick={(event) => {
              event.preventDefault();
              props.history.push('/Manage');
            }}>⬅ Back to manage content</ButtonStyles>
          </div>
        </ManageContentStyles>
      </Wrapper>
      <GlobalStyle />
    </React.Fragment>
  );
}

AddPost.propTypes = {
  addNewPost: PropTypes.func.isRequired,
  uploadImages: PropTypes.func.isRequired,
};

export default AddPost;