import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ErrorStyles = styled.div`
  background-color: red;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 4px;

  h3 {
    color: white;
    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    color: white;
    margin-bottom: 0;
    margin-left: 20px;
  }

  p {
    color: white;
    margin-bottom: 0;
  }

  button {
    width: 24px;
    height: 24px;
    border: none;
    background-color: transparent;
    color: white;
    justify-self: end;
    font-size: 20px;
  }
`;

const DisplayError = ({isError, errors}) => {
  const [showError, setShowError] = useState(false);
  const [errorsToDisplay, setErrorsToDisplay] = useState([]);

  useEffect(() => {
    setShowError(isError);
    setErrorsToDisplay(errors);
  }, [isError, errors]);

  return (
  <React.Fragment>
    <ErrorStyles style={{display: showError ? "grid" : "none"}}>
      <div>
        <h3>👎👎ERRORS👎👎ERRORS👎👎ERRORS👎👎</h3>
        <ul>
          {errorsToDisplay.map(error => <li>{error}</li>)}
        </ul>
      </div>
      <button onClick={(e) => {
        e.preventDefault();
        setShowError(false);
      }}>&times;</button>
    </ErrorStyles>
  </React.Fragment>
  
  );
};

DisplayError.propTypes = {
  isError: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default DisplayError;