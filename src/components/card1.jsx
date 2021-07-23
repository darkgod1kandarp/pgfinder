import React from "react";
import { useState } from "react";
import Slider from './slider';
import { History } from "history";
import { useHistory } from "react-router-dom";

// import Imageslider from "./?Imagelider";
const Card1 = ({ data ,handleClick,slider,setSlider,image }) => {
  const history =useHistory()
  const name="owner"
  const pgid="21312312452t1351"
  return (
    <div className="">
      
      {!slider && (
        <div className="pg" style={{border:'1px solid rgba(0, 0, 0, 0.05)' , width:"max-content",Padding:"10px"}}>
          <div className="pg__img">
            <img
              src="https://images.unsplash.com/photo-1590212151175-e58edd96185b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=751&q=80"
              alt=".."
              onClick={handleClick}
              className={image}
              height="150px"
              width="150px"
            />
          </div>
          <div className="pg__content">
            <p className="pg--heading pg--padding">Vamos' 21</p>
            <p className="pgf--date  pg--padding">Facclities</p>
            <p className="pg--venue pg--padding">A.R.A, Ahmedabad</p>

            <div className="pg__linkcontainer pg--padding">
              <p className="pg--price ">₹7000</p>
              <button onClick={()=>{
                history.push(`details/${name}/${pgid}/`)
              }}>veiw more</button>
              <a href="" className="pg--link">
                View map
              </a>
            </div>
          </div>
        </div>
      )}
      {slider && 
      <div className="">
          {console.log(data.images)}    
          <button onClick={()=>{setSlider(false)}}>X</button>

      </div>
      }

    </div>
  );
};

export default Card1;
