import React from 'react';
import { Card, Image, Button } from 'react-bootstrap';
import '../Common/Button.css';
import { Link } from 'react-router-dom';

const ProjectItem = (props) => {
    return (
        <Card style={{ marginBottom: '20px' }}>
            <Card.Body>
                <div id='header'>
                    <Card.Title><h2>{props.projName}</h2></Card.Title>
                </div>

                 <div id='category' style={{ float: 'right', paddingBottom: '2vh' }}>
                    <p>Category:<b> {props.projCategory} </b></p>
                </div> 

                {
                    (props.userImg && props.userName) ?
                        (<div id='owner' style={{ paddingBottom: '2vh' }}>
                            <Image
                                src={props.userImg}
                                alt="user pic"
                                width="30px"
                                height="30px"
                                roundedCircle
                            />
                            <label style={{ paddingLeft: '15px' }}><i>{props.userName}</i></label>
                        </div>) :
                        (<p></p>)
                        
                }

                <div id='description' style={{ paddingBottom: '1vh' }}>
                    <Card.Text>
                        {props.projDes}
                    </Card.Text>
                </div>

                <div id='startDate' style={{ paddingBottom: '1vh' }}>
                    <p><b>Start date:</b>  {props.startDate} </p>
                </div>
                <div id='endDate' style={{ paddingBottom: '1vh' }}>
                    <p><b>End date:</b> {props.endDate} </p>
                </div>

                <div id='btnReadmore' className='text-right'>
                    <Link to={{ pathname: "/projectdetails", data: props.projId }}>
                        <Button className='button-secondary' >{">"} </Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>

    );
}

export default ProjectItem;