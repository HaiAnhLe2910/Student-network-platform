import React, { Component } from 'react';
import { Card, Button, CardDeck, Jumbotron, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Common/Button.css';


const Guideline=()=> {

    const signUpLink = localStorage.getItem("signUpDomain") + "/signup";

    return (
        <div id="guideline" style={{ padding: '2em' }}>
            <Container>
                <div className="text-center" style={{ paddingBottom: '3em' }}>
                    <h2>
                        <span style={{ borderBottom: '3px solid #E9C46A', paddingBottom: '6px' }}>How It Works</span>
                    </h2>
                </div>
                <Row>
                    <Col xs={4.5} md={3}>
                        <h3 style={{ color: '#E9C46A' }}>1</h3>
                        <h4 style={{ color: '#14213D' }}>Register</h4>
                        <p>
                            To use the website, you as an visitor should register in our system. However, to save the the time, we will kindly direct you to Fontys login page. Once logging in successfully, you will be regisitered successfully!
                        </p>
                    </Col>
                    <Col xs={4.5} md={3}>
                        <h3 style={{ color: '#E9C46A' }}>2</h3>
                        <h4 style={{ color: '#14213D' }}>Create Project</h4>
                        <p>
                            Do you want to become the project owner? If yes, you can start the in-app experience by creating a new project then specify the needed slots for the project.
                            </p>
                    </Col>
                    <Col xs={4.5} md={3}>
                        <h3 style={{ color: '#E9C46A' }}>3</h3>
                        <h4 style={{ color: '#14213D' }}>Accept Members</h4>
                        <p>
                            Once the project is created, other users can feel free to submit the joining request. Then the project owner will decide if the member can join the project based on their profile skills.
                            </p>
                    </Col>
                    <Col xs={4.5} md={3}>
                        <h3 style={{ color: '#E9C46A' }}>4</h3>
                        <h4 style={{ color: '#14213D' }}>Collaborate</h4>
                        <p>
                            Once all the project slots have been already taken, the project can be started!
                            </p>
                    </Col>
                </Row>
                {/*Place the column in the centre of the row  */}
                <Row className="d-flex justify-content-center">
                    <Col xs={4.5} md={3} className="text-center">
                        <h3 style={{ color: '#E9C46A' }}>5</h3>
                        <h4 style={{ color: '#14213D' }}>Join Other Projects</h4>
                        <p>
                            As a project owner, you also can join another project. To enhance the in-app experience, we provide the searching and filtering functions to help you find out your favorite projects!
                            </p>
                            <a href={signUpLink}><Button className="button-primary">Sign up</Button></a>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Guideline;