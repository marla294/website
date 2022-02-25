import React from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import { GlobalStyle } from "./GlobalStyles";
import Wrapper from './Styles/Wrapper';
import Submit from './Styles/Submit';

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

    textarea {
        width: 100%
        height: 200px;
        resize: none;
        padding: 12px 20px;
        border: 2px solid var(--Gray05);
        border-radius: 4px;
        margin-bottom: var(--S05);
        color: var(--Gray05);
    }

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
                            <label for="blurb">Blurb</label>
                            <textarea 
                                name="blurb" 
                                ref={this.blurbRef} 
                                value={this.state.about.blurb}
                                onChange={this.handleChange}
                            ></textarea>
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