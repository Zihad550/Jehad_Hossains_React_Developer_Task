import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    }
    h2, h4, p{
        font-family: 'Raleway';
        font-style: normal;
    }
`;

export default GlobalStyle;
