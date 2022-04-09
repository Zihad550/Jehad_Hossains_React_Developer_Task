import { gql } from '@apollo/client';
import React, { Component } from 'react';
import Container from '../../Components/Container';
import { client } from '../../index';
import Header from '../Header/Header';
import Product from '../Product/Product';

/*
 {
        category(input: {title: ${this.state.category}}){
          products{
            id
            name
            inStock
            prices{
              amount
              currency{
                symbol
                label
              }
            }
            gallery
          }
        }
      }

*/

export default class Home extends Component {
  state = {
    category: 'all',
    result: {}
  };

  // call get products when component mounts
  componentDidMount() {
    this.getProducts();
  }

  // handle category
  handleCategory = (category) => {
    this.setState({ category });
  };

  // get products by category
  getProducts = () => {
    client.query({
      query: gql`
      {
        category(input: {title: ${JSON.stringify(this.state.category)}}){
          products{
            id
            name
            inStock
            prices{
              amount
              currency{
                symbol
                label
              }
            }
            gallery
          }
        }
      }
      `
    }).then((result) => {
      console.log(result);
      this.setState({ result });
    });
  };

  render() {
    const { data, error, loading } = this.state.result;
    console.log(this.state.category);
    console.log(data, error, loading);
    if (loading) {
      return <h2>Page loading</h2>;
    }
    return (
      <Container>
        {/* header */}
        <Header handleCategory={this.handleCategory} />
        {/* main */}
        {
          data.map((product) => (
            <Product product={product} key={product.id} />
          ))
        }

      </Container>
    );
  }
}
