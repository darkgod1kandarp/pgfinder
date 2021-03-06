import React,{useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import ScatterBoxLoader from './circleloader';
export default function LoginPage(){
    const history =  useHistory();
     const[loading,setLoading] =  useState(true);
 
    React.useEffect(() =>{
     
      const checkingIfTheLocalStorageHaveTheDataOrNot =   
      localStorage.getItem("jwt");
    console.log(checkingIfTheLocalStorageHaveTheDataOrNot);
    if (
      checkingIfTheLocalStorageHaveTheDataOrNot !== null ||
      checkingIfTheLocalStorageHaveTheDataOrNot !== undefined
    ) {
        var jwt;
        try{
        const { token } = JSON.parse(localStorage.getItem("jwt"));

     jwt = `Bearer ${token}`;
        }
        catch(err){
          jwt ="";
        }

    
      async function fetchApi() {
        await axios({
          method: "post",
          url: "https://murmuring-headland-03833.herokuapp.com/api/login",
          headers: { Authorization: jwt },
        })
          .then(async (res) => {
            const data = await JSON.parse(localStorage.getItem("data"));
            console.log(data);
            await axios({
              method: "post",
              url: "https://murmuring-headland-03833.herokuapp.com/api/datagaining",
              params: {
                data,
              },
              headers: { Authorization: jwt },
            })
              .then((response) => {
                 console.log(response);
                if (response.data.data==="/pg"){ 
                  history.push({pathname:"/pg"});
                }
                setLoading(false)
                
              })
              
              .catch((err) => setLoading(false));
          })
         
      }
      fetchApi();   
    }
    },[history])
    return(
         loading?<ScatterBoxLoader/>:
        <div>
          <button onClick ={()=>{history.push("/home")}} >As PG Owner</button>
          <button onClick = {()=>{history.push("/pgfinderlogin")}}>A PG Finder </button>
        </div>
        )
}

