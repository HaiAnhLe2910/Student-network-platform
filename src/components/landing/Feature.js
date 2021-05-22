import React, { useEffect, useState } from 'react';
import { Card, Button, CardDeck, Jumbotron, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Common/Button.css';
import axios from '../config.js';
//Loading
import { Spinner } from 'react-awesome-spinners';

const Feature = () => {

    const [projects, setProjects] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    //fetching API data
    useEffect(() => {
        fetchAllProjects();
    }, []);


    const fetchAllProjects = () => {
        setIsLoading(true);

        axios.get('projects/all')
            .then(res => {
                setProjects(res.data);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                setError(error);
            })
    }

    const FeatureProject = () => {
        let content = null;

        if (isLoading) {
            content = (
                <Container style={{ paddingBottom: '2vh' }}>
                    < Spinner />
                </Container>
            );
        }
        else if (projects.length > 0) {
            content = (
                projects.slice(0, 3).map((project, index) => (
                    <Card >
                        <Card.Body style={{display: 'inline-block'}}>
                            <Card.Title className="text-center"><h2>{project.name}</h2></Card.Title>
                            <Card.Text >
                                <h3>Description</h3> {project.description}
                            </Card.Text>
                            <Card.Text>
                                <p><h3>Category</h3> {project.category} </p>
                            </Card.Text>

                        </Card.Body>
                    </Card>
                ))
            );
        } else if (!isLoading) {
            content = (
                <Container style={{ paddingBottom: '2vh' }}>
                    <p>
                        No projects found!
                   </p>
                </Container>
            )
        }
        return content;
    }



    return (
        <div id="features" style={{ padding: '2em' }}>
            <Container>
                <div className="text-center" style={{ paddingBottom: '3em' }}>
                    <h2>
                        <span style={{ borderBottom: '3px solid #E9C46A', paddingBottom: '6px' }}>Featured Projects</span>
                    </h2>
                </div>

                <CardDeck >
                    <FeatureProject />

                    {/* <Card className="text-center">
                        <Card.Body>
                            <Card.Title><h2>Ice Water Efficiency</h2></Card.Title>
                            <Card.Img src="images/IceWater.jpg"></Card.Img>
                            <Card.Text>
                                The project aims to investigate and optimize the current ice water sytem of the site. The requirement is to conduct an organization on the units using the ice water
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title><h2>Ice Water Efficiency</h2></Card.Title>
                            <Card.Img src="images/IceWater.jpg"></Card.Img>
                            <Card.Text>
                                The project aims to investigate and optimize the current ice water sytem of the site. The requirement is to conduct an organization on the units using the ice water
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title><h2>Ice Water Efficiency</h2></Card.Title>
                            <Card.Img src="images/IceWater.jpg"></Card.Img>
                            <Card.Text>
                                The project aims to investigate and optimize the current ice water sytem of the site. The requirement is to conduct an organization on the units using the ice water
                            </Card.Text>
                        </Card.Body>
                    </Card> */}
                    {/* <Button className="button-secondary" >{">"}</Button> */}
                </CardDeck>

            </Container >
        </div >
    );
}

export default Feature;