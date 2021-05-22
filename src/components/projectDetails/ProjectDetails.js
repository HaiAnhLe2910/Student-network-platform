import React, { useState, useEffect } from 'react';

import ProjectDetailsPrivate from './ProjectDetailsPrivate';
import ProjectDetailsPublic from './ProjectDetailsPublic';

import axios from '../config.js';

import { ToastProvider } from 'react-toast-notifications';

import { Ring } from 'react-awesome-spinners';
import { ProjectDetailsLoader } from '../Common/ContentLoader';

const ProjectDetails = (props) => {

    const [projectSpots, setProjectSpots] = useState([]);
    const [projectSpotsPrivate, setProjectSpotsPrivate] = useState([]);

    const [projectOwner, setProjectOwner] = useState([]);

    const [ownerId, setOwnerId] = useState();
    const [userId, setUserId] = useState();

    const [projectDetails, setProjectDetails] = useState({});
    let content = null;
    const [isMeLoading, setIsMeLoading] = useState(false);
    const [isProjectLoading, setIsProjectLoading] = useState(false);

    const [filledSpots, setFilledSpots] = useState([]);

    let arrayofSpots = [];

    let arrayofSpotsPrivate = [];
    
    let arrayofFilledSpots = [];

    let arrayofProjectOwner = []


    useEffect(() => {
        console.log(props.location.data);
        fetchAllProjects();
        fetchMe();
    }, [])

    const fetchMe = () => {
        setIsMeLoading(true);
      
        axios.get('student/me')
                      .then(res => {
                        setUserId(res.data.id);
                          setIsMeLoading(false);                          
  
                      })
                      .catch(error => {
                          console.log(error.response);
                      });
    }
    
    const fetchAllProjects = () => {
        setIsProjectLoading(true);

        console.log(props.location.data);
    
      axios.get('projects/' + props.location.data)
            .then(res => {

                console.log(res);

                setProjectDetails(res.data);

                setOwnerId(res.data.ownerId);

                if(res.data.ownerId != null){
                    arrayofProjectOwner.push({
                        ownerId:res.data.ownerId,
                        title: res.data.owner[0].fontysId,
                        description: "Project Owner",
                        image: res.data.owner[0].photo,
                      });
                }else{
                    arrayofProjectOwner.push({
                        ownerId:null,
                        title: "No project owner",
                        description: "Project Owner",
                        image: null,
                      });
                }

                setProjectOwner(arrayofProjectOwner);

                //setProjectSpots(res.data.spots);

                for (var i = 0; i < res.data.spots.length; i++) {

                    let skillsText = "";

                    if(res.data.spots[i].skills.length == 0){
                        skillsText = "None";
                    }

                    for(var p = 0; p < res.data.spots[i].skills.length; p++){

                        if(skillsText == ""){
                            skillsText = res.data.spots[i].skills[p].title;
                        }else{
                            skillsText += ", " + res.data.spots[i].skills[p].title;
                        }
                        

                    }

                    

                    if(res.data.spots[i].studentId != null){

                        console.log(res.data.spots[i].skills);

                        /*for(var p = 0; p < res.data.spots[i].skills.length; p++){
                            skills = skills + " " + res.data.spots[i].skills[p].title;
                        }

                        if(res.data.spots[i].skills.length == 0){
                            skills = "None";
                        }*/

                        arrayofSpots.push({
                            studentId:res.data.spots[i].studentId,
                            spotId:res.data.spots[i].id,
                            title: res.data.spots[i].student[0].fontysId,
                            description: res.data.spots[i].description,
                            image: res.data.spots[i].student[0].photo,
                            spotFree:false,
                            alreadyApplied:false,
                            skills: skillsText,
                            owner: res.data.spots[i].studentId == res.data.ownerId,
                          });
                    }else{
                        arrayofSpots.push({
                            studentId:res.data.spots[i].studentId,
                            spotId:res.data.spots[i].id,
                            title: null,
                            description: res.data.spots[i].description,
                            image: null,
                            spotFree:true,
                            alreadyApplied:false,
                            skills: skillsText,
                            owner: false,
                          });
                    }
                }

                for (var i = 0; i < res.data.spots.length; i++) {

                    let skillsText = "";

                    if(res.data.spots[i].skills.length == 0){
                        skillsText = "None";
                    }

                    for(var p = 0; p < res.data.spots[i].skills.length; p++){

                        if(skillsText == ""){
                            skillsText = res.data.spots[i].skills[p].title;
                        }else{
                            skillsText += ", " + res.data.spots[i].skills[p].title;
                        }   

                    }

                    if(res.data.spots[i].studentId != null){
                        arrayofSpotsPrivate.push({
                            id:res.data.spots[i].studentId,
                            title: res.data.spots[i].student[0].fontysId,
                            description: res.data.spots[i].description,
                            image: res.data.spots[i].student[0].photo,
                            owner: res.data.spots[i].studentId == res.data.ownerId,
                            skills: skillsText,
                          });
                          arrayofFilledSpots.push({
                            id:res.data.spots[i].studentId,
                            title: res.data.spots[i].student[0].fontysId,
                            description: res.data.spots[i].description,
                            image: res.data.spots[i].student[0].photo,
                            owner: res.data.spots[i].studentId == res.data.ownerId,
                            empty: false,
                          });
                    }else{
                            arrayofSpotsPrivate.push({
                                id:0,
                                title: res.data.spots[i].description,
                                description: "No member yet",
                                image: "images/sendRequest.png",
                                owner: false,
                                empty: true,
                                skills: skillsText,
                        });
                    }
                }

                console.log(arrayofSpots);

                console.log(arrayofSpotsPrivate);

                setProjectSpots(arrayofSpots);

                console.log(projectSpots);

                setFilledSpots(arrayofFilledSpots);

                setProjectSpotsPrivate(arrayofSpotsPrivate);

                setIsProjectLoading(false);
            })
            .catch(error => {
                console.log(error);
            });
    }

    if (isMeLoading || isProjectLoading) {

        console.log(isMeLoading);
        console.log(isProjectLoading);

        content = (
                // <Ring color= '#dbc37a'/>
                <ProjectDetailsLoader />
        );
      }
      else{
        console.log(isMeLoading);
        console.log(isProjectLoading);
        if (ownerId ==  userId) {
            content = (
                <ToastProvider>
                    <ProjectDetailsPrivate projectOwner={projectOwner} totalNumberofMembers={projectSpots.length} numberofMembersInProject={filledSpots.length} projectDetails={projectDetails} arrayofSpots={projectSpotsPrivate} userId={userId}></ProjectDetailsPrivate>
                </ToastProvider>
            );
        }else{
            content = (
                <ToastProvider>
                    <ProjectDetailsPublic projectOwner={projectOwner} projectDetails={projectDetails} arrayofSpots={projectSpots} userId={userId}></ProjectDetailsPublic>
                </ToastProvider>
            );
        }
        
    } 
      
    return content;

    
  
}
export default ProjectDetails;
