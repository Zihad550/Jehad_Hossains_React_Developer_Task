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
    products: [],
    productsLoading: true,
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
    }).then((res) => {
      console.log(res);
      this.setState({ products: res.data.category.products, productsLoading: res.loading });
    });
  };

  render() {
    const { category, productsLoading, products } = this.state;
    if (productsLoading) {
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
          products.map((product) => (
            <Product product={product} key={product.id} />
          ))
        }
        </ProductsContainer>

      </Container>
    );
  }
}
