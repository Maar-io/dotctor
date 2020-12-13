// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar {
    background-color: rgb(102, 0, 102);
  }
  a, .navbar-brand, .navbar-nav .nav-link {
    padding: 5px;
    color: #bbb;
    &:hover {
      color: rgb(230, 0, 122);
    }
  }
  .navbar-toggle {
    background: magenta !important;
}
`;

export default function NBar() {
    return (
        <Styles>
            <Navbar className="navbar-dark" expand="lg">
                <Navbar.Brand href="/">Dotctor</Navbar.Brand>
                <Navbar.Toggle  />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavItem>
                            <Link to="/">Home</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/github">Search</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/add">Add</Link>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Styles >
    )
}

