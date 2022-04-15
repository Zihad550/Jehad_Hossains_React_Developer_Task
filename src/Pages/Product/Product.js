import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import Cart from '../../Components/CartIcon';
import Card, { CardBody, CardHeader } from '../../Components/Styles/Containers/Card';

class Product extends Component {
  state = {
    navigate: false,
  };

  handleNavigate = () => {
    this.setState({ navigate: true });
  };

  render() {
    const { product, handleAddToCart, currency: changedCurrency } = this.props;
    const {
      name, inStock, prices, gallery, id
    } = product;

    const price = prices.find((price) => price.currency.symbol === changedCurrency);

    const { amount, currency } = price;

    return (
      <Card>
        {
          this.state.navigate && <Navigate to={`/detail/${id}`} />
        }
        <CardHeader onClick={this.handleNavigate}>
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
                id, name, src: gallery[0], amount, currency, productTotal: amount, quantity: 1, inStock
              })}
              type="button"
            >
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
}

export default Product;
