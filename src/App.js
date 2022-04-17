import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './Components/Styles/Global.styles';
import SelectedProductsContext from './Contexts/SelectedProductsContext';
import Bag from './Pages/Bag/Bag';
import Home from './Pages/Home/Home';
import ProductDetail from './Pages/ProductDetail/ProductDetail';

export default class App extends Component {
  state = {
    currency: '$',
    cartProducts: [],
    shouldUpdate: false,
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
      exists.productTotal -= exists.amount;
      this.setState({ shouldUpdate: false });
    }
  };

  render() {
    const { currency, cartProducts } = this.state;
    return (
      <SelectedProductsContext.Provider value={{ currency }}>
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
