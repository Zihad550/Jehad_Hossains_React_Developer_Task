import { gql } from '@apollo/client';
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import logo from '../../assets/logo/logo.svg';
import Cart from '../../Components/CartIcon';
import Spinner from '../../Components/Spinner';
import HeaderContainer, {
  Bag, Features, Nav, NavBtn
} from '../../Components/Styles/Containers/HeaderContainer';
import Select from '../../Components/Styles/Tags/Select';
import { client } from '../../index';
import ShoppingCart from '../ShoppingCart/ShoppingCart';

class Header extends React.Component {
  state = {
    currencies: [],
    loading: true,
    showCart: false,
    navigate: false,
  };

  navs = [
    { id: 1, name: 'all', link: '/' },
    { id: 2, name: 'clothes', link: '/' },
    { id: 3, name: 'tech', link: '/' }
  ];

  componentDidMount() {
    this.getCurrencies();
  }

  getCurrencies = () => {
    client.query({
      query: gql`
      {
        currencies{
          label
          symbol
        }
      }
      `
    }).then((res) => {
      this.setState({ currencies: res.data.currencies, loading: res.loading });
    });
  };

  handleShowCart = () => {
    this.setState((state) => ({
      showCart: !state.showCart
    }));
  };

  handleAddToCategory = (name) => {
    this.setState({ navigate: true });
    this.props.handleCategory(name);
  };

  render() {
    // destructured props
    const {
      handleCategory, handleCurrency, cartProducts, currency, handleAddToCart
    } = this.props;
    // destructured states
    const { currencies, loading, showCart } = this.state;
    if (loading) {
      return <Spinner />;
    }
    return (
      <>
        {
        this.state.navigate && <Navigate to="/" />
      }
        <HeaderContainer>
          <div>
            {/* navs */}
            <Nav>
              {
              this.navs.map((nav) => (
                <NavBtn
                  onClick={() => this.handleAddToCategory(nav.name)}
                  type="button"
                >
                  {nav.name}
                </NavBtn>
              ))
          }
            </Nav>
            {/* logo */}
            <Bag as={Link} to="/bag">
              <img src={logo} alt="" />
            </Bag>

            {/* features */}
            <Features>
              {/* currency */}
              <Select onChange={(e) => handleCurrency(e.target.value)}>
                {
                currencies.map((currency) => (
                  <option key={currency.symbol} value={currency.symbol}>{currency.symbol}</option>
                ))
              }
              </Select>

              {/* shopping cart */}
              <div>
                <button type="button" onClick={this.handleShowCart}>
                  <Cart color="black" width="20px" />
                </button>
              </div>
            </Features>
          </div>

        </HeaderContainer>
        {
              showCart && <ShoppingCart handleAddToCart={handleAddToCart} cartProducts={cartProducts} currency={currency} />
        }
      </>
    );
  }
}

export default Header;
