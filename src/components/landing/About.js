import React, { Component } from 'react';
import { Card, Button, CardDeck, Jumbotron, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Common/Button.css';


const About=()=> {
    return (
        <div id="about" style={{ padding: '2em' }}>
            <Container>
                <div className="text-left" style={{ paddingBottom: '3em' }}>
                    <h2>
                        <span style={{ borderBottom: '3px solid #E9C46A', paddingBottom: '6px' }}>About</span>
                    </h2>
                </div>
                <Row>
                    <Col xs={12} md={8} style={{margin:"10px 0"}}>

                        <p>
                            ITEAM is a student networing platfrom which allows Fontys students to create their personal projects. ITEAM not only helps students to find other fellow members but also acts as a social platform to connect Fontys students from different departments.
                        </p>
                        <p>
                            ITEAM has been developed by 5 students from ICT department, Fontys hogescholen, Eindhoven, Netherlands. We as young ICT professional aims to create the most optimal student network to create an united student community inside Fontys!
                            </p>
                    </Col>
                    <Col xs={6} md={4} style={{margin:"10px 0"}}>
                        <img
                            alt="logo"
                            src="/images/fontyslogo.png"
                            width="100%"
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default About;