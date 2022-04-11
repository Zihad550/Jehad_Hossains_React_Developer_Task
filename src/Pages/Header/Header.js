import { gql } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/logo.svg';
import Cart from '../../Components/CartIcon';
import HeaderContainer, { Features } from '../../Components/Styles/Containers/HeaderContainer';
import Anchor from '../../Components/Styles/Tags/Anchor';
import Select from '../../Components/Styles/Tags/Select';
import { client } from '../../index';
import ShoppingCart from '../ShoppingCart/ShoppingCart';

class Header extends React.Component {
  state = {
    currencies: [],
    loading: true,
    showCart: false,
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

  render() {
    // destructured props
    const { handleCategory, handleCurrency, cartProducts } = this.props;
    // destructured states
    const { currencies, loading, showCart } = this.state;
    if (loading) {
      return <h2>Data loading</h2>;
    }
    return (
      <>
        <HeaderContainer>
          <div>
            {/* navs */}
            <nav>
              {
              this.navs.map((nav) => (
                <Anchor onClick={() => handleCategory(nav.name)} as={Link} key={nav.id} to={nav.link}>
                  {nav.name}
                </Anchor>
              ))
          }
            </nav>
            {/* logo */}
            <div>
              <img src={logo} alt="" />
            </div>

            {/* features */}
            <Features>
              {/* currency */}
              <Select onChange={(e) => handleCurrency(e.target.value)}>
                {
                currencies.map((currency) => (
                  <option key={currency.label} value={currency.label}>{currency.symbol}</option>
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
              showCart && <ShoppingCart cartProducts={cartProducts} />
            }
      </>
    );
  }
}

export default Header;
