import { gql } from '@apollo/client';
import React, { Component } from 'react';
import Container from '../../Components/Styles/Containers/Container';
import ProductsContainer from '../../Components/Styles/Containers/ProductsContainer';
import Title from '../../Components/Styles/Tags/Title';
import Toast from '../../Components/Toast';
import { client } from '../../index';
import Header from '../Header/Header';
import Product from '../Product/Product';

export default class Home extends Component {
  state = {
    category: 'all',
    products: [],
    productsLoading: true,
    shouldUpdate: true,
    showToast: false,
  };

  // call get products when component mounts
  componentDidMount() {
    this.getProducts(this.state.category);
  }

  handleToast = () => {
    console.log('inside');
    this.setState({ showToast: false });
  };

  // handle category
  handleCategory = (category) => {
    this.setState({ category });
  };

  // get products by category
  getProducts = (title = 'all') => {
    client.query({
      query: gql`
      {
        category(input: {title: ${JSON.stringify(title)}}){
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
      this.setState({ products: res.data.category.products, productsLoading: res.loading });
    });
  };

  render() {
    const {
      category, productsLoading, products, showToast
    } = this.state;
    const {
      handleCurrency, currency, cartProducts, handleAddToCart
    } = this.props;
    if (productsLoading) {
      return <h2>Page loading</h2>;
    }
    return (
      <>

        {/* header */}
        <Header
          cartProducts={cartProducts}
          handleCategory={this.handleCategory}
          handleCurrency={handleCurrency}
          currency={currency}
          handleAddToCart={handleAddToCart}
        />

        <Container>

          {/* toast */}
          {
            showToast && <Toast message="Product not available" onClick={this.handleToast} variant="" type="button" />
          }

          {/* title */}
          <Title>
            {category}
          </Title>

          {/* main */}
          <ProductsContainer>
            {
          products.map((product) => (
            <Product
              product={product}
              key={product.id}
              handleAddToCart={handleAddToCart}
              currency={currency}
              cartProducts={cartProducts}
            />
          ))
        }
          </ProductsContainer>

        </Container>

      </>

    );
  }
}
