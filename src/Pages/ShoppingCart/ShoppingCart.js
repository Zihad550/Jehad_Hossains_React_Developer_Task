import React, { Component } from 'react';
import CartContainer, {
  CartBackground, CartBody, CartBtn, CartProduct, CartProductImgWrp, Quantity
} from '../../Components/Styles/Containers/Cart';
import SelectedProductsContext from '../../Contexts/SelectedProductsContext';

class ShoppingCart extends Component {
  calculateTotal = () => {
    const total = this.props.cartProducts.map((product) => product.amount);

    console.log(total);
    if (total.length !== 0) {
      return total?.reduce((prev, next) => prev + next).toFixed(2);
    }
    return 0;
  };

  render() {
    const { cartProducts, handleAddToCart } = this.props;
    console.log(cartProducts);
    return (
      <CartBackground>
        <CartContainer>
          <h4>
            MY Bag,
            <span>
              {cartProducts.length}
              items
            </span>
          </h4>
          {
            cartProducts.map((product) => (
              <CartProduct key={product.id}>
                {/* name & price & size btn */}
                <CartBody>
                  {/* name */}
                  <h4>{product.name}</h4>
                  <p>
                    {product.currency.symbol}
                    {product.amount}
                  </p>

                  {/* size btns */}
                  <div>
                    <button type="button">
                      S
                    </button>
                    <button type="button">
                      M
                    </button>
                  </div>
                </CartBody>

                {/* image */}
                <CartProductImgWrp>
                  {/* quantity btn */}
                  <Quantity>

                    <CartBtn onClick={() => handleAddToCart({ id: product.id })} type="button">
                      +
                    </CartBtn>
                    <p>
                      {product.quantity}
                    </p>

                    <CartBtn onClick={() => handleAddToCart({ id: product.id, option: 'decrease' })} type="button">
                      -
                    </CartBtn>
                  </Quantity>
                  <img src={product.src} alt="" />
                </CartProductImgWrp>
              </CartProduct>
            ))
          }

          {/* total & view bag & checkout  */}
          <div>
            <p>Total</p>
            <p>
              {
                  this.calculateTotal()
                }
            </p>
          </div>
        </CartContainer>
      </CartBackground>
    );
  }
}

ShoppingCart.contextType = SelectedProductsContext;
export default ShoppingCart;
