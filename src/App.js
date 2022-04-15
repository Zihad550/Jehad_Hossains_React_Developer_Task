import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './Components/Styles/Global.styles';
import Home from './Pages/Home/Home';
import ProductDetail from './Pages/ProductDetail/ProductDetail';

export default class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<ProductDetail />} />
          </Routes>
        </BrowserRouter>

      </>
    );
  }
}
