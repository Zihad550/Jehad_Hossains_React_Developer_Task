import styled from 'styled-components';

const Button = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px 32px;
    background: ${(props) => props.bgcolor};
    border: 1px solid #1D1F22;
    box-sizing: border-box;
    flex: none;
    order: 0;
    flex-grow: 0;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    color: ${(props) => (props.bgcolor === 'white' ? 'black' : 'white')};
   
`;

export default Button;
