import styled from 'styled-components';

const ToastContainer = styled.button`
    display: flex;
    align-items: center;
    width: max-content;
    padding: .2rem;
    font-size: 1.5rem;
    cursor: pointer;
    position: fixed;
    left: 40%;
    top: 40%;
    z-index: 999;
    background: ${(props) => props.color};
    border-radius: 5px;
    color: ${(props) => props.textColor || 'white'}
`;

export const Msg = styled.p`
`;

export const Icon = styled.p`
    margin-left: 5px;
    display: inline-block;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default ToastContainer;
