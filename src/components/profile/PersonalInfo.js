import React,{useEffect} from 'react';
import Image from 'react-bootstrap/Image';
import axios from "axios";

const PersonalInfo = (props) => {

    return (
        <>
            <div className="picture-name-con">

                <Image 
                    src={props.student.photo} 
                    roundedCircle 
                    width={100} 
                    height={100} 
                    className="profile-pic"
                />
                <h1>{props.student.displayName}</h1>
            </div>

        </>
    );
}

export default PersonalInfo;

