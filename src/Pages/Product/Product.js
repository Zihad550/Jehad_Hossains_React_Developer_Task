import React from 'react';
import Cart from '../../Components/CartIcon';
import Card, { CardBody, CardHeader } from '../../Components/Styles/Containers/Card';

function Product({ product, currency: changedCurrency, handleAddToCart }) {
  const {
    name, inStock, prices, gallery
  } = product;
  const price = prices.find((price) => price.currency.label === changedCurrency);
  const { amount, currency } = price;
  return (
    <Card>

      <CardHeader>
        <img style={{ width: '100%' }} src={gallery[0]} alt="" />
        {
          inStock || (
          <p>
            Out Of Stock
          </p>
          )
        }
      </CardHeader>

      <CardBody>
        <div>
          <button onClick={() => handleAddToCart(product)} type="button">
            <Cart width="20px" color="white" />
          </button>
        </div>
        <h4>
          {name}
        </h4>
        <p>
          {`${currency.symbol} ${amount}`}
        </p>
      </CardBody>
    </Card>
  );
}

export default Product;
