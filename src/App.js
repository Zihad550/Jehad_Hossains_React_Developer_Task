import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './Components/Styles/Global.styles';
import SelectedProductsContext from './Contexts/SelectedProductsContext';
import Home from './Pages/Home/Home';
import ProductDetail from './Pages/ProductDetail/ProductDetail';

export default class App extends Component {
  state = {
    currency: '$',
  };

  // handle currency
  handleCurrency = (currency) => {
    this.setState({ currency });
  };

  render() {
    const { currency } = this.state;
    return (
      <SelectedProductsContext.Provider value={{ currency }}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home handleCurrency={this.handleCurrency} currency={currency} />} />
            <Route path="/detail/:id" element={<ProductDetail currency={currency} />} />
          </Routes>
        </BrowserRouter>

      </SelectedProductsContext.Provider>
    );
  }
}
