import styled from 'styled-components';

const DetailContainer = styled.div`
   display: grid;
   grid-template-columns: repeat(2, 1fr);
`;

export const DetailImgs = styled.div`
display: flex;
    div:first-child{
        img{
        width: 180px;
        height: auto;
    }
}

    div:last-child{
        img{
            width: 100%;
        }
    }
    
    
`;

export const Details = styled.div`

`;

export default DetailContainer;
