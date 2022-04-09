import React, { Component } from 'react';
import GlobalStyle from './Components/Styles/Global.styles';
import Products from './Pages/Products/Products';

export default class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <Products />
      </>
    );
  }
}
