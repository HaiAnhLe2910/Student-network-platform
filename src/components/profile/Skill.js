import React , {useState, useEffect} from 'react';
import Chip from '@material-ui/core/Chip';
import Image from 'react-bootstrap/Image';
import { Button, Modal} from 'react-bootstrap';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import useWindowSize from "@wbe/use-window-size";

// api
import axios from '../config.js';

// notifactions
import { useToasts} from 'react-toast-notifications'

// styling
import './skills.css';
import './pofile.css';
import '../Common/Button.css';

// icons
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ErrorIcon from'@material-ui/icons/Error';

/**
 * The default skill (without endorsement)
 * 
 * @param props enter skill details
 */
const Skill = (props) =>{
    return <Chip
        // key={props.id} 
        label={props.label} 
        className="skill-tag" 
    />
}


/**
 * This type returns all the skills as default skills
 * 
 * @param props the skills
 */
const AllDefaultSkills = (props) => {

    // for each skill create a Skill and return it
    return (
        <>
           { 
            props.skills.map((skill)=> {
                return (
                        <Skill label={skill.title} key={skill.id}/>
                    ) 
                })
            }
        </>
    );

} 

/**
 * Returns all skills for private profile
 * 
 * @param  props 
 */
const AllSkills = (props) => {
    // all skills
    var [skills,setSkills] = useState([]);
    
    console.log(skills, props);

    useEffect(()=>{
        setSkills(props.skills);
    },[props.skills])

    /**
     * send skill to parent
     */
    const handleAddSkill = (skill) => {
        props.onAddSkillHandle(skill);
    }

    /**
     * returns skills with or without endorsement count
     * @param {*} skills  
     */
    const getNormalSkill = (skills) => {

        var hards = skills.filter((s)=>{return s.type === "hard skill"});
        var softs = skills.filter((s)=>{return s.type === "soft skill"});
        let content = null;

        // if the student has both soft and hard skills show skills seperately 
        if(hards.length !== 0 && softs.length !== 0 ){
            // set the content
            content = <>
                <h6>Industry Knowledge</h6>
                {
                    hards.map((skill) => 
                    <EndorsingSkill 
                        skill={skill}
                        user={props.user}
                        private={props.private}
                        key={skill.id}
                    />
                    )
                }
                <h6>Personal & Interpersonal Skills</h6>
                {
                    softs.map((skill) => 
                    <EndorsingSkill 
                        skill={skill}
                        user={props.user}
                        private={props.private}
                        key={skill.id}
                    />
                )
                }
            </>
        } else {
            // when the student only has skills of a certain
            content = skills.map((skill)=>
            <EndorsingSkill 
                skill={skill}
                user={props.user}
                private={props.private}
                key={skill.id}
            />)
        }
        // return the content
        return content;
    }

    /**
     * this method return boolean if student has more than 3 skills with endorsements
     * @param {*} skills 
     */
    const checkEndorsements = (skills) => {
        var count = 0;
        
        // count the number of skills with endorsements
        for(let skill of skills){
            if(skill.endorsedBy.length > 0){
                count++;
            }
        }

        // if the user has >= 3 endorsed skills
        if(count >= 3 && skills.length >=6){
            // get 3 endorsed skills 
            let highlight = skills.concat().sort((a,b) => a.endorsedBy.length - b.endorsedBy.length).slice(1).slice(-3).reverse();
            // get the remaining skills
            let remain = skills.sort((a,b) => a.endorsedBy.length - b.endorsedBy.length).slice(0,-3);

            return  <>
                {/* show 3 endorsed skills  */}
                <div className="highlighted-skill-con">
                    <h5>Highlighted Skills</h5>
                    {
                    highlight.map((skill) => 
                        <HighlightedSkill 
                            skill={skill}
                            private={props.private} 
                            user={props.user}
                            key={skill.id}
                        />)
                    }
                </div> 
                {/* show remaining skills */}
                <div className="normal-skill-con">
                    <div className="skill-type-con">
                        {getNormalSkill(remain)}
                    </div>
                </div>
            </>
        } else {
            // if the user has < 3 endorsed skills do not show highlighted skills
            return <div className="normal-skill-con">
                        <div className="skill-type-con">
                            {getNormalSkill(skills)}
                        </div>
                    </div>
        }
        
    }

    // check if user has skills
    if(skills.length === 0){
        // if user has no skills show a message
        if(props.private){
            // message to current user
            return (
                <div className="all-skill-container">
                {
                    props.private && 
                    <div className="edit-skill-btn-container">
                        <DeleteSkillComponent skills={skills} onDeleteSkill={handleAddSkill} disabled={true}/>
                        <AddSkillComponent skills={skills} onAddSkill={handleAddSkill}/>
                    </div>
                
                }
                    <p><ErrorIcon/> &nbsp; You have not yet added any skills to your profile.</p>
                </div>
            );
        }else{
            // message to visiting user
            return (
                <p><ErrorIcon/> &nbsp; {props.user.givenName} has not added any skills.</p>
            );
        }
    }else{
        // if a user has skills determine if the user has endorsements
        // if the user has no endorsements (at all) show default skill 
            // divide the skills in soft and hard skills
        // if the user has more than 3 skills with endorsements add highlighted section
            // divide the skills in top skills, and other (soft & hard) skills
        // otherwise show default skill tag with endorsement count
        return (
            <div className="all-skill-container">
                {
                    props.private && 
                    <div className="edit-skill-btn-container">
                        <DeleteSkillComponent skills={skills} onDeleteSkill={handleAddSkill} disabled={false}/>
                        <AddSkillComponent skills={skills} onAddSkill={handleAddSkill}/>
                    </div>
                
                }
                {checkEndorsements(skills)}
                
            </div>
        );
    }
}

