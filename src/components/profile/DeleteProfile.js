import React, { useState } from 'react';
import { Button, Modal, Form, FormGroup ,Alert} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from '../config.js';
import './pofile.css';
import ErrorIcon from '@material-ui/icons/Error';
const DeleteProfile = (props) => {

    const [modalShow, setModalShow] = useState(false);
    const [redirect, setRedirect] = useState(false);
    var [disabled, setDisabled] = useState(false);
    // const TOKEN = '1|Lg9pEF2vT0nzAlfKgHUBtH0qcLh3PATcXmFL5IWP';    
    // const DOMAIN = "http://127.0.0.1:8000";
    // API Header Options
    // const options = {
    //     headers: {
    //         'Authorization': `Bearer ${TOKEN}`,
    //         'Accept':'application/json'
    //     }
    // };
    var [error, setError] = useState("");
    // const [validated, setValidated] = useState(false);
    // const [email] = useState(props.student.email);
    // const [password] = useState(props.student.password);
    
    /**
     * Show / Close modal
     */
    const handleModal = () =>{
        setModalShow(!modalShow);
    }

    const redirectToLanding = () => {
        if(redirect){
            return <Redirect to='/landing' />
        }
        
    }

    /**
     * This method handles the actions when the user has clicked "Delete Account"
     * @param {*} e event
     */
    const handleDelete = (e) => {
        setError('');
        setDisabled(true);
        // Delete student
        axios.delete('/student/me')
            .then((res)=>{
                // if user is deleted
                if(res.status === 202){
                    console.log("STUDENT DELETED!");
                    // remove token from local storage
                    localStorage.removeItem("token");
                    // close modal
                    handleModal();
                    // redirect to landing page
                    setRedirect(true);
                    window.location.reload(true);
                }
            })
            .catch((error)=>{
                console.error(error.response);
                // username password incorrect
                if(error.response.status === 401){
                    setError("Email address and/or password is wrong!");
                    setDisabled(false);
                }
            });
    }


    return (
        <div className="delete-profile-container">
                {redirectToLanding()}
                <h1 style={{fontWeight: "700", color:"var(--main-blue)"}}>Delete Account</h1>
                <p>If you're not using ITEAM anymore or just want to delete your account, you can do so using the button below. Please keep in mind that deleting your account is permanent and cannot be reactivated. 
                Do you want to change your password instead? <a href="/">Reset Password</a>
                <br/><br/> 
                Do you have any questions? Please contact us at <a href="/">support@iteam.com</a>.
                </p>

                <Button className="button-danger" onClick={()=>handleModal()}>Delete Account</Button>

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
                    <h2 style={{fontWeight: "700", color:"var(--main-blue)"}}>Permanently Delete Account</h2>
                    <p>
                    Are you sure you want to delete your account? All your data will be permanently removed. This action cannot be undone, so if you want to use ITEAM again you'll have to create a new account.</p>
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
                    <Form>
                        <FormGroup controlId="formDeteleAccountEmail">
                            <Form.Label style={{fontWeight: "700"}}>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email" onChange={()=>console.log(1)}/>
                        </FormGroup>
                        <Form.Group controlId="formDeleteAccountPassword">
                            <Form.Label style={{fontWeight: "700"}}>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"  onChange={()=>console.log(1)}/>
                        </Form.Group>
                        {/* <Form.Group controlId="formDeleteAccountPassword">
                            <Form.Control type="password" placeholder="Confirm Password"  onChange={()=>console.log(1)}/>
                        </Form.Group> */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="button-danger" onClick={handleDelete} disabled={disabled}>{disabled ? "Deleting..." : "Delete Account"}</Button>
                    <Button className="button-primary" onClick={() => handleModal()}>Cancel</Button>
                </Modal.Footer>
                    
                </Modal>
                
            </div>
    );
}

export default DeleteProfile;

