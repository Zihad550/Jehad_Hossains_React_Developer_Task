import styled from 'styled-components';

const DetailContainer = styled.div`
   /* display: grid;
   column-gap: 100px;
   grid-template-columns: repeat(2, 1fr); */
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-top: 70px;
   height: 60vh;
`;

export const DetailImgs = styled.div`
display: flex;
flex-basis: 50%;
    div:first-child{
        width: 180px;
        height: 60vh;
        overflow-y: scroll;
        img{
        width: 100%;
        height: auto;
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
}

    div:last-child{
        margin-left: 5px;
        img{
            width: 100%;
        }
    }
    
    
`;

export const Details = styled.div`
    flex-basis: 40%;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    h3{
    font-weight: 600;
    font-size: 30px;
    line-height: 27px;    
    display: flex;
    align-items: center;
    color: #1D1F22;
    }

    h4{
    font-weight: 400;
    font-size: 30px;
    line-height: 27px;
    display: flex;
    align-items: center;
    color: #1D1F22;
    }

    

    

`;

export const Size = styled.div`
    p{

    font-family: 'Roboto Condensed';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 18px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #1D1F22;
    }
`;

export const Price = styled.div`
     p{
        font-family: 'Raleway';
        font-weight: 700;
        span{
            font-size: 1.3em;
            margin-bottom: 5px;
        }
    }
`;

export const Desc = styled.p`
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 159.96%;
        color: #1D1F22;
`;

export const SizeBtn = styled.button`
    width: 63px;
    height: 45px;
    border: 1px solid #1D1F22;
    box-sizing: border-box;
    margin-right: 12px;
`;

export const AddBtn = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 32px;
    width: 292px;
    height: 52px;
    left: 929px;
    top: 478px;
    background: #5ECE7B;
    font-family: 'Raleway';
    border: 0;
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 120%;
color: #fff;
text-transform: uppercase;
`;

export default DetailContainer;
