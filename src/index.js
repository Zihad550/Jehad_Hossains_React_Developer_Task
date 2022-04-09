import {
  ApolloClient,
  ApolloProvider, InMemoryCache
} from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

/* client
  .query({
    query: gql`
    {
      categories{
        name
      }
    }
    `
  })
  .then((result) => console.log(result)); */

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
