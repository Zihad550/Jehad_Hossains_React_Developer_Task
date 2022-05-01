import { gql } from '@apollo/client';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
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
import { client } from '../App';
import Header from '../Header/Header';

function withParams(Component) {
  return function (props) {
    return <Component {...props} params={useParams()} />;
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
      name, attributes, description, brand
    } = product;
    const { currency } = this.props;

    // when product loading
    if (isLoading) {
      return <Spinner />;
    }
    console.log(attributes);

    const productPrice = product.prices.find(
      (price) => price.currency.symbol === currency
    );

    return (
      <>
        <Header />
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
                    <Attribute>
                      <h5>{attribute.name}</h5>
                      <p>
                        {attribute.items.map((item) => (
                          <AttributeBtn
                            bgColor={item.value}
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
                <p>
                  <span>
                    {productPrice.currency.symbol}
                  </span>
                  {productPrice.amount}
                </p>
              </Price>
              {/* add to cart btn */}
              <AddBtn type="button">Add To Cart</AddBtn>

              {/* product desc */}
              <Desc dangerouslySetInnerHTML={{ __html: description }} />

              {/* add to cart btn */}

              {/* desc */}
            </Details>
          </DetailContainer>
        </Container>

      </>
    );
  }
}

ProductDetail.propTypes = {
  currency: PropTypes.string.isRequired,
  params: PropTypes.any.isRequired
};

export default withParams(ProductDetail);
