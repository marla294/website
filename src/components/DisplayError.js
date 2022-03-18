import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const ErrorStyles = styled.div`
  background-color: red;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 4px;

  p {
    color: white;
    margin-bottom: 0;
  }

  button {
    width: 24px;
    border: none;
    background-color: transparent;
    color: white;
    justify-self: end;
    font-size: 20px;
  }
`;

const DisplayError = ({isError, children}) => {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setShowError(isError);
  }, [isError]);

  return <ErrorStyles style={{display: showError ? "grid" : "none"}}>
    <p>{children}</p>
    <button onClick={(e) => {
      e.preventDefault();
      setShowError(false);
    }}>&times;</button>
  </ErrorStyles>
}

export default DisplayError;