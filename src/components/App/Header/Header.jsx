import { gql } from '@apollo/client';
import PropTypes from 'prop-types';
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import logo from '../../../assets/logo/logo.svg';
import client from '../../../services/ApolloClient';
import Cart from '../../shared/CartIcon/CartIcon';
import Spinner from '../../shared/Spinner/Spinner';
import HeaderContainer, {
  Bag,
  Features,
  Nav,
  NavBtn
} from '../../shared/Styles/Containers/HeaderContainer';
import Select from '../../shared/Styles/Tags/Select';
import ShoppingCart from '../ShoppingCart/ShoppingCart';

class Header extends React.Component {
  navs = [
    { id: 1, name: 'all', link: '/', },
    { id: 2, name: 'clothes', link: '/', },
    { id: 3, name: 'tech', link: '/', },
  ];

  constructor(props,) {
    super(props,);
    this.state = {
      currencies: [],
      loading: true,
      showCart: false,
      navigate: false,
    };
  }

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
      `,
    },).then((res,) => {
      this.setState({ currencies: res.data.currencies, loading: res.loading, },);
    },);
  };

  handleShowCart = () => {
    this.setState((state,) => ({
      showCart: !state.showCart,
    }),);
  };

  handleAddToCategory = (name,) => {
    this.setState({ navigate: true, },);
    const { handleCategory, } = this.props;
    handleCategory(name,);
  };

  render() {
    // destructured props
    const {
      handleCurrency, cartProducts, currency, handleAddToCart,
    } = this.props;
    // destructured states
    const {
      currencies, loading, showCart, navigate,
    } = this.state;
    if (loading) {
      return <Spinner />;
    }
    return (
      <>
        {
           navigate && <Navigate to="/" />
        }
        <HeaderContainer>
          <div>
            {/* navs */}
            <Nav>
              {
              this.navs.map((nav,) => (
                <NavBtn
                  onClick={() => this.handleAddToCategory(nav.name,)}
                  type="button"
                >
                  {nav.name}
                </NavBtn>
              ),)
          }
            </Nav>
            {/* logo */}
            <Bag as={Link} to="/bag">
              <img src={logo} alt="" />
            </Bag>

            {/* features */}
            <Features>
              {/* currency */}
              <Select onChange={(e,) => handleCurrency(e.target.value,)}>
                {
                currencies.map((productCurrency,) => (
                  <option
                    key={productCurrency.symbol}
                    value={productCurrency.symbol}
                  >
                    {productCurrency.symbol}
                  </option>
                ),)
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
          showCart
           && (
           <ShoppingCart
             handleAddToCart={handleAddToCart}
             cartProducts={cartProducts}
             currency={currency}
           />
           )
        }
      </>
    );
  }
}

Header.propTypes = {
  handleCategory: PropTypes.func.isRequired,
  handleCurrency: PropTypes.func.isRequired,
  cartProducts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    inStock: PropTypes.bool,
    prices: PropTypes.array,
    gallery: PropTypes.array,
    id: PropTypes.string,
  })).isRequired,
  currency: PropTypes.string.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};

export default Header;
