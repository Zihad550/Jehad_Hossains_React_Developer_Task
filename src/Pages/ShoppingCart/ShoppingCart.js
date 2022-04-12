import React, { Component } from 'react';
import CartContainer, {
  CartBackground, CartProduct, CartProductImgWrp, Quantity
} from '../../Components/Styles/Containers/Cart';
import SelectedProductsContext from '../../Contexts/SelectedProductsContext';

class ShoppingCart extends Component {
  render() {
    const { cartProducts, handleAddToCart } = this.context;

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
              <CartProduct key={product.id}>
                {/* name & price & size btn */}
                <div>
                  <h4>{product.name}</h4>

                </div>

                {/* image */}
                <CartProductImgWrp>
                  {/* quantity btn */}
                  <Quantity>
                    <button onClick={() => handleAddToCart(product.id)} type="button">
                      +
                    </button>
                    <p>
                      {product.quantity}
                    </p>
                    <button type="button">
                      -
                    </button>
                  </Quantity>
                  <img src={product.src} alt="" />
                </CartProductImgWrp>
              </CartProduct>
            ))
          }
        </CartContainer>
      </CartBackground>
    );
  }
}

ShoppingCart.contextType = SelectedProductsContext;
export default ShoppingCart;
