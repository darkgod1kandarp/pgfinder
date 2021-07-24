import React from "react";
import { useState,useEffect } from "react";
import Slider from "./slider";
import { History } from "history";
import { useHistory } from "react-router-dom";
import "./card1.scss"
// import Imageslider from "./?Imagelider";
const Card1 = ({ data, handleClick,loc, slider, pg, image ,setViewmore}) => {
  const history = useHistory();
  const name = "owner";
  const pgid = "21312312452t1351";

  const [map,setMap] =useState(false)
 console.log(data)
  const pglocation = { lat: data.lat, lng: data.lng };
  return (
    <div className="">
      {!slider && (
        <div class="pg--card">
          <div class="pg--image">
            <img
              src={data.url[0].imgurl}
              alt=".."
              width="180px"
              height="220px"
              onClick={handleClick}
              className={image}

            />
          </div>
          <div class="pg--content">
            <div class="pg--name">
              <p class="pg--name--text">{data.pgname}</p>
            </div>

            <div class="pg--property-value">
              <p class="pg--property">cost per bed</p>
              <p class="pg--value">{data.costperbed}</p>
            </div>

            <div class="pg--property-value">
              <p class="pg--property">Suitable</p>
              <p class="pg--value">{data.availability}</p>
            </div>
            <div class="pg--property-value">
              <p class="pg--property">Available Rooms</p>
              <p class="pg--value">{data.roomsforrent}</p>
            </div>

            <div class="pg--property-value">
              <p class="pg--property">sharing per Rooms</p>
              <p class="pg--value">{data.sharing}</p>
            </div>
            <div class="pg--property-value">
              <p class="pg--property">Address</p>
              <p class="pg--value">
                      {data.address}
              </p>
            </div>
            <div class="pg--btn-class">
              <button class="btn">Veiw More</button>
              <button class={pg} onClick={() => {
                  history.push({
                    pathname:"/map",
                    state:{...loc,...pglocation}
                  })

}}>Veiw Map</button>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default Card1;
