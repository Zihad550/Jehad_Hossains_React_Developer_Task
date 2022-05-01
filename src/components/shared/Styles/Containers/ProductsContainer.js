import styled from 'styled-components';

const ProductsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-bottom: 2rem;

    /* small screen | mobile screen */
    @media only screen and (max-width: 600px) {
        grid-template-columns:  1fr;
    }

    /* medium screen | tablet screen */
    @media only screen and (max-width: 1000px) and (min-width: 601px){
        grid-template-columns: repeat(2, 1fr);
    }

    /* large screen | pc screen */
    @media only screen and (min-width: 1300px){
        grid-template-columns: repeat(4, 1fr);
    }
`;

export default ProductsContainer;
