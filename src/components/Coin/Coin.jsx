import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const TableData = styled.td`
    border: 1px solid;
    width: 36vh;
    color: black;
    background-color: darkmagenta;
    text-align: center;
    margin: 50px auto 50px auto;
    font-size: 1.4rem;
`;

const TableDataR = styled(TableData)`
    text-align: right;
`;
const TableDataL = styled(TableData)`
    text-align: left;
`;

export default function Coin(props) {

    return (
        <tr>
            <TableData>{props.rank}</TableData>
            <TableDataL ><a href={props.homepage}>{props.name}</a></TableDataL>
            <TableData><img src={props.icon} alt="icon" /></TableData>
            <TableData>{props.ticker.toUpperCase()}</TableData>
            <TableData><a href={props.github}>github</a></TableData>
            <TableData>${props.price}</TableData>
            <TableDataR>${props.marketcap}</TableDataR>
        </tr>
    );
}
Coin.propTypes = {
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}