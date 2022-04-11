import styled from 'styled-components';

const HeaderContainer = styled.div`
    /* height: 80px; */
    display: block;
    margin: 20px 0;
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

export const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export default HeaderContainer;
