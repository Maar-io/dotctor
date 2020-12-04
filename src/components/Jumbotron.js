import React from 'react';
import { Link } from "react-router-dom"
import { Jumbotron as Jmb, Container, Button } from 'react-bootstrap';
import styled from 'styled-components';
//import myImage from '../assets/m.jpg';

//background: url(${myImage}) no-repeat fixed bottom;
const Styles = styled.div`
  .jumbo {
    background: 
linear-gradient(
  rgb(230, 0, 122), 
  rgb(102, 0, 102)
);
  }

  `;
/* const Styles = styled.div`
  .jumbo {
    background-size: cover;
    color: #efefef;
    height: 400px;
    position: relative;
    z-index: -2;
  }

  .overlay {
    background-color: darkmagenta;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  } */
/*   <Styles>
    <Jumbo fluid className="jumbo">
      <div className="overlay"></div>
      <Container>
        <h1>Polkadot Ecosystem Explorer</h1>
        <h6>Explore Github projects related to Polkadot</h6>
        <Link to="/github" className="lead">
            <Button type="button" size="lg" className="btn btn-info">
              Search
            </Button>
        </Link>
      </Container>
    </Jumbo>
  </Styles> */
export const Jumbotron = () => (
<Styles>

  <Jmb fluid className="jumbo">
    <Container>

      <h1>Polkadot Github Explorer</h1>
      <p>
        Explore Github projects related to Polkadot
  </p>
      <p>
        <Link to="/github">
          <Button type="button" size="lg" className="btn btn-info ">
            Search
            </Button>
        </Link>
      </p>
    </Container>

  </Jmb>
</Styles>
)