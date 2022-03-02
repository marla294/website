import styled from 'styled-components';

const ManageFormStyles = styled.form`
    display: grid;
    color: var(--Gray05);
    grid-gap: 10px;

    input, select {
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
    }

    .react-datepicker__triangle {
        display: none !important;
    }
`;

export default ManageFormStyles;