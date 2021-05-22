import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Button.css';
import './header.css';

const Banner = () => {
    return (
        <Jumbotron style={{ backgroundImage: `url('/images/landingHeader.jpg')`, backgroundSize: "cover",height:"80vh", borderRadius:"0px"}}>
            <div style={{ 
                position: "relative",   
                display:"flex",
                height:"100%",
                flexFlow:"column wrap",
                width:"100%",
                alignItems:"center",
                justifyContent:"center",
                color: "#fff" }} className="banner-text-con"
            >
                <h1 style={{ position: 'relative', float: 'left', color: '#fff' ,alignSelf:"flex-start"}}>ITEAM</h1>
                <div style={{
                    justifySelf:"center",
                    flex: "2 1",
                    display: "flex",
                    flexFlow: "column wrap",
                    justifyContent: "center",
                alignItems:"center"}}
                >
                    <h1 style={{color:'white', fontSize:"45px", textAlign:"center", width: "75%"}}>Create your own project and find your fellow members</h1>
                    <p style={{textAlign:"center", fontSize:"16px", width:"60%"}}>
                        This is a social network where Fontys students can
                        create the personal projects and connect with fellow colleagues
                    </p>
                </div>
            </div>
        </Jumbotron>

    )
}
export default Banner;