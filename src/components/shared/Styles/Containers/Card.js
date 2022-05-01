import styled from 'styled-components';

const Card = styled.div`
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


   

    
`;

export const CardHeader = styled.div`
 display: flex;
    flex-direction: column;
    justify-content: flex-end;
        p{
            position: absolute;
            left: 25%;
            top: 30%;
            font-weight: 400;
            font-size: 24px;
            line-height: 160%;
            display: flex;
            align-items: center;
            color: #8D8F9A;
        }
    
`;

export const CardBody = styled.div`
        display: flex;
        position: relative;
        flex-direction: column;

    div{
            background-color: #5ECE7B;
            width: 35px;
            height: 35px;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color .3s;
            display: none;
            position: absolute;
            right: 7%;
            bottom: 90%;
    &:hover{
            background-color: black;
            cursor: pointer;
        }
        }
    
   

    h4 {
        font-weight: 300;
        font-size: 18px;
        line-height: 160%;
        display: flex;
        align-items: center;
        color: #1D1F22;
        margin: 24px 0px 0px 0px;
    }

    p{
        font-weight: 500;
        font-size: 18px;
        line-height: 160%;
        color: #1D1F22;
        margin: 0px 0px;
    }
    
    button{
        background: none;
        border: none;
        cursor: pointer;
    }
    
`;

export default Card;
