import React, {useEffect,useState} from 'react';
import { Redirect } from 'react-router-dom';
import useWindowSize from "@wbe/use-window-size";
// Notifications
import { ToastProvider } from 'react-toast-notifications'
// components
import { AboutEdit } from './About';
import ProjectsOverview from './ProjectsOverview';
import { AllSkills } from './Skill';
import DeleteProfile from './DeleteProfile';
import PersonalInfo from './PersonalInfo';
import ChangePassword from './ChangePassword';
// API
import axios from '../config.js';
// Loaders
import {PersonalInfoLoaderPrivate, AboutEditLoader, SkillEditLoader, ProjectsOverviewLoader} from './Loader';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
// styling
import './pofile.css';
import '../Common/Button.css';

const ProfilePrivate = (props) => {

    const { width, height } = useWindowSize();
    
    var [loading, setLoading] = useState(true);
    var [student, setStudent] = useState({})
    var [skills, setSkills] = useState([]);
    var [ownedProject, setOwnedProject] = useState([])
    var [joinedProject, setJoinedProject] = useState([])

    useEffect(()=>{
        getProfileData();
      },[]);

     
    /**
     * get the users information
     */
    const getProfileData = () =>{
        axios.get('/student/me')
            .then((res) => {
                setStudent(res.data);
                setSkills(res.data.skills);  
                setOwnedProject(res.data.ownedProjects);
                setJoinedProject(res.data.joinedProjects);
            }).then(json => {
                setLoading(false);
              })
            .catch((error) => {
                // unauthorized/invalid token
                if(error.response.status === 401){
                    // remove token from local storage
                    localStorage.removeItem("token");
                    // redirect to landing
                    return <Redirect to='/landing' />
                } 
                console.error(error.response.status);
            });
        // console.log(skills);
    }
    

    /**
     * Update the user's description in the view
     * 
     * @param {*} value the new description value the user has provided
     */
    const updateAbout = (value) => {
        setStudent({...student, description:value});
    }

    /**
     * handle changes to the skills
     * @param {} skill 
     */
    const handleAddSkill = (skill) => {
        console.log("PARENT-HIRE: ", skill);
        getProfileData();
        // setSkills(skills => [...skills,skill]);    
    };

    return (
        <>
            <div className="public-container">

                {/* personal information */}
                <ReactPlaceholder ready={!loading} showLoadingAnimation  customPlaceholder={<PersonalInfoLoaderPrivate screen={width < 500 && "mobile"}/>}> 
                    <PersonalInfo student={student} />
                    <div className="p-data-container">
                        <div className="p-info-container">
                            <b>First Name</b>
                            <p>{student.givenName}</p>
                        </div>
                        <div className="p-info-container">
                            <b>Surname</b>
                            <p>{student.surName}</p>
                        </div>
                        <div className="p-info-container">
                            <b>Email address</b>
                            <p>{student.email}</p>
                        </div>
                        <div className="p-info-container">
                            <b>Study Program</b>
                            <p>{student.department}</p>
                        </div>
                    </div>
                    <ToastProvider>
                        <ChangePassword email={student.email}/>
                    </ToastProvider>
                </ReactPlaceholder>

                {/* about */}
                <ReactPlaceholder 
                    ready={!loading} 
                    showLoadingAnimation  
                    customPlaceholder={
                        <AboutEditLoader screen={width < 500 && "mobile"}
                        />}
                    > 
                <ToastProvider>
                    <AboutEdit 
                        description={student.description} 
                        onChange={updateAbout} 
                        student={student}
                    />
                    </ToastProvider>     
                </ReactPlaceholder>

                {/* Skills */}
                <ReactPlaceholder ready={!loading} showLoadingAnimation  customPlaceholder={<SkillEditLoader screen={width < 500 && "mobile"}/>}> 
                    <div className="skills-container">
                        <h2>Skills</h2>
                        <ToastProvider>  
                            <AllSkills 
                                skills={skills} 
                                private={true} 
                                onAddSkillHandle={handleAddSkill}
                                user={student}  
                            />
                        </ToastProvider>  
                    </div>
                </ReactPlaceholder>

                {/* Projects */}
                <ReactPlaceholder ready={!loading} showLoadingAnimation  customPlaceholder={<ProjectsOverviewLoader screen={width < 500 && "mobile"}/>}> 
                    <ProjectsOverview 
                        ownedProject = {ownedProject} 
                        joinedProject = {joinedProject} 
                        student = {student} 
                        private = {true}
                    />
                </ReactPlaceholder> 
            </div>

            {/* Delete profile */}
            <DeleteProfile student={student} />
        </>
    );

}
export default ProfilePrivate;
