import React, { useState, useEffect } from 'react';
import { Alert, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { RHFInput } from 'react-hook-form-input';
import '../Common/Button.css';
import axios from '../config.js';
import AddSlotSkills from './AddSlotSkills';

// notifactions
import { ToastProvider, useToasts } from 'react-toast-notifications'

const CreateProject = () => {

    /* Loading and error */
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /*Categories*/
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchAllCategories = async () => {
            const response = await axios.get('projects/category/all')
            setCategories(response.data);
        }

        fetchAllCategories();
    }, [])





    /*Modal skill*/
    //Initilize modal 'Add Member Skills'
    const [modalMemSkillShow, setModalMemSkillShow] = useState(false);
    const handleDisplayModalSkill = () => {
        setModalMemSkillShow(true);
    }
    const closeModalSkill = () => {
        setModalMemSkillShow(false);
    }


    /*New Project  */
    //Initialize the new project
    const [newProject, setNewProject] = useState({ id: "", name: "", description: "", ownerid: 11, startdate: null, enddate: null });

    //Initilize the response error
    const [errorResponse, setErrorResponse] = useState(null);
    const errorAlert = errorResponse ? <Alert variant="danger">{errorResponse}</Alert> : '';


    const { register, handleSubmit, errors, setValue, reset,watch } = useForm();
    const handleRetrieveProjectId = (projectId) => {
        setNewProject(prevState => ({
            ...prevState,
            id: projectId
        }));
    }



    //Save Projects 
    const onSubmit = (data, e) => {

         axios.post('projects/', { name: data.name, description: data.description, category: data.category, ownerId: localStorage.getItem('currentStudentId'), startdate: data.startdate, enddate: data.enddate })
            .then(res => {
                //Retrieve project id from response
                handleRetrieveProjectId(res.data);

                //Clear input in the project form
                e.target.reset();             

                //Display the modal skill when POST request is succesful
                handleDisplayModalSkill();

            })
            .catch(error => {
                setErrorResponse(error.message);
            }); 
    }


    return (
        <Container style={{ paddingTop: '5vh', paddingBottom: '5vh', paddingLeft: '3vh', paddingRight: '3vh', border: '3px solid #E9C46A', marginBottom: '10vh', marginTop: '10vh' }}>
            <div>
                <h1 className="text-center" style={{ padding: '1vh' }}>
                    <span style={{ borderBottom: '3px solid #E9C46A', paddingBottom: '6px' }}>Create a project</span>
                </h1>
            </div>


            <Form id="createProjectForm" onSubmit={handleSubmit(onSubmit)} style={{ padding: '3vh' }}>
                <Form.Group className="projectName" style={{ paddingBottom: '1vh' }}>
                    <Form.Label><h3>Project Name</h3></Form.Label>
                    <RHFInput
                        as={<Form.Control type="text" placeholder="Enter Project Name" /* onChange={handleDescriptionOnChange} */ />}
                        rules={{ required: true }}
                        name="name"
                        style={{ height: "50px" }}
                        register={register}
                        setValue={setValue} 
                        value={newProject.name}
                        />
                    {errors.name && errors.name.type === "required" && <span style={{ color: "red" }}>Name is required</span>}
                </Form.Group>

                <Form.Group style={{ paddingBottom: '1vh' }}>
                    <Form.Label><h3>Project Description</h3></Form.Label>
                    <RHFInput
                        as={<Form.Control as="textarea" rows={3} placeholder="Enter Project Description" />}
                        rules={{ required: true,minLength: 15 }}
                        name="description"
                        style={{ height: "200px" }}
                        register={register}
                        setValue={setValue} />
                    {errors.description && errors.description.type === "required" && <span style={{ color: "red" }}>Description is required</span>}
                    {errors.description&& errors.description.type === "minLength" &&  <span style={{ color: "red" }}>Description must have more than 15 characters</span>}
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group style={{ paddingBottom: '1vh' }}>
                            <Form.Label><h3>Category</h3></Form.Label>
                            <RHFInput
                                as={<Form.Control as="select" name="category" style={{ height: "50px" }} disabled={isLoading} >
                                    <option value="" >Select</option>
                                    {
                                        categories.map((item, index) => (
                                            <option key={index} value={item.name} >{item.name}</option>
                                        ))
                                    }

                                </Form.Control>}
                                rules={{ required: true }}                               
                                name="category"
                                register={register}
                                setValue={setValue} />
                            {errors.category && errors.category.type === "required" && <span style={{ color: "red" }}>Category is required</span>}
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group style={{ paddingBottom: '1vh' }}>
                            <Form.Label><h3>Start Date</h3></Form.Label>
                            <RHFInput
                                as={<Form.Control type="date"  /*onChange={handleStartDateOnChange}*/ />}
                                rules={{ required: true }}
                                name="startdate"
                                style={{ height: "50px" }}
                                register={register}
                                setValue={setValue}
                            />
                            {errors.startdate && errors.startdate.type === "required" && <span style={{ color: "red" }}>Start date is required</span>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group style={{ paddingBottom: '1vh' }}>
                            <Form.Label><h3>End Date</h3></Form.Label>
                            <RHFInput
                                as={<Form.Control type="date" /* onChange={handleEndDateOnChange} */ />}
                                rules={{ required: true }}
                                name="enddate"
                                style={{ height: "50px" }}
                                register={register}
                                setValue={setValue}
                                min={newProject.startdate}
                            />
                            {errors.enddate && errors.enddate.type === "required" && <span style={{ color: "red" }}>End date is required</span>}
                        </Form.Group>
                    </Col>
                </Row>
                {errorAlert}
                <Button type="submit" variant="primary" style={{ color: 'black', backgroundColor: '#E9C46A', borderColor: '#E9C46A' }} >
                    Save
                </Button>
            </Form>

            <ToastProvider>
                <AddSlotSkills projectId={newProject.id} show={modalMemSkillShow} closeModal={closeModalSkill} />
            </ToastProvider>

        </Container>
    )
}


export default CreateProject;