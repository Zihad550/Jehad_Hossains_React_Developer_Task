import styled from 'styled-components';

const HeaderContainer = styled.div`
    height: 80px;
    width: 90%;
    margin: 0 auto;
    div{
    display:flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    }
    
`;

export const Features = styled.div`
    display: flex;
   button{
       cursor: pointer;
       border: 0;
       background: none;
   }
`;

export const Currency = styled.p`
        margin-right: 15px;
        font-size: 1.2rem;
        svg{
            margin-left: 5px;
        }
`;

export default HeaderContainer;
