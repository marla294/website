import React from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import { GlobalStyle } from "./GlobalStyles";
import Wrapper from './Styles/Wrapper';
import ManageContent from './Styles/ManageContent';
import Submit from './Styles/Submit';
import { Editor } from '@tinymce/tinymce-react';
import firebase from 'firebase';
import Login from './Login';
import base, { firebaseApp } from '../base';

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
		about: {},
        aboutImage: null,
        uid: null,
        owner: null,
	};

    blurbRef = React.createRef();

    componentDidMount() {
        firebase.auth().onIdTokenChanged(user => {
            if (user) {
                this.authHandler({user});
            }
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.about !== prevProps.about) {
            this.setState({about: {...this.props.about}});
        }
    }

    handleFileChange = (event) => {
        this.setState({aboutImage: event.target.files[0]});
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
        this.props.uploadAboutImage(this.state.aboutImage);
    };

    authHandler = async (authData) => {
        const owner = await base.fetch('owner', {context: this});
        
        this.setState({
            uid: authData.user.uid,
            owner: owner || authData.user.uid
        })
    }

    authenticate = () => {
        const authProvider = new firebase.auth['GithubAuthProvider']();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
    }

    logout = async () => {
        await firebase.auth().signOut();
        this.setState({ uid: null });
    }

    render() {
        const logout = <button onClick={this.logout}>Log Out!</button>

        if (!this.state.uid) {
            return <Login authenticate={this.authenticate} />
        }

        if (this.state.uid !== this.state.owner) {
            return <div>
                <p>Hey, you're not Marla Foreman!  Stop trying to break into my site!</p>
                {logout}
            </div>
        }

        return (
            <React.Fragment>
                <Wrapper>
                    <ManageContent>
                        <h1>Update About Page</h1>
                        <ManageAboutForm onSubmit={this.updateAbout}>
                            <label>Image:</label>
                            <input 
                                name="aboutImage"
                                type="file" 
                                onChange={this.handleFileChange} 
                            />
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