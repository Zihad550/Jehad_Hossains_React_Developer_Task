import styled from 'styled-components';

const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1rem;
    background: #fff;
    border-radius: .3rem;
    width: 100%;
    text-align: left;
    position: relative;
    &:hover{
        box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
    }

    &:hover div{
        display: flex;
    }

    h4 {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 300;
        font-size: 18px;
        line-height: 160%;
        display: flex;
        align-items: center;
        color: #1D1F22;
        margin: 24px 0px 0px 0px;
    }

    p{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 160%;
        color: #1D1F22;
        margin: 0px 0px;
    }

    div{
        background-color: #5ECE7B;
        width: 35px;
        height: 35px;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        margin: -1rem .5rem 0 auto;
        transition: background-color .3s;
        display: none;
        position: absolute;
        right: 7%;
        bottom: 20%;
        
        &:hover{
            background-color: black;
            cursor: pointer;
        }
    }
`;

export default ProductContainer;
