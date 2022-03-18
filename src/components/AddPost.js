import React from 'react';
import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { WithContext as ReactTags } from 'react-tag-input';
import { GlobalStyle } from "./GlobalStyles";
import Wrapper from './Styles/Wrapper';
import ManageContentStyles from './Styles/ManageContentStyles';
import ManageFormStyles from './Styles/ManageFormStyles';
import Submit from './Styles/Submit';
import ButtonStyles from './Styles/ButtonStyles';
import useForm from '../lib/useForm';
import useAuth from '../lib/useAuth';
import PropTypes from 'prop-types';

const AddPost = (props) => {
  const { 
    inputs, 
    handleChange,
    handleDateChange,
    handleCategoryAddition,
    handleCategoryDeletion,
    handleEditorChange,
  } = useForm({
    date: new Date(),
    title: '',
    status: 'draft',
    categories: [],
    content: '',
    headerImage: null,
  });

  const {
    authWrapper,
  } = useAuth({});

  const [isSubmitComplete, setIsSubmitComplete] = useState(false);

  const addNewPost = e => {
    e.preventDefault();
    const post = {
      date: inputs.date.toDateString(),
      title: inputs.title,
      status: inputs.status,
      categories: inputs.categories,
      content: inputs.content,
      id: `Post_${new Date().getTime()}`
    };

    props.addNewPost(post);
    props.uploadPostHeader(inputs.headerImage, post.id);
    setIsSubmitComplete(true);
  };

  return authWrapper(
    <React.Fragment>
      <Wrapper>
        <ManageContentStyles>
          <h1>Add New Blog Post</h1>
          <ManageFormStyles onSubmit={addNewPost} style={{display: isSubmitComplete ? "none" : "auto"}}>
            <label>Date:</label>
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
            <label>Title:</label>
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
            <label>Categories:</label>
            <div>
                <ReactTags 
                    tags={inputs.categories}
                    delimiters={[188, 13]}
                    handleAddition={handleCategoryAddition}
                    handleDelete={handleCategoryDeletion}
                />
            </div>
            <label>Post Content:</label>
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
  uploadPostHeader: PropTypes.func.isRequired,
};

export default AddPost;