import React, {useState} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { WithContext as ReactTags } from 'react-tag-input';
import { GlobalStyle } from "./GlobalStyles";
import Wrapper from './Styles/Wrapper';
import ManageContent from './Styles/ManageContent';
import ManageFormStyles from './Styles/ManageFormStyles';
import Submit from './Styles/Submit';

const ManagePost = () => {
    const [categories, setCategories] = React.useState([]);

    const handleCategoryAddition = category => {
        setCategories([...categories, category]);
    };

    const handleCategoryDeletion = i => {
        setCategories(categories.filter((cat, index) => index !== i));
    };

    return(
        <React.Fragment>
        <Wrapper>
            <ManageContent>
                <h1>Add New Blog Post</h1>
                <ManageFormStyles>
                    {/* <label>Date:</label>
                    <div>
                        <DatePicker 
                            selected={this.state.post.date}
                            onChange={this.handleDatePickerChange}
                        />
                    </div> */}
                    {/* <label>Title:</label>
                    <input 
                        type="text"
                        name="title"
                        onChange={this.handleChange}
                        value={this.state.post.title}
                    /> */}
                    
                    {/* <label>Status:</label>
                    <select 
                        type="text" 
                        name="status" 
                        onChange={this.handleChange} 
                        value={this.state.post.status}
                    >
                        <option value="draft">Draft</option>
                        <option value="public">Public</option>
                        <option value="public">Archive</option>
                    </select> */}
                    <label>Categories:</label>
                    <div>
                        <ReactTags 
                            tags={categories}
                            delimiters={[188, 13]}
                            handleAddition={handleCategoryAddition}
                            handleDelete={handleCategoryDeletion}
                        />
                    </div>
                    {/* <label>Post Content:</label>
                    <Editor
                        apiKey="6iwtqmlk62i53rbkbzwap5z37phnitxrj9fsdyy9ri2k2ykj"
                        value={this.state.post.content}
                        onEditorChange={this.handleEditorChange}
                    /> */}
                    <Submit type="submit">Submit</Submit>
                </ManageFormStyles>
            </ManageContent>
        </Wrapper>
        <GlobalStyle />
    </React.Fragment>
    );

    // handleTagDeletion(i) {
    //     let updatedCategories = [...this.state.post.categories];
    //     updatedCategories = updatedCategories.filter((cat, index) => {
    //         return index !== i
    //     });

    //     const updatedPost = {
    //         ...this.state.post,
    //         categories: [...updatedCategories],
    //     };

    //     this.setState({post: updatedPost});
    // };
};

// class ManagePost extends React.Component {
//     constructor(props) {
//         super(props);

//         this.handleChange = this.handleChange.bind(this);
//         this.handleEditorChange = this.handleEditorChange.bind(this);
//         this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
//         this.handleTagAddition = this.handleTagAddition.bind(this);
//         this.handleTagDeletion = this.handleTagDeletion.bind(this);
//     }

//     state = {
// 		post: {
//             categories: []
//         },
// 	};

//     const [categories, setCategories] = React.useState([]);

//     handleEditorChange(value) {
//         const updatedPost = {
//             ...this.state.post,
//             content: value,
//         };
//         this.setState({post: updatedPost});
//     }

//     handleDatePickerChange(value) {
//         const updatedPost = {
//             ...this.state.post,
//             date: new Date(value),
//         };
//         this.setState({post: updatedPost});
//     }

//     handleTagAddition(tag) {
//         const updatedPost = {
//             ...this.state.post,
//             categories: [...this.state.post.categories, tag]
//         };
//         this.setState({post: updatedPost});
//     };

//     handleTagDeletion(i) {
//         let updatedCategories = [...this.state.post.categories];
//         updatedCategories = updatedCategories.filter((cat, index) => {
//             return index !== i
//         });

//         const updatedPost = {
//             ...this.state.post,
//             categories: [...updatedCategories],
//         };

//         this.setState({post: updatedPost});
//     };

//     handleChange(event) {
//         const updatedPost = {
//             ...this.state.post,
//             [event.currentTarget.name]: event.currentTarget.value
//         };
//         this.setState({post: updatedPost});
//     };

//     render() {
//         return (
            // <React.Fragment>
            //     <Wrapper>
            //         <ManageContent>
            //             <h1>Add New Blog Post</h1>
            //             <ManageFormStyles>
            //                 <label>Date:</label>
            //                 <div>
            //                     <DatePicker 
            //                         selected={this.state.post.date}
            //                         onChange={this.handleDatePickerChange}
            //                     />
            //                 </div>
            //                 <label>Title:</label>
            //                 <input 
            //                     type="text"
            //                     name="title"
            //                     onChange={this.handleChange}
            //                     value={this.state.post.title}
            //                 />
                            
            //                 <label>Status:</label>
            //                 <select 
            //                     type="text" 
            //                     name="status" 
            //                     onChange={this.handleChange} 
            //                     value={this.state.post.status}
            //                 >
            //                     <option value="draft">Draft</option>
            //                     <option value="public">Public</option>
            //                     <option value="public">Archive</option>
            //                 </select>
            //                 <label>Categories:</label>
            //                 {/* <input 
            //                     type="text"
            //                     name="categories"
            //                     onChange={this.handleChange}
            //                     value={this.state.post.categories}
            //                 /> */}
            //                 <div>
            //                     <ReactTags 
            //                         tags={this.state.post.categories}
            //                         delimiters={[188, 13]}
            //                         handleAddition={this.handleTagAddition}
            //                         handleDelete={this.handleTagDeletion}
            //                     />
            //                 </div>
            //                 <label>Post Content:</label>
            //                 <Editor
            //                     apiKey="6iwtqmlk62i53rbkbzwap5z37phnitxrj9fsdyy9ri2k2ykj"
            //                     value={this.state.post.content}
            //                     onEditorChange={this.handleEditorChange}
            //                 />
            //                 <Submit type="submit">Submit</Submit>
            //             </ManageFormStyles>
            //         </ManageContent>
            //     </Wrapper>
            //     <GlobalStyle />
            // </React.Fragment>
            
//         );
//     }
// }

export default ManagePost;