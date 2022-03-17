import React from 'react';

const DisplayError = ({isError, children}) => {
  return <div style={{display: isError ? "block" : "none"}}>
    {children}
  </div>
}

export default DisplayError;