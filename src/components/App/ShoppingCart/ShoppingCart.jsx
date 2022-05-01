import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartContainer, {
  CartBackground,
  CartBody,
  CartBtn,
  CartProduct,
  CartProductImgWrp,
  CartTotal,
  Quantity
} from '../../shared/Styles/Containers/Cart';
import Button from '../../shared/Styles/Tags/Button';

class ShoppingCart extends Component {
  calculateTotal = () => {
    const { cartProducts } = this.props;
    const total = cartProducts.map((product) => product.productTotal);

    if (total.length !== 0) {
      return total?.reduce((prev, next) => prev + next).toFixed(2);
    }
    return 0;
  };

  render() {
    const { cartProducts, handleAddToCart, currency } = this.props;
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
              <CartProduct for="cart" key={product.id}>
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
          <CartTotal>
            <div>
              <p>Total</p>
              <p>
                <span>{currency}</span>
                {
                  this.calculateTotal()
                }
              </p>
            </div>
            <div>
              <Button as={Link} bgcolor="white" to="/bag" type="button">
                View Bag
              </Button>
              <Button bgcolor="#5ECE7B" type="button">
                Check Out
              </Button>
            </div>
          </CartTotal>
        </CartContainer>
      </CartBackground>
    );
  }
}

ShoppingCart.propTypes = {
  cartProducts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
};

export default ShoppingCart;
