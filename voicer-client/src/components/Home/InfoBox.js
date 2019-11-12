import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import './InfoBox.css';

const InfoBox = () => {
    return (
        <div className="infobox">

        <h1>Voicer is driven by users like you.</h1>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum
        </p>


        <p><Button className="btn-orange">Learn More...</Button></p>
        </div>
    );
}

export default InfoBox;