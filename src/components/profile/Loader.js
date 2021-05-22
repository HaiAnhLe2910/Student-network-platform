import React from "react"
import ContentLoader from "react-content-loader"


import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders';


const PersonalInfoLoaderPrivate = (props)=> {
  let maxW="";
  switch (props.screen) {
    case "mobile":
      maxW="100%"
      break;
  
    default:
      maxW="50%"
      break;
  }

  return <div className='loading_placeholder'>
    <div style={{display: "flex",alignItems:"center"}}>
      <RoundShape showLoadingAnimation color='#E0E0E0' style={{ width: 100, height: 100, margin: "10px 0", borderRadius: "50%" }} />
      <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 155, height: 25, borderRadius: "3px", margin:"0 20px" }} />
    </div>
      
      <TextBlock showLoadingAnimation color='#E0E0E0' style={{maxWidth: maxW, margin: "10px 0", borderRadius: "10px",}} rows={4}/>
      <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 140, height: 28, borderRadius: "3px", margin:"20px 0px" }} />
  </div>
};


const PersonalInfoLoaderPublic = (props)=> {
  let maxW="";
  switch (props.screen) {
    case "mobile":
      maxW="100%"
      break;
  
    default:
      maxW="50%"
      break;
  }

  return <div className='loading_placeholder'>
    <div style={{display: "flex",alignItems:"center"}}>
      <RoundShape showLoadingAnimation color='#E0E0E0' style={{ width: 100, height: 100, margin: "10px 0", borderRadius: "50%" }} />
      <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 155, height: 25, borderRadius: "3px", margin:"0 20px" }} />
    </div>
      
      <TextBlock showLoadingAnimation color='#E0E0E0' style={{maxWidth: maxW, margin: "10px 0", borderRadius: "10px",}} rows={2}/>
  </div>
};

const AboutEditLoader = (props) => {
  let maxW="";
  switch (props.screen) {
    case "mobile":
      maxW="100%"
      break;
  
    default:
      maxW="50%"
      break;
  }

  return <div className='loading_placeholder' style={{marginTop:"50px"}}>
      <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 80, height: 28, borderRadius: "3px", margin:"20px 0px" }} />
      <TextBlock showLoadingAnimation color='#E0E0E0' style={{maxWidth: maxW, margin: "10px 0", borderRadius: "10px",}} rows={3}/>
      <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 60, height: 28, borderRadius: "3px", margin:"20px 0px" }} />
  </div>
}

const AboutLoader = (props) => {
  let maxW="";
  switch (props.screen) {
    case "mobile":
      maxW="100%"
      break;
  
    default:
      maxW="75%"
      break;
  }

  return <div className='loading_placeholder' style={{marginTop:"50px"}}>
      <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 80, height: 28, borderRadius: "3px", margin:"20px 0px" }} />
      <TextBlock showLoadingAnimation color='#E0E0E0' style={{maxWidth: maxW, margin: "10px 0", borderRadius: "10px",}} rows={3}/>
  </div>
}

const SkillEditLoader = (props) => {
  let maxW="";
  switch (props.screen) {
    case "mobile":
      maxW="100%"
      break;
  
    default:
      maxW="50%"
      break;
  }

  return <div className='loading_placeholder' style={{marginTop:"50px"}}>
      {/* title */}
      <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 80, height: 28, borderRadius: "3px", margin:"20px 0px" }} />
      {/* buttons */}
      <div style={{display: "flex", justifyContent:props.screen==="mobile"?"flex-start":"flex-end", width:props.screen==="mobile"?"100%":"80%"}}>
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: props.screen==="mobile"?"45%":100, height: 28, borderRadius: "3px", margin:"10px 5px 20px 0" }} />
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: props.screen==="mobile"?"45%":80, height: 28, borderRadius: "3px", margin:"10px 5px 20px 0" }} />
      </div>
      {/* skills */}
      <div style={{display: "flex", flexFlow:"row wrap", width:props.screen==="mobile"?"100%":"65%"}}>
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 44, height: 24, borderRadius: "12px", margin:"5px 5px 5px 0" }} />
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 74, height: 24, borderRadius: "12px", margin:"5px 5px 5px 0" }} />
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 84, height: 24, borderRadius: "12px", margin:"5px 5px 5px 0" }} />
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 114, height: 24, borderRadius: "12px", margin:"5px 5px 5px 0" }} />
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 44, height: 24, borderRadius: "12px", margin:"5px 5px 5px 0" }} />
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 74, height: 24, borderRadius: "12px", margin:"5px 5px 5px 0" }} />
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 84, height: 24, borderRadius: "12px", margin:"5px 5px 5px 0" }} />
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 114, height: 24, borderRadius: "12px", margin:"5px 5px 5px 0" }} />
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 74, height: 24, borderRadius: "12px", margin:"5px 5px 5px 0" }} />
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 84, height: 24, borderRadius: "12px", margin:"5px 5px 5px 0" }} />
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 114, height: 24, borderRadius: "12px", margin:"5px 5px 5px 0" }} />
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 44, height: 24, borderRadius: "12px", margin:"5px 5px 5px 0" }} />        
      </div>
  </div>
}

