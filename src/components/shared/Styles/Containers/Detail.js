import styled from 'styled-components';

const DetailContainer = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-top: 150px;
   height: 450px;

   @media only screen and (max-width: 1000px) {
       flex-direction: column;
   }
`;

export const DetailImgs = styled.div`
display: flex;
flex-basis: 50%;

@media only screen and (max-width: 1000px) {
       padding-bottom: 20px;
   }
   
    div:first-child{
        width: 300px;
        height: 100%;
        overflow-y: scroll;
        img{
        width: 100%;
        height: auto;
        margin-bottom: 20px;
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

export const Attributes = styled.div`

`;

export const Attribute = styled.div`
    h5{
        font-family: 'Roboto Condensed';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 18px;
        color: #1D1F22;
        margin-bottom: 8px;
    }

    p{
        margin-bottom: 24px;
        display: flex;
    }
`;

export const AttributeBtn = styled.button`
border: 1px solid #A6A6A6;
box-sizing: border-box;
font-family: 'Source Sans Pro';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 18px;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.05em;
margin-right: 12px;
padding: 14px 20px;
cursor: pointer;


/* color: #292929; */
color: ${({ bgColor }) => ((bgColor === '#030BFF' || bgColor === '#000000') ? '#fff' : '#000')};
background: ${({ bgColor }) => (bgColor.startsWith('#') ? (bgColor) : 'white')};

&:hover{
    background: black;
    color: white;
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
    cursor: pointer;
`;

export default DetailContainer;
