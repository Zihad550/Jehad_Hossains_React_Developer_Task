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
  category: string,
}

class App extends Component <{}, AppStates> {
  constructor(props:{}) {
    super(props);
    this.state = {
      currency: '$',
      cartProducts: [],
      category: 'all',
    };
  }


  // handle currency
  handleCurrency = (currency: string) => {
    this.setState({ currency });
  };

  // handle category
  handleCategory = (category: string) => {
    this.setState(() => ({ category }));
  };

  // handle product adding to cart
  handleAddToCart = (product: ICartProduct) => {
    if (!product || !product.inStock) { 
       alert('Product out of stock');
        return;
      }
      const {id} = product;
      const {cartProducts} = this.state;
      const existingProduct = cartProducts.find(product => product.id === id);
      // if product exists then update the product
      if (existingProduct) {
        this.handleUpdateCart({id , option:'add'});
      }
      else {
        this.setState((prevState) => ({
          cartProducts: [...prevState.cartProducts, product],
        }));
        
      }
    };

  // handle product update
  handleUpdateCart = ({id, option}: {id: string, option: 'add' | 'remove'}) => {
    // destructure state
    const { cartProducts } = this.state;

    let existingProduct;
    for(let i = 0; i < cartProducts.length ; i++){
      if(cartProducts[i].id === id){
        existingProduct = {...cartProducts[i], position: i};
      }
    }
    
    const product = existingProduct;
    
    if(product && option === 'add'){
      // update quantity
      product.quantity += 1;
      product.productTotal += product.amount;
      // add the updated product to the state
      const existingProducts = cartProducts.filter(product => product.id !== id);
      existingProducts.splice(product.position, 0, product)
      this.setState({cartProducts: existingProducts})
    }
    if(product && option === 'remove'){
      // update quantity & amount
      product.quantity -= 1;
      product.productTotal -= product.amount;

      // filter the existing products
      const existingProducts = cartProducts.filter(product => product.id !== id);
      // if product quantity is > 0 then update the product
      if(product.quantity){
        existingProducts.splice(product.position, 0, product);
        this.setState({cartProducts: existingProducts});
      }
      // if product quantity is === 0 then remove it 
      else{
        this.setState({cartProducts: existingProducts});
      }
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
             handleUpdateCart={this.handleUpdateCart} />} />

          </Routes>
        </BrowserRouter>
      </SelectedProductsContext.Provider>
    );
  }
}

export default App