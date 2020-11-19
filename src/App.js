import React, {useState, useEffect} from 'react';
import CoinList from './components/CoinList/CoinList';
import AppHeader from './components/AppHeader/AppHeader';
import Footer from './components/Footer/Footer'
import styled from 'styled-components';
import axios from 'axios';

//import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootswatch/dist/slate/bootstrap.min.css'
import '@fortawesome/fontawesome-free/js/all'

const StyledDiv = styled.div`
background-color: #282c34;
text-align: center;
color: seashell;
`;

function App(props) {
  const [coinData, setCoinData] = useState([]);

  // this is local componentDidMount, not from React statefull component
  /*
  const componentDidMount = async () => {
    const response = await axios.get('https://api.coinpaprika.com/v1/coins');
    const coinIds = response.data.slice(0, COIN_COUNT).map(coin => coin.id);
    const tickerUrl = 'https://api.coinpaprika.com/v1/tickers/';
    const promises = coinIds.map(id => axios.get(tickerUrl + id));
    const coinData = await Promise.all(promises);
    const coinPriceData = coinData.map(function(response) { 
      const coin = response.data;
      return {
        key: coin.id,
        name: coin.name,
        ticker: coin.symbol,
        balance: 0,
        price: formatPrice(coin.quotes.USD.price),
      };
    });
    setCoinData(coinPriceData);
  }  
  */

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
    if (coinData.length === 0 ) {
      componentDidMount();
    }
  });

  return (
    <StyledDiv className="App">
      <AppHeader />
      <CoinList 
        coinData={coinData} />
      <Footer/>
    </StyledDiv>
  );


}

export default App;