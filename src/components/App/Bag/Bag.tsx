import React from 'react';
import { ICartProduct } from '../../../types';
import {
  CartBody,
  CartBtn, CartProduct, CartProductImgWrp,
  Quantity
} from '../../shared/Styles/Containers/Cart';
import Container from '../../shared/Styles/Containers/Container';
import Button from '../../shared/Styles/Tags/Button';

interface BagProps {
    cartProducts: ICartProduct[],
    handleUpdateCart: ({}: {id: string, option: 'add' | 'remove'}) => void,
  }

function Bag({ cartProducts, handleUpdateCart }: BagProps) {
  const calculateTotal = () => {
    const total = cartProducts.map((product) => product.productTotal);
    if (total.length) return total?.reduce((prev, next) => prev + next).toFixed(2);
    return 0;
  };

  const caculateQuantity = () => {
    const quantity = cartProducts.map((product) => product.quantity);
    if (quantity.length) return quantity?.reduce((prev, next) => prev + next);
    return 0;
  };
  return (
    <div style={{ marginBottom: '20px' }}>

      {/* main */}
      <Container>
        {/* title */}
        <h2>Cart</h2>

        {/* body */}
        <div>
          {cartProducts.map((product) => (
            <div key={product.id}>
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
                    <button type="button">S</button>
                    <button type="button">M</button>
                  </div>
                </CartBody>

                {/* image */}
                <CartProductImgWrp>
                  {/* quantity btn */}
                  <Quantity>
                    <CartBtn
                      onClick={() => handleUpdateCart({ id: product.id, option: 'add' })}
                      type="button"
                    >
                      +
                    </CartBtn>
                    <p>{product.quantity}</p>

                    <CartBtn
                      onClick={() => handleUpdateCart({ id: product.id, option: 'remove' })}
                      type="button"
                    >
                      -
                    </CartBtn>
                  </Quantity>
                  <img src={product.src} alt="" />
                </CartProductImgWrp>
              </CartProduct>
              <hr style={{ margin: '2rem 0' }} />
            </div>
          ))}
        </div>
        {/* total , tax and quantity */}
        <div>

          <p>
            Qty:
            {' '}
            {caculateQuantity()}
          </p>
          <p style={{ margin: '20px 0' }}>
            Total:
            {' '}
            {calculateTotal()}
          </p>
          <Button bgcolor="#5ECE7B">
            Order
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Bag;
