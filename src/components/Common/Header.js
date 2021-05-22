import React ,{useState,useEffect}from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Button.css';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import axios from '../config';
import './header.css';
const Header = () => {

  const handleSignout = () => {
    localStorage.removeItem("token");
    window.location.reload(false);
  }

  var [student,setStudent]=useState({});
  useEffect(()=>{
    
    axios.get('/student/me')
            .then((res) => {
                
                setStudent(res.data);

                //store userId in localStorage
                localStorage.setItem('currentStudentId', res.data.id);
              }).catch((error)=>{
                /* if(error.response.status === 401){
                  localStorage.removeItem('token');
              } 
              console.error(error.response.status); */
              console.log('123');
              })
  },[])

  return (
    <div>
      <Navbar collapseOnSelect  expand="sm" variant="light" style={{ backgroundColor: "#E9C46A" }}>
        <Navbar.Brand style={{color:'black',fontWeight:'bold'}} >
          ITEAM
         </Navbar.Brand>

        {/*Navbar.Toggle and Navbar.Collapse are to display the collapsed navbar as a menu when the screen is narrower  */}
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav.Link as={Link} to="/home"><span style={{fontSize: '15px',fontWeight:'medium' , color:"black"}}>Home</span></Nav.Link>
          <Nav.Link as={Link} to="/createProject"><span style={{fontSize: '15px',fontWeight:'medium', color:"black"}}>Create Project</span></Nav.Link>

          {/* Place user icon at the end of navBar */}
          <Nav className="ml-auto">
            {/* Drop down when user presses user icon on the right side  */}
            <NavDropdown alignRight title={
              <div 
                className="pull-left" 
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "black"
                }}>
                <p style={{margin:"0 15px" ,padding:"0"}}>{student.givenName}</p>
                  <Avatar round={true} src={student.photo} size="40" color="#E5E5E5"/>
              </div>}
              id="basic-nav-dropdown"
            >
              
              <NavDropdown.Item ><Avatar name="" round={true} src={student.photo} color="#E5E5E5"/></NavDropdown.Item>
              <NavDropdown.Item>{student.givenName} {student.surName}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/myProfile" key="1">Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/myProjects" key="2">Owned Projects</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/joinedProjects" key="3">Joined Projects</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/myRequests" key="4">Joined Requests</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/landing" key="3" onClick={handleSignout}>Sign out</NavDropdown.Item>
            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    

  );
}

export default Header;
