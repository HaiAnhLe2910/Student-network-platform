import React, { useState } from 'react';
//form and modal
import { useForm } from "react-hook-form";
import { RHFInput } from 'react-hook-form-input';
import { Button, Modal, Form, FormGroup } from 'react-bootstrap';

// notifactions
import { useToasts} from 'react-toast-notifications'

import ErrorIcon from '@material-ui/icons/Error';
import CreateIcon from '@material-ui/icons/Create';
import axios from "../config.js";

const About = (props) => {
    return (
        <div className="about-container">
            <h2>About</h2>
            <p>{props.description}</p>
        </div>
    );
}

const AboutEdit = (props) => {

    const [description] = useState(props.description);
    const [student] = useState(props.student);
    const [modalShow, setModalShow] = useState(false);
    const [descriptionEmpty, setDescriptionEmpty] = useState(false);
    var [disabled, setDisabled] = useState(false);
    var [charLeft, setCharLeft] = useState(description?description.length:0);
    var [inputValue, setInputValue] = useState(description);
    // notifications
    const { addToast } = useToasts()
    //content
    let content = null;

    const QS = require('querystring');
    // states form
    const { register, handleSubmit, errors, setValue, reset } = useForm();
   /**
     * Update the user's description in the database
     * @param {*} value the new description value the user has provided
     */
    const updateDescription = (value) => {

        // make API Request Body
        const requestBody = {
            givenName: student.givenName,
            surName: student.surName,
            initials: student.initials,
            displayName: student.displayName,
            description: value
        };

        // API call
        axios.put('/student/me', QS.stringify(requestBody))
            .then((res) => {
                if(res.status === 200){
                    // enable button for next time
                    setDisabled(false);
                    // show success notification
                    addToast("Description successfully updated!", {
                        appearance: 'success',
                        autoDismiss: true
                      })
                    // pass updated value to parent
                    props.onChange(value);
                    // close the modal
                    handleModal();
                }
            })
            .catch((error) => {
                console.error(error.response);
            });
    }

    /**
     * This method handles the changes the usr makes to the description
     * @param {*} e event
     */
    const handleChange = (e) => {
        if(e.target.value === "" && e.target.value.length === 0){
            setDescriptionEmpty(true);
            setCharLeft(0);
        }else{
            setInputValue(e.target.value);
            setDescriptionEmpty(false);
            setCharLeft(e.target.value.length);
        }
        
        
    }

    /**
     * Save the changes to the description
     */
    const save = () => {
        if(inputValue === ""){
            setDescriptionEmpty(true);
        } else {
            // disable the button so that the user cannot click it again during PUT request
            setDisabled(true);
            updateDescription(inputValue);
        }
        
    }

    /**
     * Show / Close modal
     */
    const handleModal = () =>{
        setModalShow(!modalShow);
    }

    // if no description is set return message
    if(props.description === null || props.description === ""){
        content = <p><ErrorIcon/> &nbsp; You have not set a description yet.</p>
    }else{
        content = <p>{props.description}</p>
    }

    return (
        <>
            {/* <About description={description}/> */}

            <div className="about-container">
                <h2>About</h2>
                {content}
            
            <Button 
                className="button-primary about" 
                onClick={() => handleModal()}
                >
                    Edit 
                    <CreateIcon fontSize="small"/>
            </Button>
            </div>

            <Modal
                show={modalShow} 
                onHide={() => handleModal()} 
                data={props.description}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                animation={false}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    <h2>About</h2>
                    <p>Add a short description about yourself to show others who you are.</p>
                    <Form>
                        <FormGroup controlId="formEditAboutText">
                            <Form.Control 
                                as="textarea" 
                                defaultValue={props.description}  
                                rows={3} 
                                name="about" 
                                onChange={handleChange} 
                                maxLength={255}
                                style={{resize:"none",borderColor: descriptionEmpty && "var(--main-red)"}}
                                placeholder="Description..."
                                className="textarea"
                            />
                            <div className="textareaCap">
                                {descriptionEmpty && 
                                    <p style={{color: "var(--main-red)",flex: "2 1",margin:"0"}}>Please fill in a description</p>
                                } 
                                <p style={{color:"dimgrey"}} className="chars">{charLeft}/255 </p>
                            </div>
                        </FormGroup>
                  
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="button-secondary" onClick={() => handleModal()}>Cancel</Button>
                    <Button className="button-primary" onClick={() => save()} disabled={disabled || descriptionEmpty}>{disabled ? "Updating..." : "Save"}</Button>
                </Modal.Footer>
            </Modal>
        
        
        </>
    ); 
}

export {About, AboutEdit};
