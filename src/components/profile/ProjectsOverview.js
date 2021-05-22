import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
// icons
import ErrorIcon from'@material-ui/icons/Error';

const ProjectsOverview = (props) => {
    
    let content = null; 

    // check if user has projects 
    if(props.ownedProject.length === 0 && props.joinedProject.length === 0){
        // if the user has no projects show a message
        content = props.private ? <p><ErrorIcon/> &nbsp; You have no projects yet.</p> : <p><ErrorIcon/> &nbsp; {props.student.givenName} has no projects yet.</p>;
    }else{
        // if the user has projects show the owned and joined projecs
        content = <>
               {/* owned projects */}
                <h6>Owned Projects</h6>
                {
                    //    if there are owned projects show the first 3 (+message if there are more)
                    props.ownedProject.length > 0 ? 
                    
                    <>
                        <CardColumns>
                            {
                                props.ownedProject.slice(0,3).map((project, index) =>{
                                    return <Link to= {{ pathname: "/projectdetails", data: project.id}} key={index} style={{color:"black"}}>
                                        <Card className="text-center" style={{height: "100px"}}>
                                            <Card.Body 
                                                style={{
                                                    height: "100px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent:"center"
                                                }}>
                                                <Card.Title>{project.name}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                })
                            }
                        </CardColumns> 
                        {
                            // if the user has more than 3 owned projects show message
                            props.ownedProject.length > 3 && <p style={{textAlign:"right"}}>+ {props.ownedProject.length-3} more project{props.ownedProject.length - 3 > 1 && "s"}</p>
                        }
                    </>: 
                    // if there are no owned projects show message
                    props.private ? 
                    <p><ErrorIcon/> &nbsp; You do not own any projects.</p> : <p><ErrorIcon/> {props.student.givenName} doesn't own any projects.</p>
                }

                {/* link to the user's my projects page (owned)*/}
                {
                    (props.private && props.ownedProject.length > 0 ) ?
                    <Link to={{ pathname: "/myProjects", data: props.student.id }} className="routeLink">
                        <Button
                            className="button-primary"
                            onClick={() => console.log("view all projects btn click")}
                            style={{margin:"20px 0"}}>
                            View All Owned Projects
                        </Button>
                    </Link>:""
                }


               {/* joined projects */}
               <h6>Joined Projects</h6>
                {
                    //    if there are joined projects show the first 3 (+message if there are more)
                    (props.joinedProject.length > 0 )  ? 
                    <>
                        <CardColumns>
                            {
                                props.joinedProject.slice(0,3).map((project, index) =>
                                    <Link to= {{ pathname: "/projectdetails", data: project.project.id}} key={index} style={{color:"black"}}>
                                        <Card className="text-center" style={{height: "100px"}}>
                                            <Card.Body 
                                                style={{
                                                    height: "100px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent:"center"
                                                }}>
                                                <Card.Title>{project.project.name}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                )
                            }
                        </CardColumns> 
                        {
                            // if the user has more than 3 owned projects show message
                            props.joinedProject.length > 3 && <p style={{textAlign:"right"}}>+ {props.joinedProject.length-3} more project{props.joinedProject.length - 3 > 1 && "s"}</p>
                        }
                    </>:
                    // if there are no joined projects show message
                    props.private ? 
                    <p><ErrorIcon/> &nbsp; You have not joined any projects</p> : <p><ErrorIcon/> {props.student.givenName} hasn't joined any projects</p>
                }

                {/* link to the user's my projects page (owned)*/}
                {
                    (props.private && props.joinedProject.length > 0 ) ?
                    <Link to={{ pathname: "/joinedProjects", data: props.student.id }} className="routeLink">
                        <Button
                            className="button-primary"
                            onClick={() => console.log("view all projects btn click")}
                            style={{margin:"20px 0"}}>
                            View All Joined Projects
                        </Button>
                    </Link>:""
                }
                
        </>
    }

    return (
        <>
            <h2>Projects</h2>
            {content}
        </>
    )
}

export default ProjectsOverview;
