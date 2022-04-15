import { gql } from '@apollo/client';
import React, { Component } from 'react';
import Container from '../../Components/Styles/Containers/Container';
import ProductsContainer from '../../Components/Styles/Containers/ProductsContainer';
import Title from '../../Components/Styles/Tags/Title';
import SelectedProductsContext from '../../Contexts/SelectedProductsContext';
import { client } from '../../index';
import Header from '../Header/Header';
import Product from '../Product/Product';

export default class Home extends Component {
  state = {
    category: 'all',
    products: [],
    productsLoading: true,
    currency: 'USD',
    cartProducts: [],
    shouldUpdate: true
  };

  // call get products when component mounts
  componentDidMount() {
    this.getProducts();
  }

  // handle category
  handleCategory = (category) => {
    this.setState({ category });
  };

  // handle currency
  handleCurrency = (currency) => {
    this.setState({ currency });
  };

  // handle product adding to cart
  handleAddToCart = (product) => {
    const {
      id, name, gallery, amount, currency, option
    } = product;
    console.log(option);
    const exists = this.state.cartProducts.find((product) => product.id === id);
    if (exists !== undefined && !option) {
      exists.quantity += 1;
      this.setState({ shouldUpdate: false });
    } else if (option === 'decrease') {
      this.handleRemoveFromCart(exists, id);
    } else {
      const newProduct = {
        name, src: gallery[0], amount, currency, quantity: 1, id
      };
      this.setState((prevState) => ({
        cartProducts: [...prevState.cartProducts, newProduct]
      }));
    }
  };

  // handle remove from cart
  handleRemoveFromCart = (exists, id) => {
    if (exists.quantity === 1) {
      const existingProducts = this.state.cartProducts.filter((product) => product.id !== id);
      this.setState((prevState) => (
        { cartProducts: [...existingProducts] }
      ));
    } else {
      exists.quantity -= 1;
      this.setState({ shouldUpdate: false });
    }
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
      this.setState({ products: res.data.category.products, productsLoading: res.loading });
    });
  };

  render() {
    const {
      category, productsLoading, products, currency, cartProducts
    } = this.state;
    if (productsLoading) {
      return <h2>Page loading</h2>;
    }
    return (
      <SelectedProductsContext.Provider value={{ cartProducts, handleAddToCart: this.handleAddToCart }}>

        {/* header */}
        <Header
          cartProducts={cartProducts}
          handleCategory={this.handleCategory}
          handleCurrency={this.handleCurrency}
          currency={currency}
          handleAddToCart={this.handleAddToCart}
        />

        <Container>

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
              handleAddToCart={this.handleAddToCart}
              currency={currency}
              cartProducts={cartProducts}
            />
          ))
        }
          </ProductsContainer>

        </Container>

      </SelectedProductsContext.Provider>
    );
  }
}
