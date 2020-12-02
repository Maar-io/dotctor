import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import CoinList from './components/CoinList';
import GetGithub from './components/GetGithub';
import Home from './components/Home';
import { AuthProvider } from "./components/AuthContext"
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute'

import styled from 'styled-components';
import axios from 'axios';

function App(props) {
  console.log("render APP")
  const [coinData, setCoinData] = useState([]);
  const [isSignedIn, setSignedIn] = useState(false);
  const [apolloClient, setApolloClient] = useState({});

  const componentDidMount = async () => {
    const dotIds = ['kusama', 'polkadot', 'edgeware', 'sora', 'chainx', 'darwinia-network-native-token', 'akropolis', 'mantra-dao', 'robonomics-network', 'polkastarter', 'stafi', 'kulupu', 'robonomics-web-services', 'chads-vc'];
    const dotUrl = 'https://api.coingecko.com/api/v3/coins/';
    const promises = dotIds.map(id => axios.get(dotUrl + id));
    const coinData = await Promise.all(promises);
    const coinPriceData = coinData.map(function (response) {
      const coin = response.data;
      return {
        key: coin.id,
        name: coin.name,
        ticker: coin.symbol,
        homepage: coin.links.homepage[0],
        icon: coin.image.thumb,
        rank: coin.market_cap_rank,
        marketcap: coin.market_data.market_cap.usd,
        price: coin.market_data.current_price.usd,
        github: coin.links.repos_url.github
      };

    })
      .sort(function (a, b) {
        return a.rank - b.rank;
      });
    setCoinData(coinPriceData);

  }

  function tokenReceived(token) {
    setSignedIn(true);
    const httpLink = createHttpLink({
      uri: 'https://api.github.com/graphql',
    });

    const authLink = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      const token = null;
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        }
      }
    });

    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(httpLink)
    });
    setApolloClient(client)
  }

  useEffect(function () {
    if (coinData.length === 0) {
      componentDidMount();
    }

  }, []);

  return (

    <React.Fragment>
      <div>
        <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
      </div>
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/gecko" render={(props) => <CoinList {...props} coinData={coinData} />} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/github" component={GetGithub} />
          </Switch>
        </AuthProvider>
      </Router>
    </React.Fragment>

  );


}

export default App;