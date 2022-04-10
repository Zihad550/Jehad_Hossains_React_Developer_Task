import { gql } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/logo.svg';
import Cart from '../../Components/Cart';
import HeaderContainer, { Currency, Features } from '../../Components/Styles/Containers/HeaderContainer';
import Anchor from '../../Components/Styles/Tags/Anchor';
import { client } from '../../index';

class Header extends React.Component {
  state = {
    currencies: [],
    loading: true,
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

  render() {
    const { handleCategory } = this.props;
    const { currencies, loading } = this.state;
    console.log(currencies);
    if (loading) {
      return <h2>Data loading</h2>;
    }
    return (
      <HeaderContainer>
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
          <Currency>
            {/* &#x24; */}
            {currencies[0].symbol}
            <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 0.5L4 3.5L7 0.5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

          </Currency>
          {/* shopping cart */}
          <p>
            <Cart color="black" width="20px" />
          </p>
        </Features>

      </HeaderContainer>
    );
  }
}

export default Header;
