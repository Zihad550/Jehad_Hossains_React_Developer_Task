import React from 'react';
import Cart from '../../Components/Cart';
import Card, { CardBody, CardHeader } from '../../Components/Styles/Containers/Card';

function Product({ product }) {
  const {
    name, inStock, prices, gallery
  } = product;
  const { currency, amount } = prices[0];
  console.log(prices);
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
          <Cart width="20px" color="white" />
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
