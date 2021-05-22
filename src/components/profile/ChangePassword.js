import React, { useState } from 'react';

// form and modal
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { RHFInput } from 'react-hook-form-input';

// notifactions
import { useToasts} from 'react-toast-notifications'

// api
import axios from "../config.js";

// styling
import './pofile.css';
import '../Common/Button.css';

// icons
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


const ChangePassword = (props) => {

    // states
    const [modalShow, setModalShow] = useState(false);
    
    // states form
    const { register, handleSubmit, errors, setValue, reset } = useForm();

    var [currentPassword, setCurrentPassword] = useState("");
    var [newPassword, setNewPassword] = useState("");
    var [confirmPassword, setConfirmPassword] = useState("");
    var [passwordMatch, setPasswordMatch] = useState();
    var [disabled, setDisabled] = useState(false);

    var [error, setError] = useState("");
    // var [success, setSuccess] = useState("");

    // notifications
    const { addToast } = useToasts()
    
    // import QS to stringify API request body   
    const QS = require('querystring');

    /**
     * Show / Close modal
     */
    const handleModal = () =>{
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setError('');
        setPasswordMatch(Boolean);
        setModalShow(!modalShow);
    }

    const handleCurrentPassword = (e) => {
        console.log("Current >> ", e.target.value);
        setCurrentPassword(e.target.value);
    }

    const handleNewPassword = (e) => {
        console.log("New >> ", e.target.value);
        setNewPassword(e.target.value);
    }

    const handleConfirmPassword = (e) => {
        console.log("Confirm >> ", e.target.value);
        if(e.target.value !== newPassword){
            setPasswordMatch(false);
            setConfirmPassword(e.target.value);
            console.log("passwords do not match");
        } else {
            setPasswordMatch(true);
            setConfirmPassword(e.target.value);
            console.log("passwords match");
        }
    }

    /**
     * returns the request body for the api call
     * @param skill 
     * @return API requestBody 
     */
    const getRequestBody = (email, current_password, new_password, confirm_password) =>{

        // build the request body
        const requestBody = {
            email: email,
            current_password: current_password, 
            new_password: new_password,
            new_password_confirmation: confirm_password
        };

        return requestBody;
    }

    const handleSave = () => {
        setError("");
        if(currentPassword !== "" || newPassword !== "" || confirmPassword !== ""){
            setDisabled(true)
            axios.put('student/password/update', QS.stringify(getRequestBody(props.email, currentPassword,newPassword,confirmPassword)))
                .then((res)=>{
                    // Show success notification
                    addToast("Password successfully updated!", {
                        appearance: 'success',
                        autoDismiss: true
                      })
                    // Clear input in the project form
                    reset();
                    // Enable button
                    setDisabled(false);
                    // Close modal
                    handleModal();
                }).catch((error)=>{
                    if(error.response.status === 403){
                        console.error("Wrong password!");
                        setError("Current password is wrong!");
                        setDisabled(false);
                    }else{
                        addToast("Something went wrong, please try again!", {
                            appearance: 'error',
                            autoDismiss: true
                        });
                    }
                })
        }        
    }

    return (
        <>
            <Button className="button-secondary" onClick={()=>handleModal()} style={{margin:"15px 0 0 0"}}>Change Password</Button>
            <Modal 
                 show={modalShow} 
                 onHide={() => handleModal()} 
                 size="lg"
                 aria-labelledby="contained-modal-title-vcenter"
                 centered
                 animation={false}
                 backdrop="static"
                 keyboard={false}
                >
                    <Modal.Body>
                    <h2 style={{fontWeight: "700", color:"var(--main-blue)"}}>Change Password</h2>
                    {
                        error && 
                        <Alert 
                            variant="danger" 
                            dismissible={true} 
                            style={{background:"var(--main-red)",border:"none",color:"white"}}
                            onClose={()=>setError("")}>
                             <ErrorIcon/>
                                &nbsp;
                                {error}
                        </Alert>
                    }

                    <Form onSubmit={handleSubmit(handleSave)}>
                        <Form.Group controlId="formChangePasswordCurrent">
                            <Form.Label style={{fontWeight: "700"}}>Current Password</Form.Label>
                            {/* <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                autoComplete="current-password" 
                                onChange={handleCurrentPassword}/> */}

                            <RHFInput
                                as={<Form.Control 
                                    type="password" 
                                    placeholder="Password" 
                                    autoComplete="current-password" 
                                    />}
                                rules={{ required: true }}
                                name="currentPassword"
                                register={register}
                                setValue={setValue}
                                onChange={handleCurrentPassword}
                            />
                            {errors.currentPassword && errors.currentPassword.type === "required" && <span style={{ color: "red" }}>Password is required!</span>}
                        </Form.Group>
                        <Form.Group controlId="formChangePasswordNew">
                            <Form.Label style={{fontWeight: "700"}}>New Password</Form.Label>
                            {/* <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                autoComplete="new-password" 
                                // style={{borderColor: passwordMatch && "#6a994e"}}
                                onChange={handleNewPassword}/> */}

                            <RHFInput
                                as={<Form.Control 
                                    type="password" 
                                    placeholder="New Password" 
                                    autoComplete="new-password" 
                                    />}
                                rules={{ required: true }}
                                name="newPassword"
                                register={register}
                                setValue={setValue}
                                onChange={handleNewPassword}
                            />
                            {errors.newPassword && errors.newPassword.type === "required" && <span style={{ color: "red" }}>Please fill in your new password !</span>}
                        </Form.Group>
                        <Form.Group controlId="formChangePasswordAgain">
                            {/* <Form.Control 
                                type="password" 
                                placeholder="Confirm Password" 
                                autoComplete="new-password" 
                                // style={{borderColor: passwordMatch && "#6a994e"}}
                                onChange={handleConfirmPassword}/> */}
                                <RHFInput
                                as={ <Form.Control 
                                    type="password" 
                                    placeholder="Confirm Password" 
                                    autoComplete="new-password" 
                                    />}
                                rules={{ required: true }}
                                name="confirmPassword"
                                register={register}
                                setValue={setValue}
                                onChange={handleConfirmPassword}
                            />
                            {errors.confirmPassword && errors.confirmPassword.type === "required" && <span style={{ color: "red" }}>Please confirm your new password !</span>}
                        </Form.Group>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="button-secondary" onClick={() => handleModal()}>Cancel</Button>
                    <Button type="submit" className="button-primary" onClick={() => handleSave()} disabled={disabled || !passwordMatch}> {disabled ? "Saving..." : "Save"}</Button>
                </Modal.Footer>
                    
                </Modal>
        </>
    );
}

export default ChangePassword;
