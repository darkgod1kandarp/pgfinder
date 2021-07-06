import React,{useState} from "react";
import Phase2 from "./phase2";
// export default fDashboard(){

// }
 
const Dashboard = () => {

    const[adding,setAdding] = useState(false);
    

    return (<>
      <button onClick={()=>setAdding(!adding)}>Add PG</button>
      {adding && <Phase2/>}
    
    </> );
}
 
export default Dashboard;
