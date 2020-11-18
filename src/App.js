import React, {useState, useEffect} from 'react';
import CoinList from './components/CoinList/CoinList';
import AccountBalance from './components/AccountBalance/AccountBalance';
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

const COIN_COUNT = 10;
const formatPrice = price => parseFloat(Number(price).toFixed(2));

function App(props) {
  const [balance, setBalance] = useState(20000);
  const [showBalance, setShowBalance] = useState(true);
  const [coinData, setCoinData] = useState([]);

  // this is local componentDidMount, not from React statefull component
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
  
  useEffect(function() {
    if (coinData.length === 0 ) {
      componentDidMount();
    }
  });


  const handleVisibilityChange = () => {
    setShowBalance(oldValue => !oldValue);
  }

  const handleRefresh = async (valueChangeId) => {
    const tickerUrl = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
    const response = await axios.get(tickerUrl);
    debugger;
    const newPrice = formatPrice(response.data.quotes.USD.price);
    const newCoinData = coinData.map( function( values ) {
      let newValues = { ...values };
      if ( valueChangeId === values.key ) {
        newValues.price = newPrice;
      }
      return newValues;
    });
    
    setCoinData(newCoinData);
  }

  const handleTransaction = (isBuy, valueChangeId) => { 
    const balanceChange = isBuy ? 1 : -1;
    const newCoinData = coinData.map( function( values ) {
      let newValues = { ...values };
      if ( valueChangeId === values.key ) {
        newValues.balance += balanceChange;
        setBalance( oldBalance => oldBalance - balanceChange * newValues.price );
      }
      return newValues;
    });    
    setCoinData(newCoinData);
  }

  const handleAirdrop = () => {
    setBalance(oldValue => oldValue + 1200);
  }

  return (
    <StyledDiv className="App">
      <AppHeader />
      <AccountBalance 
        amount={balance} 
        showBalance={showBalance} 
        handleVisibilityChange={handleVisibilityChange} 
        handleAirdrop={handleAirdrop}/>
      <CoinList 
        coinData={coinData} 
        showBalance={showBalance}
        handleRefresh={handleRefresh} 
        handleTransaction={handleTransaction}/>
      <Footer/>
    </StyledDiv>
  );


}

export default App;