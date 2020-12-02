import React from "react";
import styled from 'styled-components';


const Fter = styled.footer`
padding-top: 3px;
padding-left: 50px;
text-align: center;
    `;

export default function Footer(){
    return (
        <Fter className="footer">
            <div>
                <div>
                    <p>Powered by <a className="link" href="https://coingecko.com/">coingecko.com</a></p>
                </div>
                <hr />
            </div>
        </Fter>
    );
}