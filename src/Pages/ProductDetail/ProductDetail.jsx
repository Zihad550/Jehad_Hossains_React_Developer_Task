import { gql } from "@apollo/client";
import React, { Component } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../Components/Spinner";
import Container from "../../Components/Styles/Containers/Container";
import DetailContainer, {
  AddBtn,
  Desc,
  DetailImgs,
  Details,
  Price,
  Size
} from "../../Components/Styles/Containers/Detail";
import { client } from "../../index";
import Header from "../Header/Header";

function withParams(Component) {
  return function (props) {
    return <Component {...props} params={useParams()} />;
  };
}

class ProductDetail extends Component {
  state = {
    product: {},
    isLoading: true,
  };

  componentDidMount() {
    const { id } = this.props.params;
    this.getProduct(id);
  }

  getProduct = (id = "apple-imac-2021") => {
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
        console.log(res.loading);
        this.setState({
          product: res.data.product,
          isLoading: res.loading,
        });
      });
  };

  // get all the attributes and return each attribute as object
  // eslint-disable-next-line react/no-unused-class-component-methods
  /* printAttribute = (attributes) => {
    if (attributes.length) {
      return null;
    }

    for(let i = 0; i < attributes.length; i++){
      const newAttribute = attribute.map((att) => ({ items: att.items, name: att.name, id: att.id }));
    }

    const attribute = attributes.map((att) => ({ items: att.items, name: att.name }));
    return attribute;
  }; */

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

    const price = product.prices.find(
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
              <Size>

                <p>Size</p>
                {/* {attributes[0].items.map((attribute) => (
                  <SizeBtn type="button" key={attribute.id}>
                    {attribute.value}
                  </SizeBtn>
                ))} */}

                {/* {
                  attributes.map((attribute) => (
                    <p>{attribute.name}</p>
                  ))
                }
                {
                  attributes.map((attribute) => (
                    <p>{attribute.name}</p>
                  ))
                } */}

              </Size>

              {/* product price */}
              <Price>
                <p>Price:</p>
                <p>
                  <span>
                    {price.currency.symbol}
                  </span>
                  {price.amount}
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

export default withParams(ProductDetail);
