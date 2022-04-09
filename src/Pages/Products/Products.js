import { gql } from '@apollo/client';
import React, { Component } from 'react';
import { client } from '../../index';

class Products extends Component {
  // eslint-disable-next-line react/no-unused-class-component-methods
  state = {
    result: {}
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = () => {
    client.query({
      query: gql`
      {
        categories{
          name
        }
      }
      `
    }).then((result) => {
      this.setState({ result });
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>Products</div>
    );
  }
}

export default Products;
