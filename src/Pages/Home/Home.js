import { gql } from '@apollo/client';
import React, { Component } from 'react';
import Container from '../../Components/Styles/Containers/Container';
import ProductsContainer from '../../Components/Styles/Containers/ProductsContainer';
import Title from '../../Components/Styles/Tags/Title';
import Toast from '../../Components/Toast';
import SelectedProductsContext from '../../Contexts/SelectedProductsContext';
import { client } from '../../index';
import Header from '../Header/Header';
import Product from '../Product/Product';

export default class Home extends Component {
  state = {
    category: 'all',
    products: [],
    productsLoading: true,
    currency: '$',
    cartProducts: [],
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

  // handle currency
  handleCurrency = (currency) => {
    this.setState({ currency });
  };

  // handle product adding to cart
  handleAddToCart = (product) => {
    const {
      id, option, inStock
    } = product;

    this.setState({ showToast: false });

    if (!inStock) {
      this.setState({ showToast: true });
    }

    const exists = this.state.cartProducts.find((product) => product.id === id);

    // if the product exists then its quantity will increase
    if (exists !== undefined && !option) {
      exists.quantity += 1;
      exists.productTotal += exists.amount;
      this.setState({ shouldUpdate: false });

    // decrease the product quantity
    } else if (option === 'decrease') {
      this.handleRemoveFromCart(exists, id);
    } else {
      this.setState((prevState) => ({
        cartProducts: [...prevState.cartProducts, product]
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
      exists.productTotal += exists.amount;
      this.setState({ shouldUpdate: false });
    }
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
      category, productsLoading, products, currency, cartProducts, showToast
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
