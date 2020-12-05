// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  a, .navbar-brand, .navbar-nav .nav-link {
    padding: 15px;
    color: #bbb;
    &:hover {
      color: pink;
    }
  }
  .navbar-toggle {
    background: magenta !important;
}
`;

export default function NBar() {
    return (
        <Styles>
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="/">Dotctor</Navbar.Brand>
                <Navbar.Toggle  />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavItem>
                            <Link to="/">Home</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/github">Projects</Link>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Styles >
    )
}

