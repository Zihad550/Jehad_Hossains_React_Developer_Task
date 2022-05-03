import React from 'react';
import { useNavigate } from 'react-router-dom';
import WithRouter from '../../../HOC/withRouter';
import CartIcon from '../../shared/CartIcon/CartIcon';
import Card, { CardBody, CardHeader } from '../../shared/Styles/Containers/Card';
import { ProductProps } from './types';


const Product = ({product, handleAddToCart, currency: changedCurrency}: ProductProps) => {
  
  const navigate = useNavigate();
  const handleNavigate = (id: string) => {
    navigate(`/detail/${id}`)
  };

    const {
      name, inStock, prices, gallery, id,
    } = product;

    const productPrice = prices.find((price) => price.currency.symbol === changedCurrency) || {amount: 0, currency: {label: 'Doller', symbol: '$'}};

    const { amount, currency } = productPrice;

    return (
      <Card>
        <CardHeader onClick={() => handleNavigate(id)}>
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
              <CartIcon width="20px" color="white" height="100%" />
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


export default WithRouter(Product);
