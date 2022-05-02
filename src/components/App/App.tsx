import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SelectedProductsContext from '../../Contexts/SelectedProductsContext';
import { ICartProduct } from '../../types';
import GlobalStyle from '../shared/Styles/Global.styles';
import Bag from './Bag/Bag';
import Header from './Header/Header';
import Home from './Home/Home';
import ProductDetail from './ProductDetail/ProductDetail';

interface AppStates {
  currency: string,
  cartProducts: ICartProduct[],
  isUpdated: boolean,
  category: string,
}

class App extends Component <{}, AppStates> {
  constructor(props:{}) {
    super(props);
    this.state = {
      currency: '$',
      cartProducts: [],
      isUpdated: false,
      category: 'all',
    };
  }

  shouldComponentUpdate() {
    return this.state.isUpdated;
  }

  // handle currency
  handleCurrency = (currency: string) => {
    this.setState({ currency });
  };

  // handle category
  handleCategory = (category: string) => {
    console.log(category)
    this.setState(() => ({ category }));
  };

  // handle product adding to cart
  handleAddToCart = (product: ICartProduct) => {
    if (!product || !product.inStock) { 
       alert('Product out of stock');
        return;
      }
      const { id} = product;
      const exists = this.state.cartProducts.find(cartProduct => cartProduct.id === product.id);
      
      // if the product exists then its quantity will increase
      if (exists) {
        this.handleUpdateCart({id , option:'add'});
      }
      else {
        this.setState((prevState) => ({
          cartProducts: [...prevState.cartProducts, product],
        }));
        this.setState({ isUpdated: true });
      }
    };

  // handle product update
  handleUpdateCart = ({id, option}: {id: string, option: 'add' | 'remove'}) => {
    // destructure state
    const {cartProducts} = this.state;
    const product = cartProducts.find((cartProduct) => cartProduct.id === id);
    // increase product price and quantity
    
    if(product && option === 'add'){
      // update quantity
      product.quantity += 1;
      product.productTotal += product.amount;
      // add the updated product to the state
      const existingProducts = cartProducts.filter(product => product.id !== id);
      this.setState({cartProducts: [...existingProducts, product]})
    }
    if(product && option === 'remove'){
      // update quantity
      product.quantity -= 1;
      product.productTotal -= product.amount;
      // add the updated product to the state
      const existingProducts = cartProducts.filter(product => product.id !== id);
      
      if(!product.quantity) this.setState({cartProducts: [...existingProducts]})
      if(product.quantity) this.setState({cartProducts: [...existingProducts, product]})
    }
    else{
      return;
    }
  };

  render() {
    const {
      currency, cartProducts, category
    } = this.state;
    return (
      <SelectedProductsContext.Provider value={this.state}>
        <GlobalStyle />
        <BrowserRouter>
          {/* header */}
          <Header
            cartProducts={cartProducts}
            handleCategory={this.handleCategory}
            handleCurrency={this.handleCurrency}
            currency={currency}
            handleAddToCart={this.handleAddToCart}
            handleUpdateCart={this.handleUpdateCart}
          />
          <Routes>

            {/* home */}
            <Route
              path="/"
              element={(
                <Home
                  category={category}
                  currency={currency}
                  handleAddToCart={this.handleAddToCart}
                  cartProducts={cartProducts}
                />
              )}
            />
            <Route
              path="/:category"
              element={(
                <Home
                  category={category}
                  currency={currency}
                  handleAddToCart={this.handleAddToCart}
                  cartProducts={cartProducts}
                />
              )}
            />

            {/* detail */}
            <Route path="/detail/:id" element={<ProductDetail handleAddToCart={this.handleAddToCart} currency={currency} />} />

            {/* bag */}
            <Route path="/bag" element={<Bag 
            cartProducts={cartProducts}
             handleAddToCart={this.handleAddToCart}
             handleUpdateCart={this.handleUpdateCart} />} />

          </Routes>
        </BrowserRouter>

      </SelectedProductsContext.Provider>
    );
  }
}

export default App