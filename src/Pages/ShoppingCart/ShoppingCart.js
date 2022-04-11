import React, { Component } from 'react';
import CartContainer, { CartBackground } from '../../Components/Styles/Containers/Cart';

export default class ShoppingCart extends Component {
  render() {
    const { cartProducts } = this.props;

    const {
      gallery, id, inStock, name, prices
    } = cartProducts;
    return (
      <CartBackground>
        <CartContainer>
          <h4>
            MY Bag
            {cartProducts.length}
          </h4>
        </CartContainer>
      </CartBackground>
    );
  }
}
