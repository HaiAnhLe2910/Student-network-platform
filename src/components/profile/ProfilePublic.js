import React, {useState, useEffect} from 'react';
import useWindowSize from "@wbe/use-window-size";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
// API
import axios from '../config.js';
// Notifications
import { ToastProvider } from 'react-toast-notifications'
// Components
import {About} from './About';
import PersonalInfo from './PersonalInfo';
import ProjectsOverview from './ProjectsOverview';
import Button from 'react-bootstrap/Button';
import { AllPublicSkills} from './Skill';
// Loaders
import {PersonalInfoLoaderPublic,AboutLoader, SkillPublicLoader, ProjectsOverviewLoader} from './Loader';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
// Styling & Icons
import './pofile.css';
import '../Common/Button.css';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';


const ProfilePublic = (props) => {

    // let id = 5;
    console.log(props);
    const { width } = useWindowSize();
    const history = useHistory();
    var [loading, setLoading] = useState(true);
    var [student, setStudent] = useState({})
    var [skills, setSkills] = useState([]);
    var [ownedProject, setOwnedProject] = useState([])
    var [joinedProject, setJoinedProject] = useState([])
    var [user, setUser] = useState({})

    useEffect(()=>{
        getProfileData();
      },[]);

    const getProfileData = () =>{
        // change id for props.id
        axios.get(`/student/${props.history.location.data.student}`)
            .then((res) => {
                console.log(res);
                setStudent(res.data);
                setSkills(res.data.skills);  
                setOwnedProject(res.data.ownedProjects);
                setJoinedProject(res.data.joinedProjects);
            }).then(json => {
                setLoading(false);
              })
            .catch((error) => {
                
                if(error.response.status === 401){
                    //    redirect to login page
                } 
                console.error(error.response.status);
            });
        
        axios.get('/student/me')
        .then((res) => {
            setUser(res.data);
        }).catch((error)=>{
            console.error(error.response.status);
        })
    }

    return (
        <>
            <Link to={{ pathname: "/projectdetails", data: props.history.location.data.project }}>
                <Button className="button-secondary" style={{margin:"30px"}}>
                    <ArrowBackIos className="btn-arrow"/>
                    <span>Back</span>
                </Button>
            </Link>
            <div className="public-container">

                {/* Personal Information */}
                <ReactPlaceholder ready={!loading} showLoadingAnimation  customPlaceholder={<PersonalInfoLoaderPublic screen={width < 500 && "mobile"}/>}> 
                    <PersonalInfo student={student} />
                    <div className="p-data-container">
                        <div className="p-info-container">
                            <b>Email address</b>
                            <p>{student.email}</p>
                        </div>
                        <div className="p-info-container">
                            <b>Study Program</b>
                            <p>{student.department}</p>
                        </div>
                    </div>
                </ReactPlaceholder>

                {/* about */}
                <ReactPlaceholder ready={!loading} showLoadingAnimation  customPlaceholder={<AboutLoader screen={width < 500 && "mobile"}/>}> 
                    <About description={student.description} />
                </ReactPlaceholder>

                {/* Skills */}
                <ReactPlaceholder ready={!loading} showLoadingAnimation  customPlaceholder={<SkillPublicLoader screen={width < 500 && "mobile"}/>}> 
                    <div className="skills-container">
                        <h2>Skills</h2>
                        <ToastProvider>  
                            <AllPublicSkills 
                                skills={skills} 
                                private={false} 
                                owner={student}
                                user={user} 
                            />
                        </ToastProvider>
                    </div>
                </ReactPlaceholder>

                {/* Projects */}
                <ReactPlaceholder ready={!loading} showLoadingAnimation  customPlaceholder={<ProjectsOverviewLoader screen={width < 500 && "mobile"}/>}> 
                    <div className="projects-container">
                        <ProjectsOverview 
                            ownedProject = {ownedProject} 
                            joinedProject = {joinedProject} 
                            student = {student} 
                            private = {false}
                        />
                    </div>
                </ReactPlaceholder>
            </div>
        </>
    );

}
export default ProfilePublic;
