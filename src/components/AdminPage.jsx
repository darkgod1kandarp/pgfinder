import React, { useEffect,useState } from 'react';
import axios from 'axios';

const AdminPage = ()=>{


    
     const [state,setState] = useState([]);
     const handelClick = (id)=>{
         console.log(typeof(id))
         axios({
            method: "post",
            url: "http://localhost:5000/api/dataremoving",
           data:{id}
          }).then ((res)=>console.log(res))
      setState((state)=>state.filter((x)=>x.pgid!==id));
        
    }
    useEffect(() =>{
      

      axios({
        method: "get",
        url: "http://localhost:5000/api/verificationpg"
    }).then((res)=>{
       setState(res.data.data)
    })


         
    },[])
    return(
  <div>
      <div class="header" style ={{height:"100px",width:"100%",backgroundColor:"blue"}}></div>
      {state.map((x)=>{return(
          <div className ="main" style={{display:"flex"}}><p>{x.address}</p><p>{x.name1}</p><p>{x.pgname}</p><p>{x.number1}</p><button id={x.pgid} onClick={({target})=>{handelClick(target.id)}}>verified</button></div>
      )
              
      })}

  </div>
    )
}

export default AdminPage ;