/**
 * Returns all skills for public profile
 * 
 * @param  props 
 */
const AllPublicSkills = (props) => {

    // all skills
    var [skills, setSkills] = useState([]);

    useEffect(()=>{
        setSkills(props.skills);
    },[props.skills]);

    console.log("SKILLS: ",skills,"PROPS: ", props);

    /**
     * returns skills with or without endorsement count
     * @param {*} skills  
     */
    const getNormalSkill = (skills) => {

        var hards = skills.filter((s)=>{return s.type === "hard skill"});
        var softs = skills.filter((s)=>{return s.type === "soft skill"});
        let content = null;

        console.log(hards, softs);
        // if the student has both soft and hard skills show skills seperately 
        if(hards.length !== 0 && softs.length !== 0 ){
            // set the content
            content = <>
                <h6>Industry Knowledge</h6>
                {
                    hards.map((skill) => 
                    <EndorsingSkill 
                        skill={skill}
                        owner={props.owner}
                        user={props.user}
                        private={props.private}
                        key={skill.id}
                    />
                    )
                }
                <h6>Personal & Interpersonal Skills</h6>
                {
                    softs.map((skill) => 
                    <EndorsingSkill 
                        skill={skill}
                        owner={props.owner}
                        user={props.user}
                        private={props.private}
                        key={skill.id}
                    />
                )
                }
            </>
        } else {
            // when the student only has skills of a certain
            content = skills.map((skill)=>
            <EndorsingSkill 
                skill={skill}
                owner={props.owner}
                user={props.user}
                private={props.private}
                key={skill.id}
            />)
        }
        // return the content
        return content;
    }

    /**
     * this method return boolean if student has more than 3 skills with endorsements
     * @param {*} skills 
     */
    const checkEndorsements = (skills) => {
        var count = 0;
        
        // count the number of skills with endorsements
        for(let skill of skills){
            if(skill.endorsedBy.length > 0){
                count++;
            }
        }

        console.log(count);
        // if the user has >= 3 endorsed skills
        if(count >= 3 && skills.length >=6){
            // get 3 endorsed skills 
            let highlight = skills.concat().sort((a,b) => a.endorsedBy.length - b.endorsedBy.length).slice(1).slice(-3).reverse();
            // get the remaining skills
            let remain = skills.sort((a,b) => a.endorsedBy.length - b.endorsedBy.length).slice(0,-3);

            return  <>
                {/* show 3 endorsed skills  */}
                <div className="highlighted-skill-con">
                    <h5>Highlighted Skills</h5>
                    {
                    highlight.map((skill) => 
                        <HighlightedSkill 
                            skill={skill}
                            private={props.private} 
                            owner={props.owner}
                            user={props.user}
                            key={skill.id}
                        />)
                    }
                </div> 
                {/* show remaining skills */}
                <div className="normal-skill-con">
                    <div className="skill-type-con">
                        {getNormalSkill(remain)}
                    </div>
                </div>
            </>
        } else {
            // if the user has < 3 endorsed skills do not show highlighted skills
            return <div className="normal-skill-con">
                        <div className="skill-type-con">
                            {getNormalSkill(skills)}
                        </div>
                    </div>
        }
        
    }

    // check if user has skills
    if(skills.length === 0){
        return (
            <p><ErrorIcon/> &nbsp; {props.owner.givenName} has not added any skills.</p>
        );
    }else{

        return (
            <div className="all-skill-container">
                {checkEndorsements(skills)}
            </div>
        )
    }
}


