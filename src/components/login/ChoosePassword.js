import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';

import axios from '../config.js';

import useWindowSize from "@wbe/use-window-size";

import { useHistory } from "react-router-dom";

const ChoosePassword = ({ location }) => {

    const [code, setCode] = useState(new URLSearchParams(location.search).get('code'));

    const [email, setEmail] = useState(new URLSearchParams(location.search).get('email'));

    const [newPassword, setNewPassword] = useState('-');
    const [confirmPassword, setConfirmPassword] = useState('-');

    const [passwordsNotMatch, setPasswordsNotMatch] = useState(false);

    const { width, height } = useWindowSize();

    const history = useHistory();

    const [message, setMessage] = useState(false);

    const errorAlert = message? <Alert variant="danger">Looks like your code has expired. Please try requesting for a new one. <a href="/resetpassword/?fcnp=f"> Request new code here</a></Alert> : '';


    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
        console.log(e.target.value);
        console.log(email);
        console.log(code);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        console.log(e.target.value);
    }

    const handlePasswordChange = () => {
        if( newPassword != confirmPassword){
            setPasswordsNotMatch(true);
        }else{

            const data = { email: email, code: code, new_password: newPassword, new_password_confirmation: confirmPassword };

            axios.put('reset/password',data)
            .then(res => {
                history.push(`/login/?pc=true`);
            })
            .catch(error => {
                //console.log(error.response);
                setMessage(true);
            })
        }
        
    }

    if (width > 1125) {
        return (
            <div style={{ paddingTop: '5%',paddingBottom: '5%',paddingLeft: '36%',paddingRight: '36%'}}>
                <div style={{borderStyle: 'solid', borderWidth: '1px', borderRadius: '5px', paddingTop: '10%',paddingLeft: '10%',paddingRight: '10%',paddingBottom: '10%'}}> 
    
                    <div style={{paddingLeft: '20%',paddingRight: '20%'}}>
                        <div style={{ textAlign: 'center'}}> </div>
                        <div>
                            <h1 style={{textAlign: 'center'}}>ITEAM</h1>
                        </div>
                        
                    </div>
                    {errorAlert}
                    <div style={{ textAlign: 'center', paddingBottom: '5%'}}> <b><h4>Choose new password</h4></b></div>
                    {passwordsNotMatch && 
                        <Alert  variant='danger'>
                            Passwords do not match
                        </Alert>
                    }
                    <div style={{ textAlign: 'center', paddingTop: '5%'}}> 
                        <Form>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="New Password"  onChange={handleNewPasswordChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Confirm Password"  onChange={handleConfirmPasswordChange}/>
                            </Form.Group>
                        </Form>
                        <Button variant="primary" type="submit" style={{width: '100%', color: 'black', backgroundColor:'#E9C46A', borderColor: '#E9C46A'}} onClick={handlePasswordChange}>
                            Submit
                        </Button>
                    </div>

                </div>
            </div>
        );
    }
    return (
        <div >
                <div style={{ paddingTop: '10%',paddingLeft: '10%',paddingRight: '10%',paddingBottom: '10%'}}> 
    
                    <div style={{paddingLeft: '20%',paddingRight: '20%'}}>
                        <div style={{ textAlign: 'center'}}> </div>
                        <div>
                            <h1 style={{textAlign: 'center'}}>ITEAM</h1>
                        </div>
                        
                    </div>
                    <div style={{ textAlign: 'center', paddingBottom: '5%'}}> <b><h4>Choose new password</h4></b></div>
                    {passwordsNotMatch && 
                        <Alert  variant='danger'>
                            Email/ Password not found
                        </Alert>
                    }
                    <div style={{ textAlign: 'center', paddingTop: '5%'}}> 
                        <Form>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="New Password"  onChange={handleNewPasswordChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Confirm Password"  onChange={handleConfirmPasswordChange}/>
                            </Form.Group>
                        </Form>
                        <Button variant="primary" type="submit" style={{width: '100%', color: 'black', backgroundColor:'#E9C46A', borderColor: '#E9C46A'}} onClick={handlePasswordChange}>
                            Submit
                        </Button>
                    </div>

                </div>
        </div>
    );
}
export default ChoosePassword;