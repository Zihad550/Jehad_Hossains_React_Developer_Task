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
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    height: 140px;
    margin-top: 41px;

    img{
        width: 100%;
        height: auto;
    }

    button{
        border: 1px solid #1D1F22;
        background: 0;
        padding: 8px;
        cursor: pointer;
    }

    div:first-child{
        
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
    width: 100%;
    overflow: hidden;
`;

export const CartBtn = styled.button`
    cursor: pointer;
`;

export const CartBody = styled.div`
    margin-right: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    text-align: left;
    
    /* buttons */
   div{
    button:first-child{
        margin-right: 15px;
    }
   }
    
`;

export default CartContainer;
