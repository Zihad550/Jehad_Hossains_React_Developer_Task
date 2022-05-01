import {
  ApolloClient, InMemoryCache
} from '@apollo/client';
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SelectedProductsContext from '../../Contexts/SelectedProductsContext';
import GlobalStyle from '../shared/Styles/Global.styles';
import Bag from './Bag/Bag';
import Home from './Home/Home';
import ProductDetail from './ProductDetail/ProductDetail';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: '$',
      cartProducts: [],
      isUpdated: false,
    };
  }

  shouldComponentUpdate() {
    return this.state.isUpdated;
  }

  // handle currency
  handleCurrency = (currency) => {
    this.setState({ currency });
  };

  // handle product adding to cart
  handleAddToCart = (product) => {
    this.setState({ isUpdated: false });
    const { cartProducts } = this.state;
    const {
      id, option,
    } = product;

    const exists = cartProducts.find((product) => product.id === id);

    // if the product exists then its quantity will increase
    if (exists !== undefined && !option) {
      exists.quantity += 1;
      exists.productTotal += exists.amount;
      this.setState({ isUpdated: true });
    // decrease the product quantity
    } else if (option === 'decrease') {
      this.handleRemoveFromCart(exists, id);
    } else {
      this.setState((prevState) => ({
        cartProducts: [...prevState.cartProducts, product],

      }));
      this.setState({ isUpdated: true });
    }
  };

  // handle remove from cart
  handleRemoveFromCart = (exists, id) => {
    const { cartProducts } = this.state;

    if (exists.quantity === 1) {
      const existingProducts = cartProducts.filter((product) => product.id !== id);
      this.setState(() => (
        { cartProducts: [...existingProducts] }
      ));
      this.setState({ isUpdated: true });
    } else {
      exists.quantity -= 1;
      exists.productTotal -= exists.amount;
      this.setState({ isUpdated: true });
    }
  };

  render() {
    const { currency, cartProducts } = this.state;
    return (
      <SelectedProductsContext.Provider value={this.state}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>

            {/* home */}
            <Route path="/" element={<Home handleCurrency={this.handleCurrency} currency={currency} handleAddToCart={this.handleAddToCart} cartProducts={cartProducts} />} />

            {/* detail */}
            <Route path="/detail/:id" element={<ProductDetail currency={currency} />} />

            {/* bag */}
            <Route path="/bag" element={<Bag cartProducts={cartProducts} handleAddToCart={this.handleAddToCart} currency={currency} />} />

          </Routes>
        </BrowserRouter>

      </SelectedProductsContext.Provider>
    );
  }
}
