import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { WithContext as ReactTags } from 'react-tag-input';
import { GlobalStyle } from "./GlobalStyles";
import Wrapper from './Styles/Wrapper';
import ManageContent from './Styles/ManageContent';
import ManageFormStyles from './Styles/ManageFormStyles';
import Submit from './Styles/Submit';

const ManagePost = (props) => {
    const [date, setDate] = useState(new Date());
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("draft");
    const [categories, setCategories] = useState([]);
    const [content, setContent] = useState("");
    const [headerImage, setHeaderImage] = useState(null);
    
    const handleDateChange = updatedDate => {
        setDate(updatedDate);
    };

    const handleHeaderImageChange = event => {
        setHeaderImage(event.target.files[0]);
    }

    const handleTitleChange = updatedTitle => {
        setTitle(updatedTitle.currentTarget.value);
    };

    const handleStatusChange = updatedStatus => {
        setStatus(updatedStatus.currentTarget.value);
    };

    const handleCategoryAddition = category => {
        setCategories([...categories, category]);
    };

    const handleCategoryDeletion = i => {
        setCategories(categories.filter((cat, index) => index !== i));
    };

    const handleEditorChange = updatedContent => {
        setContent(updatedContent);
    };

    const addNewPost = e => {
        e.preventDefault();
        const post = {
            date,
            title,
            status,
            categories,
            content,
            id: `Post_${new Date().getTime()}`
        };

        props.addNewPost(post);
        props.uploadPostHeader(headerImage, post.id);
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
                            selected={date}
                            onChange={handleDateChange}
                        />
                    </div>
                    <label>Image:</label>
                        <input 
                            name="headerImage"
                            type="file" 
                            onChange={handleHeaderImageChange} 
                        />
                    <label>Title:</label>
                    <input 
                        type="text"
                        name="title"
                        onChange={handleTitleChange}
                        value={title}
                    />
                    <label>Status:</label>
                    <select 
                        type="text" 
                        name="status" 
                        onChange={handleStatusChange} 
                        value={status}
                    >
                        <option value="draft">Draft</option>
                        <option value="public">Public</option>
                        <option value="public">Archive</option>
                    </select>
                    <label>Categories:</label>
                    <div>
                        <ReactTags 
                            tags={categories}
                            delimiters={[188, 13]}
                            handleAddition={handleCategoryAddition}
                            handleDelete={handleCategoryDeletion}
                        />
                    </div>
                    <label>Post Content:</label>
                    <Editor
                        apiKey="6iwtqmlk62i53rbkbzwap5z37phnitxrj9fsdyy9ri2k2ykj"
                        value={content}
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

export default ManagePost;