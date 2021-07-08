import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
export default function LoginPage(){
    const history =  useHistory();
 
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
                
                if (response.data.data==="/pg"){ 
                  history.push({pathname:"/pg"});
                }
               
                
              })
              .catch((err) => console.log(err));
          })
         
      }
      fetchApi();   
    }
    },[history])
    return(

        <div>
          <button onClick ={()=>{history.push("/home")}} >As PG Owner</button>
          <button onClick = {()=>{history.push("/pgfinderlogin")}}>A PG Finder </button>
        </div>
        )
}

