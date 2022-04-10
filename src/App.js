import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './Components/Styles/Global.styles';
import Cart from './Pages/Cart/Cart';
import Home from './Pages/Home/Home';

export default class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>

      </>
    );
  }
}
