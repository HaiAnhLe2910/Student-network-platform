import React, { useState, useEffect } from 'react';
import { Image, Button, Container } from 'react-bootstrap';
import '../Common/Button.css';
import ScrollToTop from 'react-scroll-up';
import {ProjectLoader} from '../Common/ContentLoader'
import ProjectItem from './Project';
import { useToasts} from 'react-toast-notifications';


const ProjectList = ({ projects, isLoading }) => {

    //Decide how many visible projects in each render 
    const [showProjects, setShowProjects] = useState(4);

    const { addToast } = useToasts();

    //load more projects
    const handleLoadMore = () => {
        showProjects >= projects.length ? setShowProjects(projects.length) : setShowProjects(showProjects + 4);
    };

    if(localStorage.getItem("projectDeleted") == true){

        addToast("Project deleted successfully!", {
            appearance: 'success',
            autoDismiss: true
        });

        localStorage.setItem('projectDeleted',false);
    }

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
                        projects.slice(0, showProjects).map((project,index) => (
                            <ProjectItem
                                projId={project.id}
                                projName={project.name}
                                projCategory={project.category}
                                userImg={project.photo}
                                userName={project.fontysId} 
                                projDes={project.description}
                                startDate={project.startDate}
                                endDate={project.endDate}
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
    } else if(!isLoading) {
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


export default ProjectList;