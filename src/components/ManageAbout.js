import React from "react";
import PropTypes from 'prop-types';

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
                <form onSubmit={this.updateAbout}>
                    <textarea 
                        name="blurb" 
                        ref={this.blurbRef} 
                        value={this.state.about.blurb}
                        onChange={this.handleChange}
                    ></textarea>
                    <button type="submit">Update About</button>
                </form>
            </React.Fragment>
        );
    }
};

export default ManageAbout;