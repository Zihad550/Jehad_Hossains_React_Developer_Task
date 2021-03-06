import styled from 'styled-components';

const CartContainer = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    width: 325px;
    height: 540px;
    overflow-y: scroll;
    top: 0%;
    right: 5.5%;
    padding: 16px;
    h4{
        font-weight: 700;
        font-size: 16px;
        line-height: 160%;
        text-align: right;
        color: #1D1F22;

        span{
            font-weight: normal;
        }
    }

    /* scrollbar css */
    ::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
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

export const CartProduct = styled.div`
    display: flex;
    justify-content: space-between;
    height: 140px;
    margin-top: 41px;

    button{
        border: 1px solid #1D1F22;
        background: 0;
        padding: 8px;
        cursor: pointer;
    }

`;

export const Quantity = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 5px;
`;

export const CartProductImgWrp = styled.div`
    display: flex;
    width: 140px;
`;

export const CartBtn = styled.button`
    cursor: pointer;
`;

export const CartBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* width: max-content; */
    /* align-items: flex-start; */
    width: 130px;
    h4{
        text-align: left;
    }
    /* buttons */
   div{
    button:first-child{
        margin-right: 15px;
    }
   }
    
`;

export const CartTotal = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-direction: column;
    margin-top: auto;
   

    p{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    color: #1D1F22;
    margin: 42px 10px 35px 0px;

    span{
        font-size: 1.3em;
        margin-right: 1px;
    }

    }

    div{
        display: flex;
        justify-content: space-between;
    }
        button{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px 32px;
    background: #FFFFFF;
    border: 1px solid #1D1F22;
    box-sizing: border-box;
    flex: none;
    order: 0;
    flex-grow: 0;
    text-transform: uppercase;
    cursor: pointer;
    }

    button:last-child{
        background: #5ECE7B;
        color: #FFFFFF;
    }
    

    

`;

export default CartContainer;
