import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap');
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
