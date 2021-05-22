import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';

import useWindowSize from "@wbe/use-window-size";

import {Link} from 'react-router-dom';

import axios from '../config.js';

const ResetPassword = ({ location }) => {

    const [email, setEmail] = useState('-');

    const [emailFilled, setEmailFilled] = useState(false);

    const { width, height } = useWindowSize();

    const resetPasswordFunction = () => {
        //console.log("API call with email " + email );

        axios.put('request/reset/password/email/' + email)
            .then(res => {
                //console.log(res);
            })
            .catch(error => {
                //console.log(error.response);
            })
    }

    const [message, setMessage] = useState(new URLSearchParams(location.search).get('fcnp'));

    const errorAlert = message? '' : <Button style={{allign: 'left', color: 'black', backgroundColor: 'white', border: 'none'}}><Link to="/login">Back</Link></Button>;

    const handleEmailChange = (e) => {

        setEmail(e.target.value);
        //console.log(e.target.value);
        
    }

    if (width > 1005) {
        return (
            <div style={{ paddingTop: '5%',paddingBottom: '5%',paddingLeft: '36%',paddingRight: '36%'}}>
                <div style={{borderStyle: 'solid', borderWidth: '1px', borderRadius: '5px', paddingTop: '10%',paddingLeft: '10%',paddingRight: '10%',paddingBottom: '10%'}}> 
                    {errorAlert}
                    <div style={{paddingLeft: '20%',paddingRight: '20%'}}>
                        <div style={{ textAlign: 'center'}}> </div>
                        <div>
                            <h1 style={{textAlign: 'center'}}>ITEAM</h1>
                        </div>
                        
                    </div>
                    <div style={{ textAlign: 'center', paddingBottom: '5%'}}> <b><h4>Reset your password</h4></b></div>
                    <div style={{ textAlign: 'center'}}> Please enter your ITEAM email address so we can reset your password</div>
                    <div style={{ textAlign: 'center', paddingTop: '10%'}}> 
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange}/>
                            </Form.Group>  
                        </Form>
                        <Link to={{pathname:"/passwordsent", data:email}}>
                            <Button variant="primary" type="submit" style={{width: '100%', color: 'black', backgroundColor:'#E9C46A', borderColor: '#E9C46A'}} onClick={resetPasswordFunction}>
                                Next
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        );
    }
    return (
        <div>
            <div style={{paddingTop: '10%',paddingLeft: '10%',paddingRight: '10%',paddingBottom: '10%'}}> 
                <Button style={{allign: 'left', color: 'black', backgroundColor: 'white', border: 'none'}}>
                    <Link to="/login">Back</Link> 
                </Button>
                <div style={{paddingLeft: '20%',paddingRight: '20%'}}>
                    <div style={{ textAlign: 'center'}}> </div>
                    <div>
                        <h1 style={{textAlign: 'center'}}>ITEAM</h1>
                    </div>
                    
                </div>
                <div style={{ textAlign: 'center', paddingBottom: '5%'}}> <b><h4>Reset your password</h4></b></div>
                <div style={{ textAlign: 'center'}}> Please enter your ITEAM email address so we can reset your password</div>
                <div style={{ textAlign: 'center', paddingTop: '10%'}}> 
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange}/>
                        </Form.Group>  
                    </Form>
                    <Link to={{pathname:"/passwordsent", data:email}}>
                        <Button variant="primary" type="submit" style={{width: '100%', color: 'black', backgroundColor:'#E9C46A', borderColor: '#E9C46A'}} onClick={resetPasswordFunction}>
                            Next
                        </Button>
                    </Link>
                    
                </div>

            </div>
        </div>
    );
}
export default ResetPassword;