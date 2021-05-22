import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';

import useWindowSize from "@wbe/use-window-size";


import {Link} from 'react-router-dom';

//<PasswordSent email={"email@adress.com"}/>

const PasswordSent = (props) => {

    const email = props.location.data;

    const { width, height } = useWindowSize();

    if (width > 1005) {
        return (
            <div style={{ paddingTop: '5%',paddingBottom: '5%',paddingLeft: '36%',paddingRight: '36%'}}>
                <div style={{borderStyle: 'solid', borderWidth: '1px', borderRadius: '5px', paddingTop: '10%',paddingLeft: '10%',paddingRight: '10%',paddingBottom: '10%'}}> 
                    
                    <div style={{paddingLeft: '20%',paddingRight: '20%'}}>
                        <div style={{ textAlign: 'center'}}> </div>
                        <div>
                            <h1 style={{textAlign: 'center'}}>ITEAM</h1>
                        </div> 
                    </div>
                    <div style={{ textAlign: 'center', paddingBottom: '5%'}}> <b><h4>Password sent</h4></b></div>
                    <div style={{ textAlign: 'center'}}> If the email address {email} was registered to ITEAMS then you will receive instructions on how to reset your password</div>
                    <div style={{ paddingTop: '5%',  textAlign: 'right'}}>
                        <Link to="/resetpassword">Didn't receive email?</Link>
                    </div>
                    <div style={{ textAlign: 'center', paddingTop: '10%'}}> 
                        <Link to="/login">
                            <Button variant="primary" type="submit" style={{width: '100%', color: 'black', backgroundColor:'#E9C46A', borderColor: '#E9C46A'}} >
                                Enter new password
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
                    
                <div style={{paddingLeft: '20%',paddingRight: '20%'}}>
                    <div style={{ textAlign: 'center'}}> </div>
                    <div>
                        <h1 style={{textAlign: 'center'}}>ITEAM</h1>
                    </div> 
                </div>
                <div style={{ textAlign: 'center', paddingBottom: '5%'}}> <b><h4>Password sent</h4></b></div>
                <div style={{ textAlign: 'center'}}> If the email address {email} was registered to ITEAMS then you will receive instructions on how to reset your password</div>
                <div style={{ paddingTop: '5%',  textAlign: 'right'}}>
                    <Link to="/resetpassword">Didn't receive email?</Link>
                </div>
                <div style={{ textAlign: 'center', paddingTop: '10%'}}> 
                    <Link to="/login">
                        <Button variant="primary" type="submit" style={{width: '100%', color: 'black', backgroundColor:'#E9C46A', borderColor: '#E9C46A'}} >
                            Enter new password
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default PasswordSent;