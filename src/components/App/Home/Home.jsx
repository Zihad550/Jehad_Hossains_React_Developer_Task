import { gql } from '@apollo/client';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import client from '../../../services/ApolloClient';
import Spinner from '../../shared/Spinner/Spinner';
import Container from '../../shared/Styles/Containers/Container';
import ProductsContainer from '../../shared/Styles/Containers/ProductsContainer';
import Title from '../../shared/Styles/Tags/Title';
import Toast from '../../shared/Toast/Toast';
import Product from '../Product/Product';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      productsLoading: true,
      showToast: false,
    };
  }

  // call get products when component mounts
  componentDidMount() {
    const { category } = this.props;
    this.getProducts(category);
  }

  handleToast = () => {
    this.setState({ showToast: false });
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
      productsLoading, products, showToast,
    } = this.state;
    const {
      currency, cartProducts, handleAddToCart, category
    } = this.props;

    // when product loading
    if (productsLoading) {
      return <Spinner />;
    }
    return (
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

    );
  }
}

Home.propTypes = {
  currency: PropTypes.string.isRequired,
  cartProducts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    inStock: PropTypes.bool,
    prices: PropTypes.arrayOf(PropTypes.shape({
      amount: PropTypes.number.isRequired,
      currency: PropTypes.shape({
        label: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired,
      }),
    })),
    gallery: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.string,
  })).isRequired,

  handleAddToCart: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
};

export default Home;
