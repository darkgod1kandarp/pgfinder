import React, { useState,useEffect } from 'react'
import GoogleLogin from 'react-google-login';
const PgFinderLogin = ()=>{
    const responseGoogle = (response) => {
        console.log(response);
      }
        
    
    return(<>  
      
    <input type="text" placeholder ="Username"></input>
    <input type  = "text" placeholder ="password"></input>
    <GoogleLogin
    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />

    
    
    </>);
}
export default PgFinderLogin