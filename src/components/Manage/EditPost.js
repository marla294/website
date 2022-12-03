import React from 'react';
import { useState, useEffect } from 'react';
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
import styled from 'styled-components';

const ImageListStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const ImageThumbWrapperStyles = styled.div`
  width: 150px;
  position: relative;
`;

const ImageThumbStyles = styled.img`
  width: 100%;
`;

const DeleteImageButtonStyles = styled.button`
  position: absolute;
  top: -5%;
  left: 80%;
  background-color: transparent;
  font-size: 34px;
  border: none;
  color: red;
`;

const EditPost = (props) => {
  const { 
    inputs, 
    setInputs,
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

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  const [postId, setPostId] = useState(null);
  const [errors, setErrors] = useState([]);

  const posts = [...props.posts, ...props.archivedPosts];

  useEffect(async () => {
    loadPost(props.match.params.Slug);
  }, [props.posts, props.archivedPosts]);

  const loadPost = async (slug) => {
		const slugify = require("slugify");

		await posts.forEach(async post => {
			const slugTitle = slugify(post.title, { remove: /\./ });
			if (slugTitle === slug) {
        setInputs({
          ...post,
          date: new Date(Date.parse(post.date)),
        });
        setPostId(post.id);
        await loadInnerImages(post.id);
			}
		});
	};

  const loadInnerImages = async (postId) => {
    const options = { postId };
    const innerImages = (await props.loadImages(options)).filter(image => image.name !== 'Header.jpg');

    setExistingImages(innerImages);
	};

  const handlePostImageAddition = (e) => {
    const image = e.currentTarget.files[0];
    const postImages = images.length > 0 ? [...images, image] : [image];

    setImages(postImages);
  };

  const handlePostImageDeletion = async (e, name) => {
    e.preventDefault();
    await props.deletePostImages(postId, [name]);
    await loadInnerImages(postId);
  };

  const editPost = async e => {
    e.preventDefault();
    setErrors([]); // reset errors in case they had errors on last submit
    let editErrors = [];

    inputs.title = inputs.title.trim();
    inputs.content = inputs.content.trim();

    if (!inputs.date) {
      editErrors.push('Date is required!!!1!');
    }

    if (!inputs.title || inputs.title.length === 0) {
      editErrors.push('Title is required!!!1!');
    }

    if (!inputs.content || inputs.content.length === 0) {
      editErrors.push('Post Content is required!!!1!');
    }

    if (editErrors.length) {
      setErrors(editErrors);
      return;
    }

    if (inputs.headerImage) {
      props.uploadImages([inputs.headerImage], { postId, isHeader: true });
    }
    if (images.length > 0) {
      props.uploadImages(images, { postId });
    }

    const post = {
      date: inputs.date ? inputs.date.toDateString() : null,
      title: inputs.title,
      status: inputs.status,
      content: inputs.content,
      id: postId,
    };

    await props.editPost(post);

    setIsSubmitComplete(true);
  };

  return authWrapper(
    <React.Fragment>
      <Wrapper>
        <ManageContentStyles>
          <h1>Edit Blog Post</h1>
          <DisplayErrors isError={errors.length > 0} errors={errors} />
          <ManageFormStyles onSubmit={editPost} style={{display: (isSubmitComplete || postId === null) ? "none" : "grid"}}>
            <label>Date:<span className="required">&nbsp;*</span></label>
            <div>
              <DatePicker 
                selected={inputs.date}
                onChange={handleDateChange}
              />
            </div>
            <label>Header Image:</label>
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
              init={{
                height: 500,
                resize: false,
                statusbar: false,
                plugins: 'code',
                toolbar: 'code'
              }}
            />
            <label>Add Post Image:</label>
            <input 
              name="postImage"
              type="file" 
              onChange={handlePostImageAddition} 
            />
            <ImageListStyles>
              {existingImages.map((img, i) => {
                return (
                <ImageThumbWrapperStyles key={i}>
                  <ImageThumbStyles src={img.url} alt={img.name} />
                  <DeleteImageButtonStyles
                    onClick={(e) => {
                      handlePostImageDeletion(e, img.name);
                    }}
                  >
                    &times;
                  </DeleteImageButtonStyles>
                  <p>{img.name}</p>
                </ImageThumbWrapperStyles>
                );
              })}
            </ImageListStyles>
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

EditPost.propTypes = {
  editPost: PropTypes.func.isRequired,
  uploadImages: PropTypes.func.isRequired,
  loadImages: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string,
    title: PropTypes.string.isRequired,
    status: PropTypes.string,
    content: PropTypes.string,
    headerImage: PropTypes.string,
  })),
  storageRef: PropTypes.object,
};

export default EditPost;