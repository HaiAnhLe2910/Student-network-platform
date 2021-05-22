import React , {useState} from 'react';
import Chip from '@material-ui/core/Chip';
import Image from 'react-bootstrap/Image';
import StarIcon from '@material-ui/icons/Star';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import './skills.css';


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
 * Returns all skills both private and public
 * 
 * @param  props 
 */
const AllSkills = (props) => {
    
    // all skills
    const [skills] = useState(props.skills);

    // get top 3 endorsed skills
    const [topSkills] = useState([].concat(skills).sort((a,b) => a.endorsements.length - b.endorsements.length).slice(1).slice(-3));
    // skills not in top 3
    const [otherSkills] = useState([].concat(skills).sort((a,b) => a.endorsements.length - b.endorsements.length).slice(0,-3))

    const [softSkill] = useState(otherSkills.filter((s)=>{return s.type==="soft skill"}));
    const [hardSkill] = useState(otherSkills.filter((s)=>{return s.type==="hard skill"}));

    return (
        <div className="all-skill-container">
            <div className="highlighted-skill-con">
                {
                    topSkills !== [] && <h5>Highlighted Skills</h5>
                }
                {
                    topSkills.map((skill) => 
                        <HighlightedSkill 
                            students={props.students} 
                            skill={skill} 
                            user={props.user}
                        />)
                }
            </div>
            <div className="normal-skill-con">
                <div className="skill-type-con">
                {
                    // show hard skills if applicable
                    hardSkill != [] && <>
                        <h6>Industry Knowledge</h6>
                        {
                            hardSkill.map((skill) => 
                            <EndorsingSkill 
                                skill={skill}
                                user={props.user}
                            />
                        )
                        }
                    </>
                }
                </div>
               
                <div className="skill-type-con">
                {
                    // show soft skills if applicable
                    softSkill != [] && <>
                        <h6>Personal & Interpersonal Skills</h6>
                        {
                            softSkill.map((skill) => 
                            <EndorsingSkill 
                                skill={skill}
                                user={props.user}
                            />
                        )
                        }
                    </>
                }
                </div>
                {/* {
                    otherSkills.map((skill) => 
                        <EndorsingSkill 
                            skill={skill}
                            user={props.user}
                        />
                    )
                } */}
            </div>
        </div>
    );
}

/**
 * This type returns a highlighted skill with endorsements and option to
 * endorse if the user is not te owner and has not endorsed the
 * skill yet
 * 
 * @param props students: [{}] / skill: {} / user: {}
 */
const HighlightedSkill = (props) => {

    const [endorsed, setEndorsed] = useState(props.skill.endorsements.includes(props.user.id));
    const [endorsements, setEndorsements] = useState(props.skill.endorsements);

    /**
     * This method increases the endorsement of a skill
     * 
     * @param user  the user endorsing the skill
     */
    const increaseIndorsement = (user) => {
        // add the endorser to the list
        setEndorsements(endorsements.concat(user.id));
        // make sure the endorser cannot endorse again
        setEndorsed(true);
    }


    /**
     * Returns plus (+) button if the skill has not been endorsed yet
     */
    const endorseIcon = () =>{
        // check if user is the one viewing the skill 
        if(props.user.id === props.skill.studentId){
            // return nothing
            return ""
        }
        // check if the skill hasn't been endorsed yet
        else if(!endorsed){
            // if so show button for endorsing
            return <div className="end-hgh-skill">
                    <AddCircleOutlineIcon 
                        onClick={()=>increaseIndorsement(props.user)} 
                        style={{fontSize:"30px", marginRight: "20px", color: "#888", cursor: "pointer"}}/>
                    </div>
        }
        // in all other cases return nothing
        else{
            return <div className="end-hgh-skill"> 
                <AddCircleOutlineIcon 
                    onClick={()=>increaseIndorsement(props.user)} 
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
                        // get the photo of the first person who endorsed the skill 
                        props.students.map((s)=>{
                            if(s.id === endorsements[0]){
                                return <Image src={s.photo} roundedCircle width={30} height={30} key={s.id}/>
                            }
                        })
                    }

                    <p>
                        Endorsed by &nbsp;
                        {/* {
                            // if the user has endorsed the skill
                            props.skill.endorsements.includes(props.user.id) && <b>you, </b> 
                        } */}
                        <b>{
                            // get the name of the firs person who endorsed the skill
                            props.students.map((s)=> s.id === endorsements[0] ? s.givenName : '')
                        } </b>
                        { 
                            // show how many others endorsed the skill
                            !(endorsements.length-1 <= 0 ) ? ((endorsements.length-1 === 1) ? (` and ${endorsements.length -1} other`) : (` and ${endorsements.length -1} others`)) : "" 
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

    const [endorsed, setEndorsed] = useState(props.skill.endorsements.includes(props.user.id));
    const [endorsements, setEndorsements] = useState(props.skill.endorsements);

    /**
     * This method increases the endorsment of a students skill
     * 
     * @param user  the user endorsing the skill
     */
    const increaseIndorsement = (user) => {
        // add the endorser to the list
        setEndorsements(endorsements.concat(user.id));
        // make sure the endorser cannot endorse again
        setEndorsed(true);
    }

    // check if user is the one viewing the skill 
    if(props.user.id === props.skill.studentId){
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
        onDelete={()=>increaseIndorsement(props.user)}
        deleteIcon = { <AddCircleOutlineIcon  style={{color:"white"}}/> }
        />;
    }
        
    
}


// make all skill types exportable
export {AllDefaultSkills, EndorsingSkill, HighlightedSkill, AllSkills, Skill};
