import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const Section = styled.section`
    font-size: 2rem;
    text-align: left;
    padding: 1.5rem 0 1.5rem 5rem;
`;

const Button = styled.button`
    margin: 0 8px;
`;

const BalanceButton = styled(Button)
`
    width: 150px;
`;
const Balance = styled.div
`
    min-width: 250px;
    margin: 0.5rem 0 0 2.5rem;
    font-size: 2.5em;
    vertical-align: middle;
`;


export default function AccountBalance (props) {
    const buttonText = props.showBalance ? 'Hide balance': 'Show balance';
    let content = '\u00A0';
    const buttonClass = 'btn ' + (props.showBalance ? 'btn-default' : 'btn-info');
    if ( props.showBalance ) {
        content = <>Balance: $ {props.amount}</>
    }

    return (
        <>
            <Balance>
                {content}
            </Balance>
            <Section>
                <BalanceButton onClick={props.handleVisibilityChange}
                        className={buttonClass}>
                    {buttonText}
                </BalanceButton>
                <Button onClick={props.handleAirdrop}
                        className="btn btn-success">
                            <i className="fas fa-rocket"></i>
                            AirDrop
                </Button>
            </Section>
        </>
    )
    
}

AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired
}