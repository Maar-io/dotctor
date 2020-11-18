import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const TableData = styled.td`
    border: 1px solid;
    width: 36vh;
    color: dimgray;
    background-color: seashell;
    text-align: center;
    margin: 50px auto 50px auto;
    font-size: 1.4rem;
    
`;
const TDControl = styled(TableData)`
    width: 36vw;
`;

const Button = styled.button`
    font-size: 12 px; 
    width: 64px;
    line-height: 12 px; 
    padding: 4px; 
    border-radius: 5px; 
    margin: 3px 5px 0;
    border: 2px solid rgb(28, 110, 164); 
`;

export default function Coin(props) {

    const handleRefresh = (event) => {
        event.preventDefault();
        props.handleRefresh(props.id);
    }
    const handleBuy = (event) => {
        event.preventDefault();
        props.handleTransaction(true, props.id);
    }
    const handleSell = (event) => {
        event.preventDefault();
        props.handleTransaction(false, props.id);
    }

    return (
        <tr>
            <TableData>{props.name}</TableData>
            <TableData>{props.ticker}</TableData>
            <TableData>${props.price}</TableData>
            {props.showBalance ? <TableData>{props.balance}</TableData> : null}
            <TDControl>
                <form action="">
                    <Button className='btn btn-info' 
                            onClick={handleRefresh}>
                        Refresh
                    </Button>
                    <Button className='btn btn-warning' 
                            onClick={handleBuy}>
                        Buy
                    </Button>
                    <Button className='btn btn-danger' 
                            onClick={handleSell}>
                        Sell
                    </Button>
                </form>
            </TDControl>
        </tr>
    );
}
Coin.propTypes = {
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}