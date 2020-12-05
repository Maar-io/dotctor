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