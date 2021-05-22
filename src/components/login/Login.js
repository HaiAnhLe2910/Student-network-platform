import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';

import useWindowSize from "@wbe/use-window-size";

import axios from '../config.js';

import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';


const Login = ({location}) => {
    
    const [message, setMessage] = useState(new URLSearchParams(location.search).get('message'));

    const errorAlert = message? <Alert variant="danger">Your account exists, Please log in instead</Alert> : '';

    const [passChanged, setPassChanged] = useState(new URLSearchParams(location.search).get('pc'));

    const errorAlertPC = passChanged? <Alert variant="success">Your password was changed succesfully! Log in with your new password</Alert> : '';

    const [loginFailed, setLoginFailed] = useState(false);
    const [email, setEmail] = useState('-');
    const [password, setPassword] = useState('-');

    const { width, height } = useWindowSize();

    const signUpLink = localStorage.getItem("signUpDomain") + "/signup";

    const history = useHistory();

    const loginFunction = () => {
        //console.log("API call with user name " + email + " and password " + password);

        loginAPIFunction();

    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        //console.log(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        //console.log(e.target.value);
    }

    const loginAPIFunction = async () =>{
        const data = { email: email, password: password };
        
        axios.post('student/login',data)
            .then(res => {
                console.log(res.data.token);
                localStorage.setItem('token',res.data.token);
                
                console.log(res.data.token);
                window.location.reload(false); 
            })
            .catch(error => {
                console.log(error.response);
                setLoginFailed(true);
            })
    }
    
    if (width > 1000) {

        return (
                <div style={{ paddingTop: '5%',paddingBottom: '5%',paddingLeft: '36%',paddingRight: '36%'}}>

                    <div style={{borderStyle: 'solid', borderWidth: '1px', borderRadius: '5px', paddingTop: '10%',paddingLeft: '10%',paddingRight: '10%',paddingBottom: '10%'}}> 
                        <div style={{borderBottom: 'solid', borderWidth: '1px',paddingLeft: '20%',paddingRight: '20%',paddingBottom: '10%'}}>
                            <div>
                                <h1 style={{textAlign: 'center'}}>ITEAM</h1>
                            </div>
                            <div style={{ textAlign: 'center'}}> <b>Welcome back!</b></div>
                        </div>

                        <div style={{borderBottom: 'solid', borderWidth: '1px', paddingTop: '10%', paddingBottom: '10%'}}>
                            {loginFailed && 
                            <Alert  variant='danger'>
                                Email/ Password not found
                            </Alert>}
                            {errorAlertPC}
                            {errorAlert}
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Email"  onChange={handleEmailChange}/>
                                </Form.Group>
                            
                                <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password"  onChange={handlePasswordChange}/>
                                </Form.Group>
        
                            </Form>
                            <Button variant="primary" type="submit" style={{width: '100%', color: 'black', backgroundColor:'#E9C46A', borderColor: '#E9C46A'}} onClick={loginFunction}>
                                Log in
                            </Button>
                            <div style={{ paddingTop: '10%',  textAlign: 'right'}}>
                                <Link to="/resetpassword">Forgot Password?</Link>
                            </div>
                        </div>
                            
                        <div style={{ paddingTop: '10%',  textAlign: 'center'}}>
                            Don't have an account? <a href={signUpLink}>Sign Up</a>
                        </div>
                    </div>
                </div>
        );
    }
    return (
            <div>
            
                    <div style={{paddingTop: '10%',paddingLeft: '10%',paddingRight: '10%',paddingBottom: '10%'}}> 
                        <div style={{borderBottom: 'solid', borderWidth: '1px',paddingLeft: '20%',paddingRight: '20%',paddingBottom: '10%'}}>
                            <div>
                                <h1 style={{textAlign: 'center'}}>ITEAM</h1>
                            </div>
                            <div style={{ textAlign: 'center'}}> <b>Welcome back!</b></div>
                        </div>

                        <div style={{borderBottom: 'solid', borderWidth: '1px', paddingTop: '10%', paddingBottom: '10%'}}>
                            {loginFailed && 
                            <Alert  variant='danger'>
                                Email/ Password not found
                            </Alert>}
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Email"  onChange={handleEmailChange}/>
                                </Form.Group>
                            
                                <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password"  onChange={handlePasswordChange}/>
                                </Form.Group>
        
                            </Form>
                            <Button variant="primary" type="submit" style={{width: '100%', color: 'black', backgroundColor:'#E9C46A', borderColor: '#E9C46A'}} onClick={loginFunction}>
                                Log in
                            </Button>
                            <div style={{ paddingTop: '10%',  textAlign: 'right'}}>
                                <Link to="/resetpassword">Forgot Password?</Link>
                            </div>
                        </div>
                            
                        <div style={{ paddingTop: '10%',  textAlign: 'center'}}>
                            Don't have an account? <a href={signUpLink}>Sign Up</a>
                        </div>
                    </div>
                </div>

    );

}

export default Login;