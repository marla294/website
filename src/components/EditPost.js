import React from 'react';
import { useState, useEffect } from 'react';
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
import DisplayErrors from './DisplayErrors';

const EditPost = (props) => {
  const { 
    inputs, 
    setInputs,
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
  const [postId, setPostId] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    loadPost(props.match.params.Slug);
  }, [props.posts]);

  const loadPost = (slug) => {
		const slugify = require("slugify");

		props.posts.forEach(post => {
			const slugTitle = slugify(post.title, { remove: /\./ });
			if (slugTitle === slug) {
        setInputs({
          ...post,
          date: new Date(Date.parse(post.date)),
          categories: post.categories ? [...post.categories] : [],
        });
        setPostId(post.id);
			}
		});
	};

  const editPost = e => {
    e.preventDefault();
    setErrors([]);
    let editErrors = [];

    if (!inputs.title || inputs.title.length === 0) {
      editErrors.push('Title is required!!!1!');
    }

    if (editErrors.length) {
      setErrors(editErrors);
      return;
    }

    const post = {
      date: inputs.date.toDateString(),
      title: inputs.title,
      status: inputs.status,
      categories: inputs.categories,
      content: inputs.content,
      id: postId,
    };

    props.editPost(post);
    if (inputs.headerImage) {
      props.uploadPostHeader(inputs.headerImage, post.id);
    }
    setIsSubmitComplete(true);
  };

  return authWrapper(
    <React.Fragment>
      <Wrapper>
        <ManageContentStyles>
          <DisplayErrors isError={errors.length > 0} errors={errors} />
          <h1>Edit Blog Post</h1>
          <ManageFormStyles onSubmit={editPost} style={{display: (isSubmitComplete || postId === null) ? "none" : "grid"}}>
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
          <div style={{display: postId === null ? "block" : "none"}}>
            <p style={{marginBottom: "10px"}}>We can't find this post.  Want to add a new post?  Go back to the Manage page and click "Add Post" button.</p>
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

export default EditPost;