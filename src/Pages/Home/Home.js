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

  // handle add to cart
  /* handleAddToCart = (product) => {
    this.setState((prevState) => ({
      cartProducts: [...prevState.cartProducts, product]
    }));
  }; */

  // handle product adding to cart
  handleAddToCart = (id, name, gallery, amount, currency) => {
    const exists = this.state.cartProducts.find((product) => product.id === id);
    if (exists !== undefined) {
      exists.quantity += 1;
    } else {
      const newProduct = {
        name, src: gallery[0], amount, currency, quantity: 1, id
      };
      this.setState((prevState) => ({
        cartProducts: [...prevState.cartProducts, newProduct]
      }));
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
