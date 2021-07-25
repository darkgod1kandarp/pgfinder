import React,{useState} from "react";
import { useHistory } from "react-router";
 
const Dashboard = () => {

    const history =useHistory()

    return (<>

    <div className="dashboard--navbar">
      <button className="dashboard--logout">Logout</button>

    </div>
      <div className="main">
        <button onClick={()=>{
          history.push("/owner")
        }}> Add PG</button>

      </div>

    </> );
}
 
export default Dashboard;
