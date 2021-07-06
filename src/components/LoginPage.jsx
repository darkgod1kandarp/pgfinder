import React, { useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';
export default function LoginPage(){
    const history =  useHistory();
    return(

        <div>
          <button onClick ={()=>{history.push("/home")}} >As PG Owner</button>
          <button onClick = {()=>{history.push("/pgfinderlogin")}}>A PG Finder </button>
        </div>
        )
}