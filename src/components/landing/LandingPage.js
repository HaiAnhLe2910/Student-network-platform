import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Common/Button.css';
import About from './About';
import Feature from './Feature';
import Guideline from './Guideline';
import Banner from '../Common/Banner';
import PropTypes from 'prop-types';

const LandingPage = ({ location }) => {
    const [token, setToken] = useState(new URLSearchParams(location.search).get('token'));
    //Store token in localStorage
    if (token != null) {
        localStorage.setItem('token', token);
        window.location.reload(false);
    }
    return (
        <div>
            <Banner />
            <Feature />
            <About />
            <Guideline />
        </div>
    );
}



export default LandingPage;
