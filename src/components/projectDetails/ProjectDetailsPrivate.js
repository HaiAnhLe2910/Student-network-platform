import React, { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import { Modal} from 'react-bootstrap';

import { List, Avatar } from 'antd';
import { Pagination } from 'antd';
import "antd/dist/antd.css";

import useWindowSize from "@wbe/use-window-size";

import axios from '../config.js';

import { useHistory } from "react-router-dom";

import { useToasts} from 'react-toast-notifications';

import { Link } from 'react-router-dom';

import { Ring } from 'react-awesome-spinners'

const ProjectDetailsPrivate = (props) => {

    var requestsData = [];

    const [requestsDataFull, setRequestsDataFull] = useState();

    const { width, height } = useWindowSize();

    const [projectDescription, setProjectDescription] = useState(props.projectDetails.description);

    const [requestsDataUS, setRequestsDataUS] = useState([]);

    const [members, setMembers] = useState(props.arrayofSpots);

    let arrayofMembersToBeDeleted = [];

    let arrayofRequestsToBeRejected= [];
    let arrayofRequestsToBeAccept= [];

    const { addToast } = useToasts();

    const [arrayofRequestsToBeAcceptUS, setArrayofRequestsToBeAcceptUS] = useState([]);

    const [showRequests, setShowRequests] = useState(4);

    const [updateSucces, setUpdateSucces] = useState(false);

    const [studentRemoved, setStudentRemoved] = useState(false);

    const [numberofMembersInProject, setNumberofMembersInProject] = useState(props.numberofMembersInProject);
    const [totalNumberofMembers, setTotalNumberofMembers] = useState(props.totalNumberofMembers);

    let sum = 4;

    const history = useHistory();

    const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);

    const [showRemoveStudentModal, setShowRemoveStudentModal] = useState(false);

    const handleDeleteProjectClose = () => setShowDeleteProjectModal(false);

    const handleDeleteProjectShow = () => setShowDeleteProjectModal(true);


    const handleRemoveStudentClose = () => setShowRemoveStudentModal(false);

    const handleRemoveStudentShow = () => setShowRemoveStudentModal(true);

    
    const fetchRequests = (t) => {
            
            axios.get('projects/'+t+'/requests')
        .then(res => {

            console.log(res);

            console.log(props.projectDetails);

            for (var i = 0; i < res.data.length; i++) {
                var spotDescription = 'Unavailable';

                for(var l = 0; l < props.projectDetails.spots.length; l++){

                    if(props.projectDetails.spots[l].id == res.data[i].spotId){
                        spotDescription = props.projectDetails.spots[l].description;
                    }
                }

                requestsData.push(
                    {
                        id:i,
                        requestId:res.data[i].id,
                        title: res.data[i].fontysId,
                        image: res.data[i].photo,
                        spotDescription: spotDescription,
                        studentid:res.data[i].studentid,
                    } 
                );
            }   

            setRequestsDataFull(requestsData);
            
            setRequestsDataUS(requestsData.slice(0, showRequests));
        })
        .catch(error => {
            console.log(error.response);
        });     
    }

    useEffect(() => {
        console.log(props);
        fetchRequests(props.projectDetails.id);
    }, [])
    

    const data = [
        {
          title: 'Ant Design Title 1',
          description: 'Ant Design, discription 1',
          image: '/images/cat.PNG',
        },
        {
          title: 'Ant Design Title 2',
          description: 'Ant Design, discription 2',
          image: '/images/cat.PNG',
        },
        {
          title: 'Ant Design Title 3',
          description: 'Ant Design, discription 3',
          image: '/images/cat.PNG',
        },
        {
          title: 'Ant Design Title 4',
          description: 'Ant Design, discription 4',
          image: '/images/cat.PNG',
        },
    ];

    const onChangePagination = (e) => {
        console.log(e);
    }

    const handleDescriptionChange = (e) => {
        setProjectDescription(e.target.value);
    }

    const onClickUpdate = () => {

        const data = { id: props.projectDetails.id,description: projectDescription };
        
        axios.post('projects/' + props.projectDetails.ownerId ,data)
            .then(res => {
                
                addToast("Project updated successfully!", {
                    appearance: 'success',
                    autoDismiss: true
                });
            })
            .catch(error => {
                console.log(error);
                addToast("Error updating project", {
                    appearance: 'error',
                    autoDismiss: true
                });
            })
    }

    const onClickDelete = () => {
        axios.delete('projects/' + props.projectDetails.id + '/'+ props.projectDetails.ownerId)
            .then(res => {
                localStorage.setItem('projectDeleted',true);
                history.push("/home");
            })
            .catch(error => {
                console.log(error);
            })
    }

    const onClickRemoveButton = (t) => {
        
        axios.delete('projects/' + props.projectDetails.id + '/'+ t+'/' + props.projectDetails.ownerId + '/student')
            .then(res => {

                axios.get('projects/' + props.projectDetails.id)
                .then(res => {

                    let arrayofSpots = [];

                    for (var i = 0; i < res.data.spots.length; i++) {
                        let skillsText = "";

                    if(res.data.spots[i].skills.length == 0){
                        skillsText = "None";
                    }

                    for(var p = 0; p < res.data.spots[i].skills.length; p++){

                        if(skillsText == ""){
                            skillsText = res.data.spots[i].skills[p].title;
                        }else{
                            skillsText += ", " + res.data.spots[i].skills[p].title;
                        }
                        

                    }
                        if(res.data.spots[i].studentId != null){
                            arrayofSpots.push({
                                id:res.data.spots[i].studentId,
                                title: res.data.spots[i].student[0].fontysId,
                                description: res.data.spots[i].description,
                                image: res.data.spots[i].student[0].photo,
                                owner: res.data.spots[i].studentId == res.data.ownerId,
                                empty: false,
                                skills: skillsText,
                              });
                        }else{
                            arrayofSpots.push({
                                id:0,
                                title: res.data.spots[i].description,
                                description: "No member yet",
                                image: "images/sendRequest.png",
                                owner: false,
                                empty: true,
                                skills: skillsText,
                        });
                        }
                    }

                    setMembers(arrayofSpots);

                    addToast("Student removed successfully!", {
                        appearance: 'success',
                        autoDismiss: true
                    });

                    setNumberofMembersInProject(numberofMembersInProject - 1);
                })
                .catch(error => {
                    console.log(error);
                    addToast("Error removing student", {
                        appearance: 'error',
                        autoDismiss: true
                    });
                });

            })
            .catch(error => {
                console.log(error);
                addToast("Error removing student", {
                    appearance: 'error',
                    autoDismiss: true
                });
            })

    }

    const handleShowMore = () => {
        requestsData = requestsDataFull; 

        sum = showRequests + 5;

        console.log(sum);

        setShowRequests(sum);
        
        requestsData = requestsData.slice(0, sum);

        setRequestsDataUS(requestsData);
    }

    const handleAcceptRequest = (t, requestId) => {

        axios.delete('projects/requests/accept/' + requestId +'/' + props.projectDetails.ownerId )
            .then(res => {



                axios.get('projects/' + props.projectDetails.id)
            .then(res => {

                var membersArray = [];

                for (var i = 0; i < res.data.spots.length; i++) {

                    let skillsText = "";

                    if(res.data.spots[i].skills.length == 0){
                        skillsText = "None";
                    }

                    for(var p = 0; p < res.data.spots[i].skills.length; p++){

                        if(skillsText == ""){
                            skillsText = res.data.spots[i].skills[p].title;
                        }else{
                            skillsText += ", " + res.data.spots[i].skills[p].title;
                        }
                        

                    }

                    if(res.data.spots[i].studentId != null){
                        membersArray.push({
                            id:res.data.spots[i].studentId,
                            title: res.data.spots[i].student[0].fontysId,
                            description: res.data.spots[i].description,
                            image: res.data.spots[i].student[0].photo,
                            owner: res.data.spots[i].studentId == res.data.ownerId,
                            empty: false,
                            skills: skillsText,
                          });
                    }else{
                        membersArray.push({
                            id:0,
                            title: res.data.spots[i].description,
                            description: "No member yet",
                            image: "images/sendRequest.png",
                            owner: false,
                            empty: true,
                            skills: skillsText,
                    });
                }
                }

                setMembers(membersArray);

            })
            .catch(error => {
                console.log(error);
            });

                arrayofRequestsToBeAccept = arrayofRequestsToBeAcceptUS;

                arrayofRequestsToBeAccept.push({
                    id:t,
                });
        
                setArrayofRequestsToBeAcceptUS(arrayofRequestsToBeAccept);
        
                let tempArray = [];
        
                requestsData = requestsDataFull; 
        
                for(var i = 0; i < requestsData.length; i++){
        
                    if(requestsData[i].id != t){
                        tempArray.push(
                            {
                                id:requestsData[i].id,
                                title: requestsData[i].title,
                                image: requestsData[i].image,
                                requestId:requestsData[i].requestId,
                                spotDescription: requestsData[i].spotDescription,
                                studentid:requestsData[i].studentid,
                            } 
                        );
                    }
                }
        
        
                setRequestsDataFull(tempArray);
        
        
                requestsData = tempArray.slice(0, showRequests);
        
                setRequestsDataUS(requestsData);

                addToast("Student accepted!", {
                    appearance: 'success',
                    autoDismiss: true
                });

                setNumberofMembersInProject(numberofMembersInProject + 1);
             
        })
        .catch(error => {
            console.log(error);

            addToast("Error accepting student", {
                appearance: 'error',
                autoDismiss: true
            });
        })

    }

    const handleRejectRequest = (t, requestId) => {


        axios.delete('projects/requests/reject/' + requestId +'/' + props.projectDetails.ownerId )
            .then(res => {
                arrayofRequestsToBeRejected.push({
                    id:t,
                });
        
                let tempArray = [];
                requestsData = requestsDataFull; 
        
                for(var i = 0; i < requestsData.length; i++){
        
                    if(requestsData[i].id != t){
                        tempArray.push(
                            {
                                id:requestsData[i].id,
                                title: requestsData[i].title,
                                image: requestsData[i].image,
                                requestId:requestsData[i].requestId,
                                spotDescription: requestsData[i].spotDescription,
                                studentid:requestsData[i].studentid,
                            } 
                        );
                    }
                }
        
                setRequestsDataFull(tempArray);
                requestsData = tempArray.slice(0, showRequests);
                setRequestsDataUS(requestsData);

                addToast("Student rejected", {
                    appearance: 'success',
                    autoDismiss: true
                });
             
        })
        .catch(error => {
            console.log(error);

            addToast("Error rejecting student", {
                appearance: 'error',
                autoDismiss: true
            });
        })

        

    }

    if (width > 1000) {

        return (
            <div style={{paddingBottom: '3%'}}>
                <div><h2 style={{textAlign: 'center', padding: '3%'}}>{props.projectDetails.name}</h2></div>

                <Modal show={showDeleteProjectModal} onHide={handleDeleteProjectClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Delete Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete the project?</Modal.Body>
                    <Modal.Footer>
                    <Button style={{ display:'inlineBlock', color: 'black', backgroundColor:'#E5E5E5', borderColor: '#E5E5E5'}} onClick={handleDeleteProjectClose}>
                        Cancel
                    </Button>
                    <Button style={{ color: '#E5E5E5', backgroundColor:'#D9534F', borderColor: '#D9534F'}} onClick={onClickDelete}>
                        Delete
                    </Button>
                    </Modal.Footer>
                </Modal>
                
                <Container >
                    <Row>
                        <Col sm={8}>
                            <div>
                                {updateSucces && 
                                <Alert  variant='success'>
                                    Project description updated!
                                </Alert>}
                                <br></br>
                                <form class="ui form">
                                    <textarea onChange={handleDescriptionChange} style={{width: '100%', borderWidth: '1px', borderColor: '#ededeb', borderRadius: '5px' }} placeholder="Project description" rows="17">{props.projectDetails.description}</textarea>
                                </form>
                            </div>
                            <div style={{paddingTop:'3%'}}> 
                                <Button onClick={onClickUpdate}  style={{ display:'inlineBlock',color: 'black', backgroundColor:'#E9C46A', borderColor: '#E9C46A'}}>
                                    Update Project
                                </Button>
                                <Button disabled style={{ display:'inlineBlock', color: 'white', backgroundColor:'white', borderColor: 'white'}}></Button>
                                <Button onClick={handleDeleteProjectShow}  style={{ display:'inlineBlock', color: '#E5E5E5', backgroundColor:'#D9534F', borderColor: '#D9534F'}}>
                                    Delete Project
                                </Button>
                            </div>
                            <div style={{paddingTop:'3%'}}>
                                <h4 style={{paddingBottom:'1%'}}>Pending Requests</h4>
                                <div style={{borderStyle: 'solid',borderRadius: '5px', borderWidth: '1px', paddingLeft: '10px', paddingRight: '10px', borderColor: '#ededeb'}}> 
                                    
                                    {requestsDataUS.length > 0 &&
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={requestsDataUS}
                                            renderItem={item => (
                                            <List.Item>
                                                <List.Item.Meta
                                                avatar={<Avatar size={64} src={item.image} />}
                                                title={<div>{item.title} <Link to={{ pathname: "/profilePublic", data: {student:item.studentid, project: props.projectDetails.id} }}>
                                                    <Button  variant="primary" style={{ color: 'black', backgroundColor:'#E9C46A', borderColor: '#E9C46A'}}>
                                                    View Profile
                                                    </Button>
                                                </Link> </div>}
                                                description={<div>Applied for <b>{item.spotDescription}</b>  spot</div>}
                                                />
                                                <Button onClick={() => handleAcceptRequest(item.id, item.requestId)} variant="primary" style={{ color: '#E5E5E5', backgroundColor:'#71bc7a', borderColor: '#71bc7a'}}>
                                                    Accept
                                                </Button>
                                                <div style={{paddingLeft:'10px'}}></div>
                                                <Button onClick={() => handleRejectRequest(item.id, item.requestId)} variant="primary" style={{ color: '#E5E5E5', backgroundColor:'#D9534F', borderColor: '#D9534F'}}>
                                                    Reject
                                                </Button>
                                            </List.Item>
                                            )}
                                        />
                                    } 
                                    {requestsDataUS.length == 0 &&
                                            <div>
                                            No requests
                                            </div>
                                    } 
                                    {showRequests <= requestsDataUS.length &&
                                        <Button className="button-primary" onClick={handleShowMore} style={{ marginBottom: '1vh' }}>
                                            Show more requests
                                        </Button>
                                    }
                                    
                                </div>
                            </div>
                        </Col>
                        <Col sm={4}>
                            <br></br>
                        <div style={{borderStyle: 'solid',borderRadius: '5px', borderWidth: '1px', paddingLeft: '10px', paddingRight: '10px', borderColor: '#ededeb'}}> 
                                <div><h3 style={{textAlign: 'center', padding: '0%', width: '100%'}}>Project Owner</h3></div>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={props.projectOwner}
                                    renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar size={64} src={item.image} />}
                                            title={<div>{item.title}<Link to={{ pathname: "/profilePublic", data: {student:item.ownerId, project: props.projectDetails.id} }}>
                                            <Button  variant="primary" style={{padding:'3px', fontSize: '7px', color: 'black', backgroundColor:'#E9C46A', borderColor: '#E9C46A'}}>
                                            View Profile
                                            </Button>
                                            </Link></div>}
                                            description={<div>{item.description}</div>}
                                        />
                                    </List.Item>
                                    )}
                                /> 
                        </div>
                        <br></br>
                            {studentRemoved && 
                            <Alert  variant='success'>
                                Student removed!
                            </Alert>}
                            <br></br>
                            
                            <div style={{borderStyle: 'solid',borderRadius: '5px', borderWidth: '1px', paddingLeft: '10px', paddingRight: '10px', borderColor: '#ededeb'}}> 
                                <div><h3 style={{textAlign: 'center', padding: '0%', width: '100%'}}>Project Members({numberofMembersInProject}/{totalNumberofMembers})</h3></div>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={members}
                                    renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar size={64} src={item.image} />}
                                            title={<div>{item.title}  
                                            {!item.owner && !item.empty && <Link to={{ pathname: "/profilePublic", data: {student:item.id, project: props.projectDetails.id} }}>
                                                <div style={{paddingLeft:'3px'}}></div><Button  variant="primary" style={{ padding:'3px', fontSize: '7px', color: 'black', backgroundColor:'#E9C46A', borderColor: '#E9C46A'}}>
                                                    View Profile
                                                </Button>
                                            </Link>}
                                            {item.owner && <div style={{color:'gray', fontSize: '10px'}}>Project Owner<b style={{color:'black'}}>(You)</b></div>}</div>}
                                            description={<div>{item.description}<div style={{ color:'gray', fontSize: '10px'}}>Skills required: {item.skills}</div></div>}
                                        />  
                                        {!item.owner && !item.empty && <button style={{backgroundColor: 'white', border: 'none'}} onClick={() => onClickRemoveButton(item.id)}><h2 style={{color: 'black'}}>x</h2></button>}

                                    </List.Item>
                                    )}
                                /> 
                            </div>
                            
                        </Col>
                    </Row>
                </Container>

            </div>
            
        );
    }  
    
    return (
        <div style={{padding: '3%'}}>
            <div><h2 style={{textAlign: 'center', padding: '3%'}}>{props.projectDetails.name}</h2></div>

                        <div>
                            <form class="ui form">
                                <textarea onChange={handleDescriptionChange} style={{width: '100%', borderWidth: '1px', borderColor: '#ededeb', borderRadius: '5px' }} placeholder="Project description" rows="7">{props.projectDetails.description}</textarea>
                            </form>
                        </div>
                        <div style={{paddingTop:'3%', paddingBottom: '3%'}}> 
                            <Button onClick={onClickUpdate}  style={{ display:'inlineBlock',color: 'black', backgroundColor:'#E9C46A', borderColor: '#E9C46A'}}>
                                Update Project
                            </Button>
                            <Button disabled style={{ display:'inlineBlock', color: 'white', backgroundColor:'white', borderColor: 'white'}}></Button>
                            <Button onClick={onClickDelete}  style={{ display:'inlineBlock', color: '#E5E5E5', backgroundColor:'#D9534F', borderColor: '#D9534F'}}>
                                Delete Project
                            </Button>
                        </div>
                        <div style={{paddingTop:'3%', paddingBottom: '3%',borderStyle: 'solid',borderRadius: '5px', borderWidth: '1px', paddingLeft: '10px', paddingRight: '10px', borderColor: '#ededeb'}}> 
                            <div><h3 style={{textAlign: 'center', padding: '0%', width: '100%'}}>Project Owner</h3></div>
                            <List
                                    itemLayout="horizontal"
                                    dataSource={props.projectOwner}
                                    renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar size={64} src={item.image} />}
                                            title={<div>{item.title}<Link to={{ pathname: "/profilePublic", data: {student:item.ownerId, project: props.projectDetails.id} }}>
                                            <Button  variant="primary" style={{padding:'3px', fontSize: '7px', color: 'black', backgroundColor:'#E9C46A', borderColor: '#E9C46A'}}>
                                            View Profile
                                            </Button>
                                            </Link></div>}
                                            description={<div>{item.description}</div>}
                                        />
                                    </List.Item>
                                    )}
                                />  
                        </div>
                        <br></br>
                        <div style={{borderStyle: 'solid',borderRadius: '5px', borderWidth: '1px', paddingLeft: '10px', paddingRight: '10px', borderColor: '#ededeb'}}> 
                            <div><h3 style={{textAlign: 'center', padding: '0%', width: '100%'}}>Project Members({numberofMembersInProject}/{totalNumberofMembers})</h3></div>
                            <List
                                itemLayout="horizontal"
                                dataSource={members}
                                renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar size={64} src={item.image} />}
                                        title={<div>{item.title}
                                        {!item.owner && !item.empty && <Link to={{ pathname: "/profilePublic", data: {student:item.id, project: props.projectDetails.id} }}>
                                                <div style={{paddingLeft:'3px'}}></div><Button  variant="primary" style={{ padding:'3px', fontSize: '7px', color: 'black', backgroundColor:'#E9C46A', borderColor: '#E9C46A'}}>
                                                    View Profile
                                                </Button>
                                        </Link>}
                                        {item.owner && <div style={{color:'gray', fontSize: '10px'}}>Project Owner<b style={{color:'black'}}>(You)</b></div>}</div>}
                                        description={<div>{item.description}<div style={{ color:'gray', fontSize: '10px'}}>Skills required: {item.skills}</div></div>}
                                    />
                                    {!item.owner && !item.empty && <button style={{backgroundColor: 'white', border: 'none'}} onClick={() => onClickRemoveButton(item.id)}><h2 style={{color: 'black'}}>x</h2></button>}
                                </List.Item>
                                )}
                            /> 
                        </div>
                        <div style={{paddingTop:'3%'}}>
                            <h4 style={{paddingBottom:'1%'}}>Pending Requests</h4>
                            <div style={{borderStyle: 'solid',borderRadius: '5px', borderWidth: '1px', paddingLeft: '10px', paddingRight: '10px', borderColor: '#ededeb'}}> 
                                
                                {requestsDataUS.length > 0 &&
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={requestsDataUS}
                                            renderItem={item => (
                                            <List.Item>
                                                <List.Item.Meta
                                                avatar={<Avatar size={64} src={item.image} />}
                                                title={<div>{item.title} <Link style={{ color:'blue', fontSize: '10px'}} to={{ pathname: "/profilePublic", data: {student:item.studentid, project: props.projectDetails.id} }}>
                                                    view profile
                                                </Link> </div>}
                                                description={<div>Applied for <b>{item.spotDescription}</b>  spot</div>}
                                                />
                                                <Button onClick={() => handleAcceptRequest(item.id, item.requestId)} variant="primary" style={{  color: '#E5E5E5', backgroundColor:'#71bc7a', borderColor: '#71bc7a'}}>
                                                    A
                                                </Button>
                                                <div style={{paddingLeft:'10px'}}></div>
                                                <Button onClick={() => handleRejectRequest(item.id, item.requestId)} variant="primary" style={{ color: '#E5E5E5', backgroundColor:'#D9534F', borderColor: '#D9534F'}}>
                                                    R
                                                </Button>
                                            </List.Item>
                                            )}
                                        />
                                    } 
                                    {requestsDataUS.length == 0 &&
                                            <div>
                                            No requests
                                            </div>
                                    } 
                                    {showRequests <= requestsDataUS.length &&
                                        <Button className="button-primary" onClick={handleShowMore} style={{ marginBottom: '1vh' }}>
                                            Show more requests
                                        </Button>
                                    }
                            </div>
                        </div>

        </div>
        
    );
}
export default ProjectDetailsPrivate;
