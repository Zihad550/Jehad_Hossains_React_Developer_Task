import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import Cart from '../../shared/CartIcon/CartIcon';
import Card, { CardBody, CardHeader } from '../../shared/Styles/Containers/Card';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigate: false,
    };
  }

  handleNavigate = () => {
    this.setState({ navigate: true });
  };

  render() {
    const { navigate } = this.state;
    const { product, handleAddToCart, currency: changedCurrency } = this.props;
    const {
      name, inStock, prices, gallery, id,
    } = product;

    console.log(product);

    const productPrice = prices.find((price) => price.currency.symbol === changedCurrency);

    const { amount, currency } = productPrice;

    return (
      <Card>
        {
          navigate && <Navigate to={`/detail/${id}`} />
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

Product.propTypes = {
  product: PropTypes.objectOf({
    name: PropTypes.string,
    inStock: PropTypes.bool,
    prices: PropTypes.array,
    gallery: PropTypes.array,
    id: PropTypes.string,
  }).isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
};

export default Product;
