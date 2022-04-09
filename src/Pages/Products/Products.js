import { gql, useQuery } from '@apollo/client';
import React from 'react';

function Products() {
  const ALL_PRODUCTS = gql`
  {
    categories{
    products{
      name
    }
    }
    }    
`;
  const { data } = useQuery(ALL_PRODUCTS);
  console.log(data);
  return (
    <div>Products</div>
  );
}

export default Products;
