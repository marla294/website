import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { GlobalStyle } from "./GlobalStyles";
import Wrapper from './Styles/Wrapper';
import ManageContent from './Styles/ManageContent';
import ManageFormStyles from './Styles/ManageFormStyles';
import Submit from './Styles/Submit';

class ManagePost extends React.Component {
    constructor(props) {
        super(props);

        this.handleEditorChange = this.handleEditorChange.bind(this);
    }

    state = {
		post: {},
	};

    handleEditorChange(value) {
        const updatedPost = {
            ...this.state.post,
            content: value,
        };
        this.setState({post: updatedPost});
    }

    handleChange(event) {
        const updatedPost = {
            ...this.state.post,
            [event.currentTarget.name]: event.currentTarget.value
        };
        this.setState({post: updatedPost});
    }

    render() {
        return (
            <React.Fragment>
                <Wrapper>
                    <ManageContent>
                        <h1>Add New Blog Post</h1>
                        <ManageFormStyles>
                            <label>Title:</label>
                            <input 
                                type="text"
                                name="title"
                                onChange={this.handleChange}
                                value={this.state.post.title}
                            />
                            <label>Date:</label>
                            <input 
                                type="text"
                                name="date"
                                onChange={this.handleChange}
                                value={this.state.post.date}
                            />
                            <label>Status:</label>
                            <select 
                                type="text" 
                                name="status" 
                                onChange={this.handleChange} 
                                value={this.state.post.status}
                            >
                                <option value="draft">Draft</option>
                                <option value="public">Public</option>
                                <option value="public">Archive</option>
                            </select>
                            <label>Categories:</label>
                            <input 
                                type="text"
                                name="categories"
                                onChange={this.handleChange}
                                value={this.state.post.categories}
                            />
                            <label>Post Content:</label>
                            <Editor
                                apiKey="6iwtqmlk62i53rbkbzwap5z37phnitxrj9fsdyy9ri2k2ykj"
                                value={this.state.post.content}
                                onEditorChange={this.handleEditorChange}
                            />
                            <Submit type="submit">Submit</Submit>
                        </ManageFormStyles>
                    </ManageContent>
                </Wrapper>
                <GlobalStyle />
            </React.Fragment>
            
        );
    }
}

export default ManagePost;