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

export const Nav = styled.nav`
    display: flex;
    height: 100%;
`;

export const NavBtn = styled.a`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 120%;
    display: flex;
    align-items: center;
    text-align: center;
    text-transform: uppercase;
    color: #1D1F22;
    flex: none;
    order: 0;
    flex-grow: 0;    
   
   cursor: pointer;
   margin-right: 32px;
   height: 100%;
   transition: all .2s;

   &:hover{
       border-bottom: 2px solid #5ECE7B;
       color: #5ECE7B;
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

export const Bag = styled.div`
    cursor: pointer;
`;

export default HeaderContainer;
