import React from 'react';
import Cart from '../../Components/Cart';
import ProductContainer from '../../Components/Styles/Containers/ProductContainer';

function Product({ product }) {
  const {
    name, inStock, prices, gallery
  } = product;
  const { currency, amount } = prices[0];
  console.log(prices);
  return (
    <ProductContainer>
      <img style={{ width: '100%' }} src={gallery[0]} alt="" />
      <div>
        <Cart width="20px" color="white" />
      </div>
      <h4>
        {name}
      </h4>
      <p>
        {`${currency.symbol} ${amount}`}
      </p>
    </ProductContainer>
  );
}

export default Product;
