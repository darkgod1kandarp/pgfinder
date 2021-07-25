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
      {/* {!slider && (
        <div className="card">
        <div className="card__left">
            <div
                style={{
                    backgroundImage: `url(${data.url[0]})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    background: 'cover',
                }}
                className="card__img-box"
            >
                &nbsp;
            </div>
        </div>
        <div className="card__right">
            <div className="card__title">Title</div>
            <div className="card__address">
                {' '}
                2, poonam apartment , Satyanarayan Soc., Ramnagar,
                Sabarmati, Ahmedabad
            </div>
            <div className="card__grid">
                <div className="card__grid-item">
                    <div className="card__grid-item--property">
                        Cost per bed{' '}
                    </div>
                    <div className="card__grid-item--value">1000 </div>
                </div>
                <div className="card__grid-item">
                    <div className="card__grid-item--property">
                        Suitable for
                    </div>
                    <div className="card__grid-item--value">Both</div>
                </div>
                <div className="card__grid-item">
                    <div className="card__grid-item--property">
                        Available rooms
                    </div>
                    <div className="card__grid-item--value">2</div>
                </div>
                <div className="card__grid-item">
                    <div className="card__grid-item--property">
                        Sharing per room
                    </div>
                    <div className="card__grid-item--value">2</div>
                </div>
            </div>
            <div className="card__link-box">
                <a href="#" className="card__link-map">
                    View in maps
                </a>
                <div className="card__link-more">
                    View More{' '}
                    <svg
                        className="arrow"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                    >
                        <defs>
                            <clipPath id="clip-path">
                                <rect width="16" height="16" fill="none" />
                            </clipPath>
                        </defs>
                        <g
                            id="Component_24_3"
                            data-name="Component 24 – 3"
                            clip-path="url(#clip-path)"
                        >
                            <path
                                id="Path_10"
                                data-name="Path 10"
                                d="M8,0,6.545,1.455l5.506,5.506H0V9.039H12.052L6.545,14.545,8,16l8-8Z"
                                fill="#fff"
                            />
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    </div>
      )} */}
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
