import styled from 'styled-components';

const ProductsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-bottom: 2rem;
    @media only screen and (max-width: 500px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

export default ProductsContainer;
