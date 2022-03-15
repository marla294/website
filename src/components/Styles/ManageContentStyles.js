import styled from 'styled-components';

const ManageContentStyles = styled.div`
	width: 100%;
  padding: 0 20px;

  h1, h2, h3, h4, h5 {
    margin-bottom: var(--S05);
    color: var(--Gray05);
  }

  h1 {
    font-size: var(--F06);
  }

  h3 {
    font-size: var(--F04);
    margin-top: var(--S05);
  }

  a:hover {
    text-decoration: underline;
  }
`;

export default ManageContentStyles;