const SkillPublicLoader = (props) => {
  let maxW="";
  switch (props.screen) {
    case "mobile":
      maxW="100%"
      break;
  
    default:
      maxW="50%"
      break;
  }

  return <div className='loading_placeholder' style={{marginTop:"50px"}}>
      {/* title */}
      <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 80, height: 28, borderRadius: "3px", margin:"20px 0px" }} />
      {/* skills */}
      <div style={{display: "flex", flexFlow:"row wrap", width:props.screen==="mobile"?"100%":"65%"}}>
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 44, height: 24, borderRadius: "12px", margin:"5px 5px 5px 0" }} />
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 74, height: 24, borderRadius: "12px", margin:"5px 5px 5px 0" }} />
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 84, height: 24, borderRadius: "12px", margin:"5px 5px 5px 0" }} />
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 114, height: 24, borderRadius: "12px", margin:"5px 5px 5px 0" }} />
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 44, height: 24, borderRadius: "12px", margin:"5px 5px 5px 0" }} />
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 74, height: 24, borderRadius: "12px", margin:"5px 5px 5px 0" }} />
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 84, height: 24, borderRadius: "12px", margin:"5px 5px 5px 0" }} />
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 114, height: 24, borderRadius: "12px", margin:"5px 5px 5px 0" }} />
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 74, height: 24, borderRadius: "12px", margin:"5px 5px 5px 0" }} />
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 84, height: 24, borderRadius: "12px", margin:"5px 5px 5px 0" }} />
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 114, height: 24, borderRadius: "12px", margin:"5px 5px 5px 0" }} />
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 44, height: 24, borderRadius: "12px", margin:"5px 5px 5px 0" }} />        
      </div>
  </div>
}


const ProjectsOverviewLoader = (props) => {
  let maxW="";
  switch (props.screen) {
    case "mobile":
      maxW="100%"
      break;
  
    default:
      maxW="50%"
      break;
  }

  return <div className='loading_placeholder' style={{marginTop:"50px"}}>
      {/* titel */}
      <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 80, height: 28, borderRadius: "3px", margin:"20px 0px" }} />

      {/* sub */}
      <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 140, height: 20, borderRadius: "3px", margin:"20px 0px 10px 0px" }} />

      {/* projects */}
      <div style={{display: "flex", flexFlow:props.screen==="mobile"?"column wrap":"row wrap"}}>
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: props.screen==="mobile"?"100%":180, height: 80, borderRadius: "3px", margin:"5px 20px 0px 0px" }} />
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: props.screen==="mobile"?"100%":180, height: 80, borderRadius: "3px", margin:"5px 20px 0px 0px" }} />
      </div>

      {/* sub */}
      <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: 150, height: 20, borderRadius: "3px", margin:"20px 0px 10px 0px" }} />

      {/* projects */}
      <div style={{display: "flex", flexFlow:props.screen==="mobile"?"column wrap":"row wrap", width:props.screen==="mobile"?"100%":"80%"}}>
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: props.screen==="mobile"?"100%":180, height: 80, borderRadius: "3px", margin:"5px 20px 0px 0px" }} />
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: props.screen==="mobile"?"100%":180, height: 80, borderRadius: "3px", margin:"5px 20px 0px 0px" }} />
        <RectShape showLoadingAnimation color='#E0E0E0' style={{ width: props.screen==="mobile"?"100%":180, height: 80, borderRadius: "3px", margin:"5px 20px 0px 0px" }} />
      </div>
  </div>
}


export { PersonalInfoLoaderPrivate,PersonalInfoLoaderPublic, AboutEditLoader, AboutLoader, SkillEditLoader, SkillPublicLoader,ProjectsOverviewLoader}


