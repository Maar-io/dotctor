import React, { Component } from 'react'

export default class Footer extends Component{
    render(){
        return (
            <footer className="footer">
            <div>
                <div>
                    <p>Powered by <a className="link" href="https://coingecko.com/">coingecko.com</a></p>
                </div>
                <hr/>
            </div>
            </footer>
        );
    }
}