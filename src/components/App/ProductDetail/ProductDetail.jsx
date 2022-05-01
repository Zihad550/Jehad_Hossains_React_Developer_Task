import { gql } from '@apollo/client';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import client from '../../../services/ApolloClient';
import Spinner from '../../shared/Spinner/Spinner';
import Container from '../../shared/Styles/Containers/Container';
import DetailContainer, {
  AddBtn,
  Attribute,
  AttributeBtn, Desc,
  DetailImgs,
  Details,
  Price
} from '../../shared/Styles/Containers/Detail';

function withParams(Element) {
  return function (props) {
    return <Element {...props} params={useParams()} />;
  };
}

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    const { params } = this.props;

    this.getProduct(params.id);
  }

  getProduct = (id = 'apple-imac-2021') => {
    client
      .query({
        query: gql`
        {
          product(id: ${JSON.stringify(id)}){
            id
            name
            gallery
            brand
            inStock
            description
            category
            brand
            attributes{
              id
              name
              type
              items{
                displayValue
                value
                id
              }
            }
            prices{
              currency{
                label
                symbol
              }
              amount
            }
          }
        }
        `,
      })
      .then((res) => {
        this.setState({
          product: res.data.product,
          isLoading: res.loading,
        });
      });
  };

  render() {
    const { product, isLoading } = this.state;
    const {
      name, attributes, description, brand, id, gallery, prices, inStock
    } = product;
    const { currency, handleAddToCart } = this.props;
    console.log(attributes);

    // when product loading
    if (isLoading) {
      return <Spinner />;
    }

    const productPrice = prices.find(
      (price) => price.currency.symbol === currency
    );
    const { amount } = productPrice;
    return (
      <Container>
        <DetailContainer>
          {/* product images */}
          <DetailImgs>
            <div>
              {product.gallery.map((img) => (
                <img src={img} key={Math.random() * 1010} alt="product" />
              ))}
            </div>
            <div>
              <img src={product.gallery[0]} alt="" />
            </div>
          </DetailImgs>

          {/* product details */}
          <Details>
            {/* product name & brand */}
            <div>
              <h3>{brand}</h3>
              <h4>{name}</h4>
            </div>

            {/* product size */}
            <div>

              {
                  attributes?.map((attribute) => (
                    <Attribute key={attribute.id}>
                      <h5>{attribute.name}</h5>
                      <p>
                        {attribute.items.map((item) => (
                          <AttributeBtn
                            key={item.id}
                            bgcolor={item.value}
                          >
                            {item.displayValue}
                          </AttributeBtn>
                        ))}
                      </p>
                    </Attribute>
                  ))
                }

            </div>

            {/* product price */}
            <Price>
              <p>Price:</p>
              <p style={{ margin: '15px 0' }}>
                <span>
                  {currency}
                </span>
                {amount}
              </p>
            </Price>
            {/* add to cart btn */}
            <AddBtn
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
              Add To Cart
            </AddBtn>

            {/* product desc */}
            <Desc dangerouslySetInnerHTML={{ __html: description }} />

            {/* add to cart btn */}

            {/* desc */}
          </Details>
        </DetailContainer>
      </Container>
    );
  }
}

ProductDetail.propTypes = {
  currency: PropTypes.string.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};

export default withParams(ProductDetail);
