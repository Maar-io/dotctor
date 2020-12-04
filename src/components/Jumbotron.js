import React from 'react';
import { Jumbotron as Jumbo, Container} from 'react-bootstrap';
import styled from 'styled-components';
//import myImage from '../assets/m.jpg';

//background: url(${myImage}) no-repeat fixed bottom;
const Styles = styled.div`
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
  }
`;

export const Jumbotron = () => (
    <Styles>
        <Jumbo fluid className="jumbo">
            <div className="overlay"></div>
            <Container>
                <h1>Polkadot Ecosystem Explorer</h1>
                <h6>Explore Github projects related to Polkadot</h6>
            </Container>
        </Jumbo>
    </Styles>
)