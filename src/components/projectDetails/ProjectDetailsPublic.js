import React from 'react';

import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import { List, Avatar } from 'antd';
import { Pagination } from 'antd';
import "antd/dist/antd.css";

import useWindowSize from "@wbe/use-window-size";

import { useState, useEffect } from 'react';

import axios from '../config.js';

import Alert from 'react-bootstrap/Alert';
import { useToasts} from 'react-toast-notifications';

import { Link } from 'react-router-dom';



const ProjectDetailsPublic = (props) => {
    
    const { width, height } = useWindowSize();

    const [isLoading, setIsLoading] = useState(false);

    const [requests, setRequests] = useState();

    const [arrayofSpots, setArrayofSpots] = useState(props.arrayofSpots);

    const [buttonClickedOnce, seButtonClickedOnce] = useState(false);

    const [requestSent, setRequestSent] = useState(false);

    const { addToast } = useToasts();

    const handleRequestClick = (t) => {

        const data = { spotId: t.spotId, projectId: props.projectDetails.id, studentId: props.userId};

        console.log(data);
        
        axios.post('projects/requests',data)
            .then(res => {

                let tempArray = [];

                for(var i = 0; i < arrayofSpots.length; i++){

                    if(arrayofSpots[i].spotId == t.spotId){

                        tempArray.push({
                            studentId:arrayofSpots[i].studentId,
                            spotId:arrayofSpots[i].spotId,
                            title: arrayofSpots[i].title,
                            description: arrayofSpots[i].description,
                            image: arrayofSpots[i].image,
                            spotFree:arrayofSpots[i].spotFree,
                            alreadyApplied:true,
                            skills:arrayofSpots[i].skills,
                            owner:arrayofSpots[i].owner,
                          });
                    }else{
                        tempArray.push({
                            studentId:arrayofSpots[i].studentId,
                            spotId:arrayofSpots[i].spotId,
                            title: arrayofSpots[i].title,
                            description: arrayofSpots[i].description,
                            image: arrayofSpots[i].image,
                            spotFree:arrayofSpots[i].spotFree,
                            alreadyApplied:arrayofSpots[i].alreadyApplied,
                            skills:arrayofSpots[i].skills,
                            owner:arrayofSpots[i].owner,
                          }); 
                    }
                }

                setArrayofSpots(tempArray);

                addToast("Request successfully sent!", {
                    appearance: 'success',
                    autoDismiss: true
                });


            })
            .catch(error => {
                console.log(error);
                addToast("Error sending request", {
                    appearance: 'error',
                    autoDismiss: true
                });
            })
    }

    useEffect(() => {
        console.log(props.arrayofSpots);
        fetchRequestData();
    }, [])

    const fetchRequestData = () => {
        setIsLoading(true);
      
        axios.get('projects/'+props.projectDetails.id+'/requests')
                      .then(res => {

                        let alreadyAppliedSpots = [];
                                             
                        for(var i = 0; i < res.data.length; i++){
                            if(props.userId == res.data[i].studentid){
                                alreadyAppliedSpots.push({
                                    spotId:res.data[i].spotId,
                                });
                            }
                        }

                        

                        let tempArray = [];

                        for(var i = 0; i < props.arrayofSpots.length; i++){

                            var alreadyAdded = false;

                            console.log(alreadyAppliedSpots);

                            for(var j = 0; j < alreadyAppliedSpots.length; j++){

                                console.log('is ' + props.arrayofSpots[i].spotId + ' = to ' + alreadyAppliedSpots[j].spotId);

                                if(props.arrayofSpots[i].spotId == alreadyAppliedSpots[j].spotId){

                                    console.log('true');

                                    tempArray.push({
                                        studentId:props.arrayofSpots[i].studentId,
                                        spotId:props.arrayofSpots[i].spotId,
                                        title: props.arrayofSpots[i].title,
                                        description: props.arrayofSpots[i].description,
                                        image: props.arrayofSpots[i].image,
                                        spotFree:props.arrayofSpots[i].spotFree,
                                        alreadyApplied:true,
                                        skills: props.arrayofSpots[i].skills,
                                        owner: props.arrayofSpots[i].owner,
                                      });

                                      

                                      alreadyAdded = true;
                                }
                            }

                            if(!alreadyAdded){
                                tempArray.push({
                                    studentId:props.arrayofSpots[i].studentId,
                                    spotId:props.arrayofSpots[i].spotId,
                                    title: props.arrayofSpots[i].title,
                                    description: props.arrayofSpots[i].description,
                                    image: props.arrayofSpots[i].image,
                                    spotFree:props.arrayofSpots[i].spotFree,
                                    alreadyApplied:false,
                                    skills: props.arrayofSpots[i].skills,
                                    owner: props.arrayofSpots[i].owner,
                                  });
                            }

                            
                        }

                        setArrayofSpots(tempArray);

                        setIsLoading(false);     
                        
                      })
                      .catch(error => {
                          console.log(error);
                      });
    }
    

    
    if (width > 1000) {

        return (
            <div style={{paddingBottom: '3%'}}>
                <div><h2 style={{textAlign: 'center', padding: '3%'}}>{props.projectDetails.name}</h2></div>
                <Container >
                    <Row>
                        <Col sm={8}>
                            {requestSent && 
                                <Alert  variant='success'>
                                    Request sent to join project
                                </Alert>}
                            <div>
                                {props.projectDetails.description}
                            </div>
                        </Col>
                        <Col sm={4}>
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
                            <div style={{borderStyle: 'solid',borderRadius: '5px', borderWidth: '1px', paddingLeft: '10px', paddingRight: '10px', borderColor: '#ededeb'}}> 
                                <div><h3 style={{textAlign: 'center', padding: '0%', width: '100%'}}>Project Members</h3></div>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={arrayofSpots}
                                    renderItem={item => (
                                    <List.Item>
                                        {!item.spotFree && <List.Item.Meta
                                            avatar={<Avatar size={64} src={item.image} />}
                                            title={<div>{item.title}<Link to={{ pathname: "/profilePublic", data: {student:item.studentId, project: props.projectDetails.id} }}>
                                            <Button  variant="primary" style={{padding:'3px', fontSize: '7px', color: 'black', backgroundColor:'#E9C46A', borderColor: '#E9C46A'}}>
                                            View Profile
                                            </Button>
                                            </Link>
                                            <div style={{ color:'gray', fontSize: '10px'}}>Skills required: {item.skills}</div></div>}
                                            description={<div>
                                                {item.owner && <div style={{color:'black'}}>Project Owner</div>}
                                                <div>{item.description}</div></div>}
                                        />}
                                        {item.spotFree && !item.alreadyApplied && <List.Item.Meta 
                                            avatar={<Avatar size={64} src="images/sendRequest.png" />}
                                            title={<div>{item.description}<div style={{ color:'gray', fontSize: '10px'}}>Skills required: {item.skills}</div></div>}
                                            description={<Button onClick={() => handleRequestClick(item)} style={{ display:'inlineBlock',color: 'black', backgroundColor:'#E9C46A', borderColor: '#E9C46A'}}>send request to join</Button>}
                                        />}
                                        {item.spotFree && item.alreadyApplied && <List.Item.Meta 
                                            avatar={<Avatar size={64} src="images/applied.png" />}
                                            title={<div>{item.description}<div style={{ color:'gray', fontSize: '10px'}}>Skills required: {item.skills}</div></div>}
                                            description={<div style={{color:'green'}}>applied</div>}
                                        />}
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
                            {props.projectDetails.description}
                        </div>
                        <div style={{paddingTop:'3%', paddingBottom: '3%',visibility: 'hidden' }}> 
                            asdasdsad
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
                        <div style={{paddingTop:'3%', paddingBottom: '3%',borderStyle: 'solid',borderRadius: '5px', borderWidth: '1px', paddingLeft: '10px', paddingRight: '10px', borderColor: '#ededeb'}}> 
                            <div><h3 style={{textAlign: 'center', padding: '0%', width: '100%'}}>Project Members</h3></div>
                            <List
                                    itemLayout="horizontal"
                                    dataSource={arrayofSpots}
                                    renderItem={item => (
                                    <List.Item>
                                        {!item.spotFree && <List.Item.Meta
                                            avatar={<Avatar size={64} src={item.image} />}
                                            title={<div>{item.title}<Link to={{ pathname: "/profilePublic", data: {student:item.studentId, project: props.projectDetails.id} }}>
                                            <Button  variant="primary" style={{padding:'3px', fontSize: '7px', color: 'black', backgroundColor:'#E9C46A', borderColor: '#E9C46A'}}>
                                            View Profile
                                            </Button>
                                            </Link><div style={{ color:'gray', fontSize: '10px'}}>Skills required: {item.skills}</div></div>}
                                            description={<div><div>
                                                {item.owner && <div style={{color:'black'}}>Project Owner</div>}
                                                {item.description}</div></div>}
                                        />}
                                        {item.spotFree && !item.alreadyApplied && <List.Item.Meta 
                                            avatar={<Avatar size={64} src="images/sendRequest.png" />}
                                            title={<div>{item.description}<div style={{ color:'gray', fontSize: '10px'}}>Skills required: {item.skills}</div></div>}
                                            description={<Button onClick={() => handleRequestClick(item)} style={{ display:'inlineBlock',color: 'black', backgroundColor:'#E9C46A', borderColor: '#E9C46A'}}>send request to join</Button>}
                                        />}
                                        {item.spotFree && item.alreadyApplied && <List.Item.Meta 
                                            avatar={<Avatar size={64} src="images/applied.png" />}
                                            title={<div>{item.description}<div style={{ color:'gray', fontSize: '10px'}}>Skills required: {item.skills}</div></div>}
                                            description={<div style={{color:'green'}}>applied</div>}
                                        />}
                                    </List.Item>
                                    )}
                                />  
                        </div>

        </div>
        
    );
}
export default ProjectDetailsPublic;