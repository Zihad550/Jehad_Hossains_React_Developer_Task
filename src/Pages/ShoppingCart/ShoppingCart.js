import React, { Component } from 'react';
import CartContainer from '../../Components/Styles/Containers/Cart';

export default class ShoppingCart extends Component {
  render() {
    const { cartProducts } = this.props;
    const {
      gallery, id, inStock, name, prices
    } = cartProducts;
    return (
      <CartContainer>
        <h4>MY Bag</h4>
      </CartContainer>
    );
  }
}
