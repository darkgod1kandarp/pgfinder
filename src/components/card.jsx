import React,{useState} from "react"
import "./box.css"
import { useHistory } from "react-router-dom";
const Card = ()=>{
    const history = useHistory();
     

    const[state,setState] = useState(true)
    const[array,setArray] = useState([]);

    const handleClick = ({target})=>{
     
        setArray(()=>target.className.split(" "));
        console.log(array);

        
       
    }
    return(
        <>
        {state ?
        <div className="App1">
            
         <div className="part1 sidebar">


                <div className="querybox">
                    <h>kandarp</h>
                </div>
            </div> 
           
            <div className = "part1 grid">

                <div className="box box1">
                    <div className="upper">
                        <div className="left">
                            
                                <img onClick={handleClick} className ="image2 0" src={"https://www.howtogeek.com/wp-content/uploads/2018/06/shutterstock_1006988770.png?height=200p&trim=2,2,2,2"} alt="logo/" />
                           
                        </div>
                        <div className="right"></div>
                    </div>
                    <div className="lower"></div>
                </div>
                <div className="box box1">
                    <div className="upper">
                        <div className="left">
                            
                                <img onClick={handleClick} className ="image2 0" src={"https://www.howtogeek.com/wp-content/uploads/2018/06/shutterstock_1006988770.png?height=200p&trim=2,2,2,2"} alt="logo/" />
                           
                        </div>
                        <div className="right"></div>
                    </div>
                    <div className="lower"></div>
                </div>
                <div className="box box1">
                    <div className="upper">
                        <div className="left">
                            
                                <img onClick={handleClick} className ="image2 0" src={"https://www.howtogeek.com/wp-content/uploads/2018/06/shutterstock_1006988770.png?height=200p&trim=2,2,2,2"} alt="logo/" />
                           
                        </div>
                        <div className="right"></div>
                    </div>
                    <div className="lower"></div>
                </div>
                
                
               
                
                
                
            </div>
        </div>:null}</>
    );
}

export default Card;