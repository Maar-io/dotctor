import React, { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import { Container, Row, Navbar, Nav } from 'react-bootstrap';

import CoinList from './components/CoinList/CoinList';
import GetGithub from './components/GetGithub/GetGithub';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import { NBar } from './components/NBar';
import styled from 'styled-components';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap";

const StyledDiv = styled.div`
background-color: #282c34;
text-align: center;
color: seashell;
`;

const SUBSTRATE = gql`
{
    search(query: "is:public topic:substrate topic:blockchain", type: REPOSITORY, first: 100) {
      repositoryCount
      pageInfo {
        endCursor
        startCursor
      }
      edges {
        node {
          ... on Repository {
            name
            url
            homepageUrl
            description
            openGraphImageUrl
          }
        }
      }
    }
  }
`;
const POLKADOT = gql`
{
    search(query: "is:public topic:polkadot topic:blockchain", type: REPOSITORY, first: 100) {
      repositoryCount
      pageInfo {
        endCursor
        startCursor
      }
      edges {
        node {
          ... on Repository {
            name
            url
            homepageUrl
            description
            openGraphImageUrl
          }
        }
      }
    }
  }
`;

let newGhData = null;

function App(props) {
  const [coinData, setCoinData] = useState([]);

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



  useEffect(function () {
    if (coinData.length === 0) {
      componentDidMount();
    }

  }, []);

  return (
    <React.Fragment>
       <div>
      <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
      <form>
        <input type="hidden" defaultValue={process.env.REACT_APP_NOT_SECRET_CODE} />
      </form>
    </div>
      <Router>
        <NBar />
        <Switch>
          <Route path={process.env.PUBLIC_URL + '/'}/>
          <Route exact path="/" component={Home} />
          <Route path="/gecko" render={(props) => <CoinList {...props} coinData={coinData} />} />
          <Route path="/github" render={(props) => <GetGithub {...props} query1={SUBSTRATE} query2={POLKADOT} />} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </React.Fragment>
  );


}

export default App;