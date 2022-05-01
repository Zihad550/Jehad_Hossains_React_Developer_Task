import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SelectedProductsContext from '../../Contexts/SelectedProductsContext';
import GlobalStyle from '../shared/Styles/Global.styles';
import Bag from './Bag/Bag';
import Home from './Home/Home';
import ProductDetail from './ProductDetail/ProductDetail';

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
    if (product.inStock || product.inStock === undefined) {
      this.setState({ isUpdated: false });
      const { cartProducts } = this.state;
      const {
        id, option,
      } = product;
      const exists = cartProducts.find((cartProduct) => cartProduct.id === id);
      // if the product exists then its quantity will increase
      if (exists !== undefined && !option) {
        this.handleUpdateCart(exists);
        // decrease the product quantity
      } else if (option === 'decrease') {
        this.handleRemoveFromCart(exists, id);
      } else {
        this.setState((prevState) => ({
          cartProducts: [...prevState.cartProducts, product],
        }));
        this.setState({ isUpdated: true });
      }
    } else {
      alert('Product out of stock');
    }
  };

  // update products in cart
  handleUpdateCart = (exists) => {
    exists.quantity += 1;
    exists.productTotal += exists.amount;
    this.setState({ isUpdated: true });
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
