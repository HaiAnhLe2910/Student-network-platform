import React, { useState, useEffect } from 'react';
import { Card, Image, Button, Container } from 'react-bootstrap';
import '../Common/Button.css';
import ScrollToTop from 'react-scroll-up';
import ProjectItem from '../home/Project';
import axios from '../config.js';
import { ProjectLoader } from '../Common/ContentLoader';
import { Link } from 'react-router-dom';

const MyRequests = () => {

    //load API data
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    //Decide how many visible projects in each render 
    const [showProjects, setShowProjects] = useState(4);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = () => {
        setIsLoading(true);
        axios.get('student/me')
            .then(res => {
                setProjects(res.data.requestedToJoinProjects);
                console.log(res.data.requestedToJoinProjects);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
            })
    }

    //load more projects
    const handleLoadMore = () => {
        showProjects >= projects.length ? setShowProjects(projects.length) : setShowProjects(showProjects + 4);
    };

    const ProjectFound = () => {
        let content = null;
        if (isLoading) {
            content = (
                <Container style={{ paddingBottom: '2vh' }}>
                    < ProjectLoader />
                </Container>
            );
        }
        else if (projects.length > 0) {
            content = (
                <Container style={{ paddingBottom: '2vh' }}>
                    <div style={{ paddingBottom: '1vh' }}>
                        {
                            projects.slice(0, showProjects).map((proj, index) => (
                                <Card style={{ marginBottom: '20px' }}>
                                    <Card.Body>
                                        <div id='header'>
                                            <Card.Title><h2>{proj.project.name}</h2></Card.Title>
                                        </div>

                                        <div id='category' style={{ float: 'right', paddingBottom: '2vh' }}>
                                            <p>Category:<b> {proj.project.category} </b></p>
                                        </div>

                                        <div id='ProjDes' style={{ paddingBottom: '1vh' }}>
                                            <Card.Text>
                                                {proj.project.description}
                                            </Card.Text>
                                        </div>
                                        <div id='SpotDes' style={{ paddingBottom: '1vh' }}>
                                            <p><b>Spot Description:</b>  {proj.spotDescription} </p>
                                        </div>

                                        <div id='startDate' style={{ paddingBottom: '1vh' }}>
                                            <p><b>Start date:</b>  {proj.project.startDate} </p>
                                        </div>
                                        <div id='endDate' style={{ paddingBottom: '1vh' }}>
                                            <p><b>End date:</b> {proj.project.endDate} </p>
                                        </div>

                                        <div id='btnReadmore' className='text-right'>
                                            <Link to={{ pathname: "/projectdetails", data: proj.projectId }}>
                                                <Button className='button-secondary' >{">"} </Button>
                                            </Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))
                        }

                        <Button className="button-primary" onClick={handleLoadMore} style={{ marginBottom: '1vh' }}>
                            Load more
                  </Button>

                        <ScrollToTop showUnder={160}>
                            <span><Image src='/images/GoTopIcon.PNG'
                                width="30px"
                                height="30px" />
                            </span>
                        </ScrollToTop>
                    </div>
                </Container>
            );
        } else if (!isLoading) {
            content = (
                <Container style={{ paddingBottom: '2vh' }}>
                    <h3>
                        You have no joining requests!
                   </h3>
                </Container>
            )
        }
        return content;
    }


    return (
        <Container style={{ paddingBottom: '2vh' }}>
            <div id='myProject-pageName' className="text-center" style={{ paddingBottom: '3em', paddingTop: '3em' }}>
                <h1>
                    <span style={{ borderBottom: '3px solid #E9C46A', paddingBottom: '6px' }}>My Joined Requests</span>
                </h1>
            </div>
            <ProjectFound />
        </Container>
    )
}


export default MyRequests;