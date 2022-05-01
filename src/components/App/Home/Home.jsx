import { gql } from '@apollo/client';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Spinner from '../../shared/Spinner/Spinner';
import Container from '../../shared/Styles/Containers/Container';
import ProductsContainer from '../../shared/Styles/Containers/ProductsContainer';
import Title from '../../shared/Styles/Tags/Title';
import Toast from '../../shared/Toast/Toast';
import { client } from '../App';
import Header from '../Header/Header';
import Product from '../Product/Product';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'all',
      products: [],
      productsLoading: true,
      // shouldUpdate: true,
      showToast: false,
    };
  }

  // call get products when component mounts
  componentDidMount() {
    const { category } = this.state;
    this.getProducts(category);
  }

  handleToast = () => {
    this.setState({ showToast: false });
  };

  // handle category
  handleCategory = (category) => {
    this.setState({ category });
  };

  // get products by category
  getProducts = (title = 'all') => {
    client.query({
      query: gql`
      {
        category(input: {title: ${JSON.stringify(title)}}){
          products{
            id
            name
            inStock
            prices{
              amount
              currency{
                symbol
                label
              }
            }
            gallery
          }
        }
      }
      `,
    }).then((res) => {
      this.setState({ products: res.data.category.products, productsLoading: res.loading });
    });
  };

  render() {
    const {
      category, productsLoading, products, showToast,
    } = this.state;
    const {
      handleCurrency, currency, cartProducts, handleAddToCart,
    } = this.props;

    // when product loading
    if (productsLoading) {
      return <Spinner />;
    }
    return (
      <>

        {/* header */}
        <Header
          cartProducts={cartProducts}
          handleCategory={this.handleCategory}
          handleCurrency={handleCurrency}
          currency={currency}
          handleAddToCart={handleAddToCart}
        />

        <Container>

          {/* toast */}
          {
            showToast && <Toast message="Product not available" onClick={this.handleToast} variant="" type="button" />
          }

          {/* title */}
          <Title>
            {category}
          </Title>

          {/* main */}
          <ProductsContainer>
            {
          products.map((product) => (
            <Product
              product={product}
              key={product.id}
              handleAddToCart={handleAddToCart}
              currency={currency}
              cartProducts={cartProducts}
            />
          ))
        }
          </ProductsContainer>

        </Container>

      </>

    );
  }
}

Home.propTypes = {
  handleCurrency: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  cartProducts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  handleAddToCart: PropTypes.func.isRequired,

};

export default Home;
