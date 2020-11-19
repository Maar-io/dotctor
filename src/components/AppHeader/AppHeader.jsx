import React, { Component } from 'react'
import logo from './logo.png';
import './AppHeader.css'

export default class AppHeader extends Component {
    render() {
        return (
          <header className="Header">
          <img src={logo} alt="logo" className="App-logo" />
            <h1 className="Title">
            DOT Ecosystem
            </h1>
          </header>
        )
    }
}
