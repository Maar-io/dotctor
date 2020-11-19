import React, { Component } from 'react'
import './Footer.css'

export default class Footer extends Component{
    render(){
        return (
            <footer className="footer">
            <div>
                <div>
                    <p>Powered by <a className="link" href="https://coingecko.com/">coingecko.com</a></p>
                </div>
                <hr/>
                <div>
                    <p >Designed by: <a className="link" href="https://github.com/Maar-io">Maar.io</a></p>
                </div>
            </div>
            </footer>
        );
    }
}