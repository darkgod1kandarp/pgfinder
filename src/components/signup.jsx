import React, { useState } from 'react';
import GoogleLogin from "react-google-login";

const SignUp  =()=>{

  // variable declaration 
  const[state,setState] =  useState({});

  const responseGoogle = (response)=>{
    
    console.log(response);
  }


return(
    
    <div>

    
    <input  type ="email" placeholder ="email"></input>
    <input type="text" placeholder ="username" onChange = {({target})=>setState({...state,name :target.value})}></input>
    <input type ="text" placeholder = "password" onChange = {({target})=>setState({...state,password:target.value})}></input>
    

    
    
    <br></br>
    <br>
    </br>
    <p>or sign with google </p>
    <GoogleLogin
        clientId="863493315126-7lv128pfcvn3kl7gqv56c6928474gcth.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    

    </div>
)
}
export default SignUp;