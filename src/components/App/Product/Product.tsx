import React, { Component } from 'react';
import WithRouter from '../../../HOC/withRouter';
import Cart from '../../shared/CartIcon/CartIcon';
import Card, { CardBody, CardHeader } from '../../shared/Styles/Containers/Card';
import { ProductProps } from './types';


class Product extends Component <ProductProps>{
  handleNavigate = (id: string) => {
    this.props.navigate(`/detail/${id}`)
  };

  render() {
    const { product, handleAddToCart, currency: changedCurrency } = this.props;
    const {
      name, inStock, prices, gallery, id,
    } = product;

    const productPrice = prices.find((price) => price.currency.symbol === changedCurrency) || {amount: 0, currency: {label: 'Doller', symbol: '$'}};

    const { amount, currency } = productPrice;

    return (
      <Card>
        <CardHeader onClick={() => this.handleNavigate(id)}>
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
            <button
              onClick={() => handleAddToCart({
                id,
                name,
                src: gallery[0],
                amount,
                currency,
                productTotal: amount,
                quantity: 1,
                inStock,
              })}
              type="button"
            >
              <Cart width="20px" color="white" height="auto" />
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
}

export default WithRouter(Product);
