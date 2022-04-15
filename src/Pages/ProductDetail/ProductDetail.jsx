import { gql } from "@apollo/client";
import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../index";

function withParams(Component) {
  return function (props) {
    return <Component {...props} params={useParams()} />;
  };
}

class ProductDetail extends Component {
  state = {
    product: {},
    isLoading: false,
  };

  componentDidMount() {
    const { id } = this.props.params;
    this.getProduct(id);
  }

  getProduct = (id) => {
    client
      .query({
        query: gql`
          {
            product(id:${id}) {
              name
              gallery
              brand
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
    return <div>{product.name}</div>;
  }
}

export default withParams(ProductDetail);
