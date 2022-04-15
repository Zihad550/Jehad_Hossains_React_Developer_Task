import { gql } from "@apollo/client";
import React, { Component } from "react";
import { useParams } from "react-router-dom";
import Container from "../../Components/Styles/Containers/Container";
import DetailContainer, {
  DetailImgs,
  Details,
} from "../../Components/Styles/Containers/Detail";
import { client } from "../../index";

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

  render() {
    const { product, isLoading } = this.state;
    console.log(isLoading);
    const { name } = product;

    if (isLoading) {
      return <h2>Product Loading</h2>;
    }
    return (
      <Container>
        <DetailContainer>
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
          <Details>
            <h4>{name}</h4>
          </Details>
        </DetailContainer>
      </Container>
    );
  }
}

export default withParams(ProductDetail);
