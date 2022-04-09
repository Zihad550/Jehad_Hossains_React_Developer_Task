import { gql } from '@apollo/client';
import React, { Component } from 'react';
import Container from '../../Components/Styles/Containers/Container';
import ProductsContainer from '../../Components/Styles/Containers/ProductsContainer';
import Title from '../../Components/Styles/Tags/Title';
import { client } from '../../index';
import Header from '../Header/Header';
import Product from '../Product/Product';

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
      this.setState({ result });
    });
  };

  render() {
    const { data, error, loading } = this.state.result;
    const { category } = this.state;
    if (loading) {
      return <h2>Page loading</h2>;
    }
    return (
      <Container>
        {/* header */}
        <Header handleCategory={this.handleCategory} />

        {/* title */}
        <Title>
          {category}
        </Title>

        {/* main */}
        <ProductsContainer>
          {
          data?.category.products.map((product) => (
            <Product product={product} key={product.id} />
          ))
        }
        </ProductsContainer>

      </Container>
    );
  }
}