/**
 * This type returns a highlighted skill with endorsements and option to
 * endorse if the user is not te owner and has not endorsed the
 * skill yet
 * 
 * @param props students: [{}] / skill: {} / user: {}
 */
const HighlightedSkill = (props) => {

    // notifications
    const { addToast } = useToasts();
    // endorsements
    const [endorsements, setEndorsements] = useState(props.skill.endorsedBy.map((e)=>e.id));
    const [endorsed, setEndorsed] = useState(null);
    
    // check if the current user has already endorsed the skill
    useEffect(()=>{
        setEndorsed(endorsements.includes(props.user.id));
    },[endorsements,props.user.id]);

    /**
     * This method increases the endorsement of a skill
     * 
     * @param user  the user endorsing the skill
     */
    const increaseIndorsement = (user, skill_id) => {
       // make sure the endorser cannot endorse again
       setEndorsed(true);
       axios.post(`/endorse/student/${props.owner.id}/skill/${skill_id}`)
           .then((res)=>{
               // show success notification
               addToast(`Thanks for endorsing ${props.owner.givenName}!`, {
                   appearance: 'success',
                   autoDismiss: true
               })
               // add the endorser to the list
               setEndorsements(endorsements.concat(props.user.id));
               props.skill.endorsedBy.push(props.user);
           })
           .catch((error)=>{
               // reset endorsed back to false
               setEndorsed(false);
               console.error(error.response);
           }
       )
    }


    /**
     * Returns plus (+) button if the skill has not been endorsed yet
     */
    const endorseIcon = () =>{
        // check if user is the one viewing the skill 
        if(props.private){
            // return nothing
            return ""
        }
        // check if the skill hasn't been endorsed yet
        else if(!endorsed){
            // if so show button for endorsing
            return <div className="end-hgh-skill">
                    <AddCircleOutlineIcon 
                        onClick={()=>increaseIndorsement(props.user.id,props.skill.id)} 
                        style={{fontSize:"30px", marginRight: "20px", color: "#888", cursor: "pointer"}}/>
                    </div>
        }
        // in all other cases return nothing
        else{
            return <div className="end-hgh-skill"> 
                <AddCircleOutlineIcon 
                    onClick={()=>increaseIndorsement(props.user.id,props.skill.id)} 
                    style={{fontSize:"30px", marginRight: "20px", visibility:"hidden"}}
                />
            </div>;
        }
    }

    // return the highlighted skill 
    return (
        <div className="highlighted-skill">
            {/* add icon if applicable */}
            {endorseIcon()}
            <div className="chip-private">
                <p className="skill-name">
                    <b>{props.skill.title}</b>
                    <span>{endorsements.length ? " • "+ endorsements.length: ""}</span>
                </p> 
                <div className="endorsers-con">
                    {
                        // if the user has endorsed the skill show his picture 
                        endorsed ? props.skill.endorsedBy.map((s) => {
                            if(s.id === props.user.id){
                                return <Image src={s.photo} roundedCircle width={30} height={30} key={s.id}/>
                            }
                        }) :
                        // otherwise get the photo of the first person who endorsed the skill 
                        props.skill.endorsedBy.map((s) => {
                            if(s === props.skill.endorsedBy[0]){
                                return <Image src={s.photo} roundedCircle width={30} height={30} key={s.id}/>
                            }
                        })
                    }

                    <p>
                        Endorsed by &nbsp;
                        {
                            // if the user has endorsed the skill
                            endorsed ? <b>you </b> : <b>{
                                // get the name of the firs person who endorsed the skill
                                props.skill.endorsedBy.map((s)=> s === props.skill.endorsedBy[0] ? s.givenName : '')
                            } </b>
                        }
                        
                        { 
                            // show how many others endorsed the skill
                            // if there are more than 1 endorsements
                            !(endorsements.length-1 <= 0 ) ? 
                                // if there are exactly two endorsements in total
                                ((endorsements.length-1 === 1) ? 
                                    // if it is endorsed show the other user
                                    (endorsed ?<>and <b>{props.skill.endorsedBy[0].givenName}</b></> 
                                    : 
                                    // if it is not endorsed show the 2e user
                                    <>and <b>{props.skill.endorsedBy[1].givenName}</b></>)
                                : // if there are more than 2 endorsements in total
                                // when a skill has over 40 endorsements
                                    (endorsements.length-1 > 40 ) ?
                                        // show 40+
                                        (` and 40+ others`)
                                        : // <=40 endorsements show count
                                        (` and ${endorsements.length-1} others`)) 
                            : 
                            // if there is only 1 endorsement add nothing
                            "" 
                        }
                    </p>
                </div>
                
                
            </div> 
        </div>
    ) 
}

