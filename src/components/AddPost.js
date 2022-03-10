import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { WithContext as ReactTags } from 'react-tag-input';
import { GlobalStyle } from "./GlobalStyles";
import Wrapper from './Styles/Wrapper';
import ManageContent from './Styles/ManageContent';
import ManageFormStyles from './Styles/ManageFormStyles';
import Submit from './Styles/Submit';
import useForm from '../lib/useForm';

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
  };

    return (
      <React.Fragment>
        <Wrapper>
          <ManageContent>
            <h1>Add New Blog Post</h1>
            <ManageFormStyles onSubmit={addNewPost}>
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
          </ManageContent>
        </Wrapper>
        <GlobalStyle />
      </React.Fragment>
    );
}

export default AddPost;