/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, useRef } from "react";
import "./slider.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { blue } from "@material-ui/core/colors";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import screenfull from "screenfull";
const Slider = ({ images, length1, setSlider }) => {
  const [imageZoomIn, setImageZoomIn] = useState({ height: 100, width: 500 });
  const [state, setState] = useState(true);
  const initialState = { height: 100, width: 500 };
  const [settingimage, setSettingImage] = useState(
    images[0].url
  );
   const[imageHeigth,setImageHeight] = useState("100%");
  const [middleHeight, setMiddleHeight] = useState("550px");
  const[lowerHeight,setLowerHeight] = useState("170px");
  const [notzoom, setNotZoom] = useState(true);
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setMiddleHeight("550px");
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  });
  const [left, setLeft] = useState(0);
  console.log(length1);
  useEffect(() => {
    console.log(imageZoomIn);
  }, [imageZoomIn]);

  const handle = useFullScreenHandle();

  return (
    <>
      <div className="App">
        <div className="upper1">
          <button onClick={()=>{setSlider(false)}}>X</button>
        </div>
          
        <div className="middle" style={{ height: middleHeight }}>
          <div className="mainimage">
            
            <img
              src={settingimage}
              style={{
                height: `${imageZoomIn.height}%`,
                width: `${imageZoomIn.width}px`,
              }}
              className="image4"
              alt="none"
            ></img>
          </div>
          <div className="zoominout">
            <div className="common2">
              <ZoomInIcon
                className="zoom"
                onClick={() => {
                  setImageZoomIn((prevState) => {
                    return {
                      height: prevState.height,
                      width: prevState.width + 50,
                    };
                  });
                }}
              />
              <ZoomOutIcon
                className="zoom"
                onClick={() => {
                  setImageZoomIn((prevState) => {
                    return {
                      height: prevState.height,
                      width: prevState.width - 50,
                    };
                  });
                }}
              />
              <AutorenewIcon
                className="zoom"
                onClick={() => setImageZoomIn(initialState)}
              />
              {state ? (
                <FullscreenIcon
                  className="zoom"
                  onClick={() => {
                    if (screenfull.isEnabled) {
                      screenfull.request();
                      setMiddleHeight("650px");
                      setImageHeight("100px")
                      setLowerHeight("250px");
                      setState(false);
                    }
                  }}
                />
              ) : (
                <FullscreenExitIcon
                  className="zoom"
                  onClick={() => {
                    if (screenfull.isEnabled) {
                      screenfull.exit();
                      setMiddleHeight("550px");
                      setImageHeight("100%");
                      setLowerHeight("170px");
                      setState(true);
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className="lower1" style={{height:lowerHeight}}>
          <div className="backwardbutton">
            <ArrowBackIosIcon
              onClick={() => (left !== 0 ? setLeft(left + 164) : setLeft(left))}
              className="back"
            />
          </div>
          <div
            className="common1"
            style={{ left: `${left}px`, width: `${length1}px` }}
          >
            {images.map((object) => {
              return (
                <div className="image">
                  <img
                    className="image1"
                    src={object.url}
                    alt="none"
                    onClick={({ target }) => setSettingImage(target.src)
                  }

                  style={{height:imageHeigth}}
                  ></img>
                </div>
              );
            })}
          </div>
          <div className="forwarbutton">
            <ArrowForwardIosIcon
              onClick={() =>
                left - 164 > -length1 ? setLeft(left - 164) : setLeft(left)
              }
              className="fwb"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
