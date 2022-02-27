import React, { useRef } from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import { GlobalStyle } from "./GlobalStyles";
import Wrapper from './Styles/Wrapper';
import Submit from './Styles/Submit';
import { Editor } from '@tinymce/tinymce-react';

const ManageContent = styled.div`
    width: 100%;
    padding: 0 20px;

    h1 {
        margin-bottom: 20px;
		color: var(--Gray05);
		font-size: var(--F06);
    }
`;

const ManageAboutForm = styled.form`
    display: grid;
    color: var(--Gray05);
    grid-gap: 10px;

    @media only screen and (min-width: 768px) {
		textarea {
			width: 768px;
		}
	}
`;

class ManageAbout extends React.Component {
    static propTypes = {
        updateAbout: PropTypes.func,
        about: PropTypes.shape({
			blurb: PropTypes.string
		}),
    };

    constructor(props) {
        super(props);

        this.handleEditorChange = this.handleEditorChange.bind(this);
    }

    state = {
		about: {}
	};

    blurbRef = React.createRef();

    componentDidUpdate(prevProps) {
        if (this.props.about !== prevProps.about) {
            this.setState({about: {...this.props.about}});
        }
    }

    handleChange = (event) => {
        const updatedAbout = {
            ...this.props.about,
            [event.currentTarget.name]: event.currentTarget.value,
        };
        this.setState({about: updatedAbout});
    };

    handleEditorChange(value, editor) {
        const updatedAbout = {
            ...this.state.about,
            blurb: value,
        };
        this.setState({about: updatedAbout});
    }

    updateAbout = (e) => {
        e.preventDefault();
        this.props.updateAbout(this.state.about);
        e.currentTarget.reset();
    };

    render() {
        return (
            <React.Fragment>
                <Wrapper>
                    <ManageContent>
                        <h1>Update About Page</h1>
                        <ManageAboutForm onSubmit={this.updateAbout}>
                            <label>Blurb:</label>
                            <Editor
                                apiKey="6iwtqmlk62i53rbkbzwap5z37phnitxrj9fsdyy9ri2k2ykj"
                                value={this.state.about.blurb}
                                onEditorChange={this.handleEditorChange}
                            />
                            <Submit type="submit">Submit</Submit>
                        </ManageAboutForm>
                    </ManageContent>
                </Wrapper>
                <GlobalStyle />
            </React.Fragment>
        );
    }
};

export default ManageAbout;