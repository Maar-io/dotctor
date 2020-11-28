import React, {useState, useEffect} from 'react';
import { gql } from '@apollo/client';
import { Container, Row, Navbar, Nav} from 'react-bootstrap';

import CoinList from './components/CoinList/CoinList';
import AppHeader from './components/AppHeader/AppHeader';
import McapChart from './components/McapChart/McapChart';
import GetGithub from './components/GetGithub/GetGithub';
import { Home } from './components/Home/Home';
import { About } from './components/About/About';
import { Layout } from './components/Layout';
import { NBar } from './components/NBar';
import { Jumbotron } from './components/Jumbotron';
import Footer from './components/Footer/Footer';
import styled from 'styled-components';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap";

//import 'bootstrap/dist/css/bootstrap.min.css'
//import 'bootswatch/dist/darkly/bootstrap.min.css'
//import '@fortawesome/fontawesome-free/js/all'

const StyledDiv = styled.div`
background-color: #282c34;
text-align: center;
color: seashell;
`;

const SUBSTRATE = gql`
{
    search(query: "is:public topic:substrate topic:blockchain", type: REPOSITORY, first: 10) {
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
    search(query: "is:public topic:polkadot topic:blockchain", type: REPOSITORY, first: 10) {
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
  
  // https://api.coingecko.com/api/v3/simple/price?ids=polkadot%2Ckusama&vs_currencies=usd
  const dotIds = ['kusama', 'polkadot', 'edgeware', 'sora', 'chainx', 'darwinia-network-native-token', 'akropolis', 'mantra-dao', 'robonomics-network', 'polkastarter', 'stafi', 'kulupu', 'robonomics-web-services', 'chads-vc'];
  //https://api.github.com/repos/paritytech/substrate/stats/commit_activity
  //const dotIds = ['polkadot'];
  const dotUrl = 'https://api.coingecko.com/api/v3/coins/';
  const promises = dotIds.map(id => axios.get(dotUrl + id));
  //const p = coinIds.map(id => console.log(dotUrl + id));
  const coinData = await Promise.all(promises);
  const coinPriceData = coinData.map(function(response) { 
    const coin = response.data;
    /*
    console.log(coin.name + " " 
                + coin.symbol + " "
                + coin.links.homepage + " " 
                + coin.links.repos_url.github + " " 
                + coin.image.thumb + " " 
                + coin.market_cap_rank + " " 
                + coin.market_data.current_price.usd + " " 
                + coin.market_data.market_cap.usd + " " 
                );
    */
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
  .sort(function(a, b) {
    return a.rank - b.rank;
  });
  console.log(coinPriceData)
  setCoinData(coinPriceData);

}

  

  useEffect(function() {
    console.log("useEffect " )
    if (coinData.length === 0 ) {
      componentDidMount();
    }

  }, []);

  return (
    <React.Fragment>
        <Router>
          <NBar />
          <Jumbotron />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/github" render={(props) => <GetGithub {...props} query1={SUBSTRATE} query2={POLKADOT}/>} />
            </Switch>
        </Router>
    </React.Fragment>
  );


}

export default App;