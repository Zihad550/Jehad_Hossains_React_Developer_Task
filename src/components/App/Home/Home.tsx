import { gql } from '@apollo/client';
import React, { Component } from 'react';
import withParams from '../../../HOC/withParams';
import client from '../../../services/ApolloClient';
import Spinner from '../../shared/Spinner/Spinner';
import Container from '../../shared/Styles/Containers/Container';
import ProductsContainer from '../../shared/Styles/Containers/ProductsContainer';
import Title from '../../shared/Styles/Tags/Title';
import Toast from '../../shared/Toast/Toast';
import Product from '../Product/Product';
import { HomeProps, HomeStates } from './types';


class Home extends Component <HomeProps, HomeStates> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      products: [],
      productsLoading: true,
      showToast: false,
      category: 'all',
    };
  }

  // call get products when component mounts
  componentDidMount() {
    let { category } = this.props.params;
    if(category === undefined) category = 'all';
    this.setState({category});
    this.getProducts(category);
  }

  componentDidUpdate(prevProps: HomeProps, prevStates: HomeStates){
    console.log(prevStates.category);
    console.log(prevStates)
    let {category} = this.props.params;
    if(prevStates.category !== category && category !== undefined){
      this.setState({category});
      this.getProducts(category)
    }
  }

  /* shouldComponentUpdate(prevProps: HomeProps, prevStates: HomeStates){
    console.log(prevProps)
    console.log(prevStates)
    
    return true;
  } */

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
    console.log(category)

    // when product loading
    if (productsLoading) {
      return <Spinner />;
    }
    return (
      <Container>

        {/* toast */}
        {
            showToast && <Toast message="Product not available" onClick={this.handleToast} variant=""/>
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


export default withParams(Home);
