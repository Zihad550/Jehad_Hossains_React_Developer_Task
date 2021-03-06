import React from 'react';
import { Link } from 'react-router-dom';
import CartContainer, {
  CartBackground,
  CartBody,
  CartBtn,
  CartProduct,
  CartProductImgWrp,
  CartTotal,
  Quantity
} from '../../../shared/Styles/Containers/Cart';
import Button from '../../../shared/Styles/Tags/Button';
import { ShoppingCartProps } from './types';

const ShoppingCart = ({cartProducts, currency, handleUpdateCart}: ShoppingCartProps) => {

 const calculateTotal = () => {
    
    const total = cartProducts.map((product) => product.productTotal);

    if (total.length !== 0) {
      return total?.reduce((prev, next) => prev + next).toFixed(2);
    }
    return 0;
  };

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
              <CartProduct htmlFor="cart" key={product.id}>
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

                    <CartBtn onClick={() => handleUpdateCart({ id: product.id , option: 'add'})} type="button">
                      +
                    </CartBtn>
                    <p>
                      {product.quantity}
                    </p>

                    <CartBtn onClick={() => handleUpdateCart({ id: product.id, option: 'remove' })} type="button">
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
                  calculateTotal()
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



export default ShoppingCart;
