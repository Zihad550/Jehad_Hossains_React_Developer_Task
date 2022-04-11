import {
  ApolloClient, InMemoryCache
} from '@apollo/client';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />);

reportWebVitals();
