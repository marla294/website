import React from 'react';
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
  return <ErrorStyles style={{display: isError ? "grid" : "none"}}>
    <p>{children}</p>
    <button>&times;</button>
  </ErrorStyles>
}

export default DisplayError;