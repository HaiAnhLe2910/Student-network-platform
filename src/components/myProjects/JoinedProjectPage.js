import React, { useState, useEffect } from 'react';
import { Image, Button, Container } from 'react-bootstrap';
import '../Common/Button.css';
import ScrollToTop from 'react-scroll-up';
import ProjectItem from '../home/Project';
import axios from '../config.js';
import { ProjectLoader } from '../Common/ContentLoader';

const JoinedProjectsPage = () => {


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
                setProjects(res.data.joinedProjects);
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
                                <ProjectItem
                                    projId={proj.projectId}
                                    projName={proj.project.name}
                                    projCategory={proj.project.category}
    
                                    projDes={proj.project.description}
                                    startDate={proj.project.startDate}
                                    endDate={proj.project.endDate}
                                />
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
                        You have joined 0 project !
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
                    <span style={{ borderBottom: '3px solid #E9C46A', paddingBottom: '6px' }}>My Joined Projects</span>
                </h1>
            </div>
            <ProjectFound />
        </Container>
    )
}


export default JoinedProjectsPage;