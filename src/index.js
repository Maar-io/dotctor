import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import App from './App';
import 'bootswatch/dist/darkly/bootstrap.min.css'


ReactDOM.render(
    <App />,
  document.getElementById('root')
);
