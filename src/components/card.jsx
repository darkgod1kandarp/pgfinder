import React, { useState ,useEffect} from "react";
import Slider from "./slider";
import "./box.css";
import SearchBar from "./searchbar";
import Imageslider from "./Imagelider";
import { useHistory } from "react-router-dom";
import Card1 from "./card1";
const Card = () => {
  const history = useHistory();

  const data = [
    {
      images: [
        {
          url: "https://www.howtogeek.com/wp-content/uploads/2018/06/shutterstock_1006988770.png?height=200p&trim=2,2,2,2",
        },
        {
          url: "https://www.howtogeek.com/wp-content/uploads/2018/06/shutterstock_1006988770.png?height=200p&trim=2,2,2,2",
        },
        {
          url: "https://www.howtogeek.com/wp-content/uploads/2018/06/shutterstock_1006988770.png?height=200p&trim=2,2,2,2",
        },
        {
          url: "https://images.theconversation.com/files/350865/original/file-20200803-24-50u91u.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop",
        },
        {
          url: "https://www.howtogeek.com/wp-content/uploads/2018/06/shutterstock_1006988770.png?height=200p&trim=2,2,2,2",
        },
        {
          url: "https://www.howtogeek.com/wp-content/uploads/2018/06/shutterstock_1006988770.png?height=200p&trim=2,2,2,2",
        },
        {
          url: "https://images.theconversation.com/files/350865/original/file-20200803-24-50u91u.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop",
        },
        {
          url: "https://www.howtogeek.com/wp-content/uploads/2018/06/shutterstock_1006988770.png?height=200p&trim=2,2,2,2",
        },
      ],
    },
    {
      images: [
        {
            url: "https://www.howtogeek.com/wp-content/uploads/2018/06/shutterstock_1006988770.png?height=200p&trim=2,2,2,2",
          },
          {
            url: "https://www.howtogeek.com/wp-content/uploads/2018/06/shutterstock_1006988770.png?height=200p&trim=2,2,2,2",
          },
          {
            url: "https://images.theconversation.com/files/350865/original/file-20200803-24-50u91u.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop",
          },
          {
            url: "https://www.howtogeek.com/wp-content/uploads/2018/06/shutterstock_1006988770.png?height=200p&trim=2,2,2,2",
          },
      ],
    },
  ];
  
  const [state, setState] = useState(true);
  const [array, setArray] = useState([]);
  const [slider, setSlider] = useState(false);
  const[value,setValue] = useState();
  const handleClick = ({ target }) => {
      console.log(target.className.split(" ")[1])
    setValue(target.className.split(" ")[1])
    setSlider(true);
    
    
  };
  
  useEffect(() => {
   
    // setValue(array[1]);
    console.log(array) 

  }, [array])
  return (
    <>
      {state && !slider ?  (
        <div className="App1">
          <div className="part1 sidebar">
            <div className="querybox">
              <h>kandarp</h>
            </div>
          </div>

          <div className="part1 grid">
              <SearchBar/>
              
            <Card1 handleClick={handleClick} slider={slider} setSlider={setSlider} data={data[0]  } image = {"image 0"} onClick={handleClick}/>
            
            <Card1 handleClick={handleClick} slider={slider} setSlider={setSlider} data={data[1]} image={"image 1"}/>
          </div>
        </div>
      ) : (
        <div>
           
            {console.log(data[value].images,data[value].images.length*82)}
          <Slider images={data[value].images} length1={data[value].images.length*82} setSlider={setSlider} />
       
        </div>
      )}
    </>
  );
};

export default Card;
