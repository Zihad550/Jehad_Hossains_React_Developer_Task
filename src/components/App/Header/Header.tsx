import { gql } from '@apollo/client';
import React, { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo/logo.svg';
import WithRouter from '../../../HOC/withRouter';
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
import ShoppingCart from './ShoppingCart/ShoppingCart';
import { HeaderProps, HeaderStates } from './types';


class Header extends React.Component <HeaderProps, HeaderStates> {
  navs = [
    { id: 1, name: 'all', link: '/', },
    { id: 2, name: 'clothes', link: '/', },
    { id: 3, name: 'tech', link: '/', },
  ];

  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      currencies: [],
      loading: true,
      showCart: false,
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
      this.setState({ currencies: res.data.currencies, loading: res.loading });
    },);
  };

  handleShowCart = () => {
    this.setState((state,) => ({
      showCart: !state.showCart,
    }),);
  };

  handleAddToCategory = (name: string) => {
    this.props.navigate(`/${name}`);
  };

  render() {
    // destructured props
    const {
      handleCurrency,
      cartProducts,
      currency,
      handleUpdateCart
    } = this.props;

    // destructured states
    const {
      currencies,
      loading,
      showCart,
    } = this.state;

    if (loading) {
      return <Spinner />;
    }

    return (
      <>
        <HeaderContainer>
          <div>
            {/* navs */}
            <Nav>
              {
              this.navs.map((nav) => (
                <NavBtn
                  key={nav.id}
                  onClick={() => this.handleAddToCategory(nav.name)}
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
              <Select onChange={(e: ChangeEvent<HTMLFormElement>) => handleCurrency(e.target.value)}>
                {
                currencies.map((productCurrency) => (
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
                  <Cart color="black" width="20px" height="auto" />
                </button>
              </div>
            </Features>
          </div>

        </HeaderContainer>
        {
          showCart
           && (
           <ShoppingCart
             cartProducts={cartProducts}
             currency={currency}
             handleUpdateCart={handleUpdateCart}
           />
           )
        }
      </>
    );
  }
}


export default WithRouter(Header);
