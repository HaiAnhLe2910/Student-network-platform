import React from 'react';
import './Button.css';


const Footer =() => {
    return (
      <div>
        <footer id="footer" style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height:"3rem",
            textAlign:"center",
            background:"#E9C46A",
            padding: "20px auto", display: "flex", alignItems:"center",justifyContent:"center"   /* Footer height */
          }}>
          <span style={{fontSize: '14px',fontWeight:'medium' }}>
                &copy;{new Date().getFullYear()} ITEAM - All Rights Reserved
              </span>
        </footer>
      </div>
    );
}
export default Footer;