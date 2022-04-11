import React, { Component } from 'react';
import CartContainer, { CartBackground } from '../../Components/Styles/Containers/Cart';
import SelectedProductsContext from '../../Contexts/SelectedProductsContext';

class ShoppingCart extends Component {
  render() {
    const { cartProducts, currency } = this.context;

    /*  const {
      gallery, id, inStock, name, prices
    } = cartProducts; */
    console.log(cartProducts);
    return (
      <CartBackground>
        <CartContainer>
          <h4>
            MY Bag,
            {' '}
            <span>
              {cartProducts.length}
              {' '}
              items
            </span>
          </h4>

          {
            cartProducts.map((product) => (
              <div key={product.id}>
                <h4>{product.name}</h4>
                <img src={product.gallery[0]} alt="" />
              </div>
            ))
          }
        </CartContainer>
      </CartBackground>
    );
  }
}

ShoppingCart.contextType = SelectedProductsContext;
export default ShoppingCart;
