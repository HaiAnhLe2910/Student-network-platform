import React from 'react';
import {Button} from 'react-bootstrap';
//import '../common/node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Button.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import {Link} from 'react-router-dom';


const HeaderLanding = () => {
    const signUpLink = localStorage.getItem("signUpDomain") + "/signup";

    return (
        <div id='landingHeader'>
            <Navbar variant="light" style={{backgroundColor:"#E9C46A"}}>
                <Navbar.Brand href="#home">
                    ITEAM
                    </Navbar.Brand>

                {/*Navbar.Toggle and Navbar.Collapse are to display the collapsed navbar as a menu when the screen is narrower  */}
                <Navbar.Toggle />
                <Navbar.Collapse>
                    {/* Place user icon at the end of navBar */}
                    <Nav className='ml-auto'>
                        {/* Drop down when user presses user icon on the right side  */}
                        <Link to="/login"><Button className="button-secondary" style={{marginRight:'1vh'}} >Log in</Button></Link>
                        <a href={signUpLink}><Button className="button-secondary">Sign up</Button></a>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );

}

export default HeaderLanding;
