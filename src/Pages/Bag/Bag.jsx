import React from 'react';
import {
  CartBody, CartBtn, CartProduct, CartProductImgWrp, Quantity
} from '../../Components/Styles/Containers/Cart';
import Container from '../../Components/Styles/Containers/Container';
import Header from '../Header/Header';

function Bag({ cartProducts, handleAddToCart, currency }) {
  const calculateTotal = () => {
    const total = cartProducts.map((product) => product.productTotal);

    if (total.length !== 0) {
      return total?.reduce((prev, next) => prev + next).toFixed(2);
    }
    return 0;
  };
  return (
    <div>
      {/* header */}
      <Header />

      {/* main */}
      <Container>

        {/* title */}
        <h2>
          Cart
        </h2>

        {/* body */}
        <div>
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
        </div>
      </Container>

    </div>
  );
}

export default Bag;
