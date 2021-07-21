// import React, { useState,useEffect} from 'react';
// import axios from 'axios';
// import { Login } from './login/Popup';
// import { useHistory } from "react-router-dom";

// const PgLogin = () => {
//     const [state, setState] = useState({
//         username:"",
//         password:""
//     })
//     const history = useHistory();
// const jwt=localStorage.getItem("jwt")
// useEffect(() => {
//     axios({
//         method: "post",
//         url: "http://localhost:5000/api/login1",
//         headers: { Authorization: jwt },
       
//       }).then((res)=>history.push("/pg")).catch((err)=>) 
// }, [jwt])

//     const [showModal, setShowModal] = useState("");
//     const handleClick= async ()=>{
//         if(state.username.length===0 || state.password.lenght===0){return}
//         else{
//             localStorage.setItem("data", JSON.stringify(state));
//             const credntials = await localStorage.getItem("data");
//             console.log(credntials)
//             axios({
//                 method: "post",
//                 url: "http://localhost:5000/api/login1",
          
//                 body: credntials,


//               }).then((response) => {
//                 console.log(response);
//                 localStorage.setItem("jwt", JSON.stringify(response.data));
//              history.push("/pg");
//                              });
//         }
//     }
    
    
    
    
//     return ( 
// <div className="">
// <button onClick={()=>{setShowModal("login")}}>login</button>
//       <Login
//         setState={setState}
//         state={state}
//         showModal={showModal}
//         setShowModal={setShowModal}
//         handleClick={handleClick}
//       />

// </div>
//      );
// }
 
// export default PgLogin;