/**
 * This type returns the skill with endorsements and option to
 * endorse if the user is not te owner and has not endorsed the
 * skill yet
 * 
 * @param props skill: {} / user: {}
 */
const EndorsingSkill = (props) =>{

    // notifications
    const { addToast } = useToasts();
    // endorsements
    const [endorsements, setEndorsements] = useState(props.skill.endorsedBy.map((e)=>e.id));
    const [endorsed, setEndorsed] = useState(null);
    
    // check if the current user has already endorsed the skill
    useEffect(()=>{
        setEndorsed(endorsements.includes(props.user.id));
    },[endorsements,props.user.id]);
    
    /**
     * This method increases the endorsment of a students skill
     * 
     * @param user  the user endorsing the skill
     */
    const increaseIndorsement = (owner, skill_id) => {
        // make sure the endorser cannot endorse again
        setEndorsed(true);
        axios.post(`/endorse/student/${props.owner.id}/skill/${skill_id}`)
            .then((res)=>{
                // show success notification
                addToast(`Thanks for endorsing ${props.owner.givenName}!`, {
                    appearance: 'success',
                    autoDismiss: true
                })
                // add the endorser to the list
                setEndorsements(endorsements.concat(props.user.id));
                props.skill.endorsedBy.push(props.user);
            })
            .catch((error)=>{
                // reset endorsed back to false
                setEndorsed(false);
                console.error(error.response);
            }
        )
       
    }

    // check if user is the one viewing the skill 
    if(props.private){
        // if so return default skill with endorsement in the label
        return  <Skill key={props.skill.id} label={props.skill.title + (endorsements.length ? " • "+ endorsements.length: "")}/>
    } 
    // check if the user has already endorsed the skill
    else if(endorsed){
        // if so show default skill with endorsement in the label
        return  <Skill key={props.skill.id} label={props.skill.title + (endorsements.length ? " • "+ endorsements.length: "")}/>
    }
    else{
        // in all other cases give the user the option to endorse
        return <Chip 
        key={props.skill.id} 
        label={props.skill.title + (endorsements.length ? " • " + endorsements.length : "")}
        className="skill-tag" 
        onDelete={()=>increaseIndorsement(props.owner,props.skill.id)}
        deleteIcon = { <AddCircleOutlineIcon  style={{color:"white"}}/> }
        />;
    }
        
    
}


/**
 * This type returns the add skills button annd popup
 * @param {*} props skills: {}
 */
