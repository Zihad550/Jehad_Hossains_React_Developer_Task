import styled from 'styled-components';

const CartContainer = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 325px;
    height: 540px;
    top: 0%;
    right: 5.5%;
    padding: 16px;
    h4{
        font-weight: 700;
        font-size: 16px;
        line-height: 160%;
        text-align: right;
        color: #1D1F22;
    }

`;

export const CartBackground = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(57, 55, 72, 0.22);    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    left: 0%;
`;

export default CartContainer;
