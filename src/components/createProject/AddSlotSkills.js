import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import 'semantic-ui-css/semantic.css';
import { Alert, Modal, Form, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../Common/Button.css';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import '../profile/skills.css';
import axios from '../config.js';
import { useForm } from "react-hook-form";
import { RHFInput } from 'react-hook-form-input'

// notifactions
import { ToastProvider, useToasts } from 'react-toast-notifications';
//Loading
import { Spinner } from 'react-awesome-spinners';


const AddSlotSkills = (props) => {


    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const [isLoading, setIsLoading] = useState(false);
    const loadingAlert = isLoading ? <Spinner /> : '';

    const { register, handleSubmit, errors,setValue} = useForm();

    // notifications
    const { addToast } = useToasts();

    /*Response*/
    const [errorResponse, setErrorResponse] = useState(null);
    const errorAlert = errorResponse ? <Alert variant="danger">{errorResponse}</Alert> : '';



    /* Skill */
    //the list of possible skills
    const [skillOptions, setSkillOptions] = useState([{ id: '', title: '', type: '' }]);

    //fetch data after the first render
    useEffect(() => {
        fetchSkills();
    }, []);

    //fetch skills
    const fetchSkills = () => {

        axios.get('skill/all')
            .then(res => {
                setSkillOptions(res.data);
            })
            .catch(error => {
                setErrorResponse(error);
            })
    }


    /* Slot */
    const [slots, setSlots] = useState([{ title: 'Slot 1', skills: [], description: "", tempSkill: false }]);

    const addSlot = () => {
        //Allow project leader to add 10 members maximum
        if (slots.length < 10) {
            var slotNumber = slots.length + 1;
            setSlots(slots => [...slots, { title: 'Slot ' + slotNumber, skills: [], description: "", tempSkill: false }]);
        }
    }

    const deleteSlot = () => {

        //Allow project leader to add 1 member minimum
        if (slots.length > 1) {
            //Delete the last slot in the list
            setSlots(slots => slots.slice(0, slots.length - 1));
        }
    }


    //POST api
    const onSubmit = async (event) => {
        let slotsCreated = 0;
        setIsLoading(true);

        for (let i = 0; i < slots.length; i++) {

            await axios.post('projects/spot/' + localStorage.getItem('currentStudentId'), { projectid: props.projectId, skills: slots[i].skills, description: slots[i].description })
                .then((res) => {
                    slotsCreated++;
                })
                .catch(error => {
                    setErrorResponse(error);
                });
        }



        if (slotsCreated == slots.length) {
            //close modal 
            props.closeModal();

            //stop loading
            setIsLoading(false);

            // Show success notification
            addToast("Project with id " + props.projectId + " with " + slotsCreated + " slots created!", {
                appearance: 'success',
                autoDismiss: true,
                autoDismissTimeout: 8000
            })

        }
    }

    //handle add skills to slot
    const handleAddSkillToSlot = (event, value, slotId) => {
        let tempArr = [];
        for (let i = 0; i < value.length; i++) {
            tempArr.push(value[i].id);
        }
        slots[slotId].skills = tempArr;

    }

    //handle add description to slot
    const handleAddDesToSpot = (event, slotId) => {
        slots[slotId].description = event.target.value;
        console.log("slot "+slotId+" has "+event.target.value);
    }

    return (
        <div>
            <Container>
                <Modal show={props.show} onHide={props.closeModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header>
                        <Modal.Title className="text-center">
                            <h2> Add Slot Skills</h2>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form id="addSkillSlotForm" onSubmit={handleSubmit(onSubmit)} style={{ paddingBottom: '1vh' }}>
                            {slots.map((slot, slotId) => (
                                <div>
                                    <Form.Group>
                                        <Form.Label><h3>{slot.title}</h3></Form.Label>
                                        <Autocomplete
                                            multiple
                                            id="combo-box-demo"
                                            options={skillOptions}
                                            disableCloseOnSelect
                                            getOptionLabel={(skillOption) => skillOption.title}
                                            renderOption={(skillOption, { selected }) => (
                                                <React.Fragment>
                                                    <Checkbox
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        style={{ marginRight: 8 }}
                                                        checked={selected}
                                                    />
                                                    {skillOption.title}
                                                </React.Fragment>
                                            )}
                                            //Selected Value
                                            onChange={(event, newValue) => {
                                                handleAddSkillToSlot(event, newValue, slotId);
                                            }}

                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                    label="Select Skills"
                                                    placeholder="Skill"
                                                    inputProps={{ ...params.inputProps, required: slots[slotId].skills.length === 0 }}
                                                    required={true}
                                                />

                                            )}



                                        />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label><h3>Spot Description</h3></Form.Label>
                                          <Form.Control as="textarea" rows={3} placeholder="Enter Spot Description" onChange={(event) => {
                                            handleAddDesToSpot(event, slotId);
                                        }} />
                        
                                    </Form.Group>
                                </div>



                            ))}


                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Maximum 10 slots!</Tooltip>}>
                                <span className="d-inline-block">
                                    <Button className='button-primary' style={{ color: 'black', backgroundColor: '#E9C46A', borderColor: '#E9C46A', marginTop: '1vh', marginRight: '1vh' }} onClick={addSlot}>
                                        Add slot &nbsp;
                                    </Button>
                                </span>
                            </OverlayTrigger>

                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Minimum 1 slot!</Tooltip>}>
                                <span className="d-inline-block">
                                    <Button className='button-primary' style={{ color: 'black', backgroundColor: '#E9C46A', borderColor: '#E9C46A', marginTop: '1vh' }} onClick={deleteSlot} >
                                        Remove Slot &nbsp;
                                    </Button>
                                </span>
                            </OverlayTrigger>
                        </Form>
                    </Modal.Body>
                    {loadingAlert}
                    {errorAlert}
                    <Modal.Footer>
                        <Button form="addSkillSlotForm" className='button-primary' type="submit" style={{ color: 'black', backgroundColor: '#E9C46A', borderColor: '#E9C46A', marginTop: '1vh', float: 'right' }}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>

        </div>

    );

}
export default AddSlotSkills;