const AddSkillComponent = (props) => {
    var [definedSkills, setDefinedSkills] = useState([]);

    const { width, height } = useWindowSize();
    const [inputValue, setInputValue ]= useState([]);

    // States
    const [modalShow, setModalShow] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState([]);
    var [disabled, setDisabled] = useState(false);
    var [error, setError] = useState("");

    // notifications
    const { addToast } = useToasts()
    
    // array for temporarily storing the selected skills
    let temp = []

    const QS = require('querystring');


    useEffect(()=>{
        // Call api to get all the skills
        getAllSkills(props.skills);
    },[props.skills]);


    /**
     * This method calls the API to receive all skills on the website
     */
    const getAllSkills = (used) => {
        
        axios.get('/skill/all')
            .then((res) => {
                setDefinedSkills(getDiff(res.data, used));
            })
            .catch((error) => {
                
                if(error.response.status === 401){
                    //    redirect to login page
                } 
                console.error(error.response.status);
            });
        
    }

    

    /**
     * Show / Close modal
     */
    const handleModal = () =>{
        temp = [];
        setError("");
        setModalShow(!modalShow);
    }

    /**
     * This method handles the changes in the selected skills
     * @param {*} s selected skills: [] 
     */
    const handleChange = (s) =>{

        // for every change set the temp ss array to an empty array
        var ss = [];
        // for each selected skill
        for(let selected of s){
            // retrieve the full skill object from the defined skilss
            const selectedSkill = definedSkills.filter((skill)=>{
                if(skill.title === selected){
                    return skill;
                }
            })
            // save the selected skill in the temp array
            ss.push(selectedSkill[0]);
        }
        // setInputValue(s);
        console.log("Selected Skills >> ",ss);
        // save the selected skills to the temp array
        temp = ss;
    }

    /**
     * this method saves the added skills
     */
    const save = () =>{
        // reset selected skills
        setSelectedSkills([]);
        // disable the save button
        setDisabled(true);
        // push the values to the selected skills array
        selectedSkills.push(...temp)
        // make API call
        addSkills(selectedSkills);
        
    }

    /**
     * Method to call API to add skill to student
     */
    const addSkills = (selectedSkills) =>{

        for (let skill of selectedSkills) {
            console.log("addSkill >> ", getRequestBody(skill));
           
            // API POST request
            axios.post(`/student/me/skill/${skill.id}`)
            .then((res) => {
                // when call is successfull
                if(res.status === 201){
                    // pass the skill to the parent component 
                    props.onAddSkill(skill);
                    // enable the button for next time
                    setDisabled(false);
                    // show success notification
                    addToast(`${skill.title} has been added to your skills!`, {
                        appearance: 'success',
                        autoDismiss: true
                      })
                    // close the modal after API call
                    handleModal();
                }
            })
            .catch((error) => {
                if(error.response.status === 400){
                    setError(`1 or more of the selected skills already exists, please add another one!`)
                    console.error(error.response);
                    setDisabled(false);
                }
                else if(error.response.status === 401){
                    // redirect to login page
                    console.log("redirect to login page");
                }                 
                console.error(error.response);
            });
        }

        temp = [];
    }


    /**
     * returns the request body for the api call
     * @param skill 
     * @return API requestBody 
     */
    const getRequestBody = (skill) =>{

        // build the request body
        const requestBody = {
            skill: skill.title, 
            type: skill.type, 
            level: 5
        };

        return requestBody;
    }


    const getDiff = (all, used) => {

        const comparer = (otherArray) => {
            return (current) => {
                return otherArray.filter((other)=>{
                    return other.id === current.id
                }).length === 0;
            }
        }

        var onlyInA = all.filter(comparer(used));
        var onlyInB = used.filter(comparer(all));

        var result = onlyInA.concat(onlyInB);

        return result;
    }

    return (
        <>
            { width > 400 ?
                <Button 
                    className="button-primary" 
                    onClick={() => handleModal()}
                    style={{margin: "0px 0px 20px 0px"}}
                >
                    Add skills &nbsp;
                    <AddIcon fontSize="small"/>
                </Button> 
                :
                <Button 
                    className="button-primary" 
                    onClick={() => handleModal()}
                    style={{width:"48%",margin:"10px 0"}}
                >
                    Add skills &nbsp;
                    <AddIcon fontSize="small"/>
                </Button> 
            }
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
                <h2  style={{fontWeight: "700", color:"var(--main-blue)"}}>Skills</h2>
                <p>Below you can add more skills to your profile.</p>
                
                <Autocomplete
                    multiple
                    id="tags-filled"
                    onChange={(event,value)=> handleChange(value)}
                    options={definedSkills.map((option)=> option.title)}
                    renderTags={(value, getTagProps) =>{
                        // console.log(value);
                        return value.map((option, index) => (
                            <Chip 
                                label={option} {...getTagProps({ index })} 
                                className="skill-tag"  
                                deleteIcon={<ClearIcon style={{color: "white", width: "16px"}}/>}
                                style={{margin:'5px 2px'}}
                            />
                        ))
                        }
                    }
                    renderInput={(params) => (
                        <TextField 
                            {...params} 
                            label="Search Skills" 
                            laceholder="Add skill" 
                            inputProps={{...params.inputProps, required: temp.length===0}} 
                            required={true}
                        />
                        // <TextField {...params} label="Search Skills" placeholder="Add skill" inputProps={{...params.inputProps,required:value.length===0}} required={true}​​/>
                    )}
                />
                    
                {
                    error !== "" ? <p style={{color:'red',fontSize:"12px"}}>{error}</p> : ""
                }
                

                </Modal.Body>
                <Modal.Footer>
                    <Button className="button-secondary" onClick={() => handleModal()}>Cancel</Button>
                    <Button className="button-primary" onClick={() => save()} disabled={disabled}>{disabled ? "Adding..." : "Add"}</Button>
                </Modal.Footer>
            </Modal>


        </>
    );
}


/**
 * This type returns the delete skills button and popup
 * @param {*} props skills: {}
 */
