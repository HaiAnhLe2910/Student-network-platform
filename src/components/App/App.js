import React, { Component, useEffect, useState } from 'react';
//import './components/common/node_modules/bootstrap/dist/css/bootstrap.min.css';
//import '../common/node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from '../Common/Header';
import HeaderLanding from '../Common/HeaderLanding';
import Footer from '../Common/Footer';
import Login from '../login/Login';
import ChooseNewPassword from '../login/ChoosePassword';
import ResetPassword from '../login/ResetPassword';
import PasswordSent from '../login/PasswordSent';
import ProjectDetails from '../projectDetails/ProjectDetails';
import LandingPage from '../landing/LandingPage';
import Homepage from '../home/Homepage';
import MyProjectsPage from '../myProjects/MyProjectsPage';
import ProfilePrivate from '../profile/ProfilePrivate';
import ProfilePublic from '../profile/ProfilePublic';
import CreateProject from '../createProject/CreateProject';
import JoinedProjectsPage from '../myProjects/JoinedProjectPage';
import MyRequests from '../myProjects/MyRequests';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
// import {ProjectDetails} from '../projectDetails/ProjectDetails';

const App = () => {

    //token is null => user has not logged in yet=> redirect to landing page
    localStorage.setItem('signUpDomain', 'http://item.localhost');

    const [token, setToken] = useState(localStorage.getItem('token'));


    if (localStorage.getItem('token') == null) {
        return (
            <BrowserRouter>
                <div style={{position: "relative",minHeight:"100vh"}}>
                    <HeaderLanding />
                    <div style={{paddingBottom: "2.5rem"}}>
                    <Switch>
                        <Route path="/landing" component={LandingPage} />
                        <Route path="/login" component={Login} />
                        <Route path="/resetpassword" component={ResetPassword} />
                        <Route path="/passwordsent" component={PasswordSent} />
                        <Route path="/choosenewpassword" component={ChooseNewPassword} />
                        <Redirect from="/" to="/landing" />
                    </Switch>
                    </div>
                    <Footer />
                </div>
            </BrowserRouter>
        )
    } else {
        return (
            <BrowserRouter>
                <div style={{position: "relative", minHeight:"100vh"}}>
                    <Header />
                    <div style={{paddingBottom: "2.5rem"}}>
                    <Switch>
                        <Route path="/projectdetails" component={ProjectDetails} />
                        <Route path="/home" component={Homepage} />
                        <Route path="/myProjects" component={MyProjectsPage} />
                        <Route path="/myProfile" component={ProfilePrivate} />
                        <Route path="/profilePublic" component={ProfilePublic} />
                        <Route path="/createProject" component={CreateProject} />
                        <Route path="/joinedProjects" component={JoinedProjectsPage}/>
                        <Route path="/myRequests" component={MyRequests}/>
                        <Redirect from="/" to="/home" />
                    </Switch>
                    </div>
                    
                    <Footer />
                </div>
            </BrowserRouter>
        )
    }




}
export default App;
