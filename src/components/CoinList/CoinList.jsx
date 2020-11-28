import React from 'react'
import Coin from '../Coin/Coin';
import styled from 'styled-components';
import Footer from '../Footer/Footer';


const Table = styled.table`
    margin: 50px auto 50px auto;
    display: inline-block;
    font-size: 1.4rem;
    text-align: center;
    `;

export default function CoinList(props) {
    return (
        <Table  className="table table-striped table-hover ">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Icon</th>
                    <th>Ticker</th>
                    <th>Github</th>
                    <th>Price</th>
                    <th>Market Cap</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.coinData.map(({ key, name, ticker, homepage, github, rank, price, icon, marketcap }) =>
                        <Coin key={key}
                            name={name}
                            ticker={ticker}
                            homepage={homepage}
                            github={github}
                            price={price}
                            icon={icon}
                            rank={rank}
                            marketcap={marketcap}
                        />
                    )
                }
            </tbody>
            <tfoot>
                <Footer/>
            </tfoot>
        </Table>
    )
}
