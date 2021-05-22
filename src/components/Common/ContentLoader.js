import React from 'react';
import { Container } from 'react-bootstrap';
import ContentLoader from 'react-content-loader';
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders';
import './ContentLoaderStyles.css'

/**
 * single project loader
 * @param {*} props 
 */
const Project = (props) => {
    let maxW="";
    switch (props.screen) {
        case "mobile":
        maxW="100%"
        break;
    
        default:
        maxW="100%"
        break;
    }

    return  <div className='loading_placeholder' style={{display: 'flex', flexFlow:"column wrap",borderRadius:"5px", padding:"5px 10px", margin: "20px 0 5px 0",boxShadow: "0px 2px 6px 2px #E0E0E0"}}>
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 140, height: 28, borderRadius: "3px", margin:"20px 0px 10px 0px" }} />
        <div style={{display: "flex", alignItems:"center", width: "100%", justifyContent:"space-between"}}>
            <div style={{display: "flex",alignItems:"center"}}>
                <RoundShape showLoadingAnimation color='#E0E0E0' style={{ width: 35, height: 35, margin: "10px 0", borderRadius: "50%" }} />
                <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 155, height: 18, borderRadius: "3px", margin:"0 20px" }} />
            </div>
            <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 250, height: 18, borderRadius: "3px"}} />
        </div>
      
      <TextBlock showLoadingAnimation color='#E0E0E0' style={{maxWidth: maxW, margin: "10px 0", borderRadius: "10px",}} rows={1}/>
      <TextBlock showLoadingAnimation color='#E0E0E0' style={{maxWidth: maxW, borderRadius: "10px",width:"30%"}} rows={2}/>
      <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 28, height: 28, borderRadius: "3px", margin:"5px 0px" , alignSelf:"flex-end"}} />
  </div>
}

/**
 * list projects loader
 * @param {*} props 
 */
const ProjectLoader = (props) =>{
    return <div style={{marginBottom:"20px"}}>
        <Project screen={props.screen}/>
        <Project screen={props.screen}/>
        <Project screen={props.screen}/>
    </div>
}

const Member = (props) => {
    return <div style={{display:"flex", alignItems:"center"}}>
        <RoundShape showLoadingAnimation color='#E0E0E0' style={{ width: 50, height: 50, margin: "10px 0", borderRadius: "50%" }} />
          <div style={{display:"flex", flexFlow:"column wrap", flex:"2 1"}}>
              <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: "90%",height: 18, borderRadius: "3px", margin:"10px" }} />
              <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: "50%",height: 12, borderRadius: "3px", margin:"0px 10px" }} />
              {props.type&&<RectShape showLoadingAnimation color='#E0E0E0' style={{ width: "95%",height: 10, borderRadius: "3px", margin:"10px 10px" }} />}
          </div>
        {props.type&&<RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 20, height: 20, borderRadius: "3px", margin:"5px"}} />}
    </div>
}

const ProjectDetailsLoader = (props) => {
    let maxW="";
    switch (props.screen) {
        case "mobile":
        maxW="100%"
        break;
    
        default:
        maxW="100%"
        break;
    }

    return <div className='loading_placeholder'>
        {/* container */}
        <div className="prj-det-container" >
            {/* title */}
            <RectShape showLoadingAnimation color='#E0E0E0' style={{ 
                width: 140, 
                height: 28, 
                borderRadius: "3px", 
                margin:"20px 0px 10px 0px", 
                alignSelf:"center" }} 
            />
            <div className="details-con" style={{height:"75vh"}}>
                <div style={{
                    borderRadius:"5px",
                    border:"1px solid #ededeb", 
                    width:"60%", 
                    padding:"20px", 
                    height:"50vh",
                    margin:"20px 0px 20px 20px"
                    }}
                >
                    {/* description */}
                    <TextBlock showLoadingAnimation color='#E0E0E0' style={{width:"95%", margin: "10px 0", borderRadius: "10px",}} rows={4}/>
                </div> 
                <div className="members-con" style={{
                    display:"flex", 
                    flexFlow:"column wrap",
                    width: "30%",
                    margin:"20px",
                    height: "fit-content"}}
                >{/*(column wrap)  */}
                    {/* owner */}
                    <div style={{
                        borderRadius:"5px",
                        border: "1px solid #ededeb", 
                        padding:"20px",
                   }}
                    >
                    <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: "100%", height: 24, borderRadius: "3px", marginBottom:"10px" }} />
                    <Member />
                    
                    
                    </div>
                    {/* members */}
                    <div style={{
                        borderRadius:"5px",
                        border: "1px solid #ededeb", 
                        padding:"20px",
                    margin: "20px 0"}}
                    >
                        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: "100%", height: 24, borderRadius: "3px", marginBottom:"10px" }} />
                        <Member type="member"/>
                        <Member type="member"/>
                        <Member type="member"/>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    </div>
}


export  {ProjectLoader , ProjectDetailsLoader};