const DeleteSkillComponent = (props) =>{

    

    const { width } = useWindowSize();
    // notifications
    const { addToast } = useToasts()

    // States
    const [modalShow, setModalShow] = useState(false);
    const [skills, setSkills] = useState([]);
    const [tempSkills, setTempSkills] = useState(skills);
    const [deleteSkill, setDeleteSkill] = useState([]);
    var [disabled, setDisabled] = useState(false);
    // make array for storing new array
    // var tempSkills = [...skills];
    // initialize array for storing deleted skills
    var deletedSkill = [];
    
    useEffect(()=>{setSkills(props.skills)},[props.skills])
    console.log("hier",props,skills);
    /**
     * Show / Close modal
     */
    const handleModal = () =>{
        setModalShow(!modalShow);
    }

    /**
     * this mehtod handles deleting the skill from the list
     * @param {*} input selected skills []
     */
    const handleDelete = (input) =>{
    
        // for every change set the temp ss array to an empty array
        var ss = [];
        // for each selected skill
        for(let selected of input){
            // retrieve the full skill object from the defined skilss
            const selectedSkill = skills.filter((s)=>{
                if(s.title === selected){
                    return s;
                }
            })
            // console.log("selected >>> ", selectedSkill[0]);
            // save the selected skill in the temp array
            ss.push(selectedSkill[0]);
        }
        
        console.log("Selected Skills >> ",ss);
        // save the selected skills to the temp array
        deletedSkill = ss;
        console.log("deleted skills >> ", deletedSkill);

    }


    /**
     * This method saves the changes to the skills
     */
    const deleteSkills = () =>{

        // if skills have been deleted
        if(deletedSkill !== []){
            setDisabled(true);
            // set the remaining skills
            // setSkills([...tempSkills]);

            console.log('New Skill List >> ', skills);
            console.log('Skills to be deleted >> ', deletedSkill);

            // call api for list of deleted items -> for each item in the deleted items list make api call
            for(let skill of deletedSkill){
                axios.delete(`/student/me/skill/${skill.id}`)
                    .then((res)=>{
                        console.log(res);
                        props.onDeleteSkill(skill);
                        setDisabled(false);
                        // show success notification
                        addToast(`${skill.title} has been deleted from your skills!`, {
                            appearance: 'success',
                            autoDismiss: true
                        })
                        handleModal();
                    })
                    .catch((error)=>console.error(error.response));
                    
            }
        } 
    }

    return(
        <>
        {
          width > 400 ?
            <Button 
                className="button-secondary" 
                onClick={() => handleModal()}
                disabled={props.disabled}
                style={{margin: "0px 5px 20px 0px"}}
            >
                        Delete skills &nbsp;
                    <DeleteIcon fontSize="small"/>
            </Button> 
            : width > 320 ?
                <Button 
                    className="button-secondary" 
                    onClick={() => handleModal()}
                    style={{width: "48%",margin:"10px 0"}}
                >
                            Delete skills &nbsp;
                        <DeleteIcon fontSize="small"/>
                </Button>
            :
            <Button 
                    className="button-secondary" 
                    onClick={() => handleModal()}
                    style={{width: "48%", fontSize:"13px",margin:"10px 0"}}
                >
                            Delete skills &nbsp;
                        <DeleteIcon fontSize="small"/>
                </Button>
        }
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
                <h2  style={{fontWeight: "700", color:"var(--main-blue)"}}>Skills</h2>
                <p>Below you can delete skills from your profile.</p>
               
                <Autocomplete
                    multiple
                    id="tags-filled"
                    onChange={(event,value)=> handleDelete(value)}
                    options={skills.map((option)=> option.title)}
                    renderTags={(value, getTagProps) =>{
                        // console.log(value);
                        return value.map((option, index) => (
                            <Chip 
                                label={option} {...getTagProps({ index })} 
                                className="skill-tag"  
                                deleteIcon={<ClearIcon style={{color: "white", width: "16px"}}/>}
                                style={{margin:'5px 2px'}}
                            />
                        ))
                        }
                }
                    renderInput={(params) => (
                        <TextField {...params} label="Delete Skills" placeholder="Skill" />
                    )}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button className="button-secondary" onClick={() => handleModal()}>Cancel</Button>
                <Button className="button-primary" onClick={() => deleteSkills()} disabled={disabled}>{disabled ? "Deleting..." : "Delete"}</Button>
            </Modal.Footer>
        </Modal>
</>
    );
}


// make all skill types exportable
export {AllDefaultSkills, EndorsingSkill, HighlightedSkill, AllSkills, AllPublicSkills, Skill};
