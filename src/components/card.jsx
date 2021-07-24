import React, { useState, useEffect } from "react";
import Slider from "./slider";
import "./box.css";
import SearchBar from "./searchbar";
import useGeolocation from "react-hook-geolocation";

import { useHistory } from "react-router-dom";
import Card1 from "./card1";
import axios from "axios";
import FilterSideBar from "./filterSiderbar";
const Card = () => {
  const history = useHistory();
    const [cardData,setCardData]=useState()
    const [cardDataKeys,setCardDataKeys]=useState([])
    const location = useGeolocation();
    const [loc,setLoc]=useState({
      userlat:0,
      userLng:0
    })

    useEffect(() => {
        
        setLoc({userlat:location.latitude,userLng:location.longitude})
    }, [location])
    console.log(loc,"qwertyu")
    // console.log(location,123)
  React.useEffect(() => {
    
    const data = JSON.parse(localStorage.getItem("data"));

    const checkingIfTheLocalStorageHaveTheDataOrNot =
      localStorage.getItem("jwt");
    console.log(checkingIfTheLocalStorageHaveTheDataOrNot);
    if (
      checkingIfTheLocalStorageHaveTheDataOrNot !== null ||
      checkingIfTheLocalStorageHaveTheDataOrNot !== undefined
    ) {
      var jwt;

      try {
        const token = JSON.parse(checkingIfTheLocalStorageHaveTheDataOrNot);
        console.log(token, "print");
        jwt = `Bearer ${token}`;
        console.log(jwt);
      } catch (err) {
        jwt = "";
      }

      async function fetchApi() {
        //  console.log(data)
        await axios({
          method: "post",
          url: "http://localhost:5000/api/checking",
          headers: { Authorization: jwt },
        })
          .then(async (res) => {
            console.log(res.data.message, "q4124");
            if (res.data.message === "not verified") {
              history.push("/");
            }
          })

          .catch((err) => {});
      }
      fetchApi();
    }
  }, [history]);
  const [selectedFilter, setSelectedFilter] = useState({
    max_budget: 1000000,
    min_budget: 0,
    max_area: 10000,
    min_area: 0,
    available: "both",
  });
  const [bedrooms, setBedrooms] = useState({
    "1BHK": false,
    "2BHK": false,
    "3BHK": false,
    "4BHK": false,
    "5BHK": false,
  });
  const [sharing, setSharing] = useState({
    1: false,
    2: false,
    3: false,
  });
  const sharingLabel = [
    {
      name: 1,
      key: 1,
      label: "sharing",
    },
    {
      name: 2,
      key: 2,
      label: "sharing",
    },
    {
      name: 3,
      key: 3,
      label: "sharing",
    },
  ];

 
  const [available, setAvailable] = useState({
    boys: false,
    girls: false,
    both: false,
  });

  const [searchCities, setSearchCities] = useState({});
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://geolocation-db.com/json/fb363670-e22a-11eb-a464-59f706281067",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
    }).then((res) => {
      axios({
        method: "get",
        url: `http://ip-api.com/json/${res.data.IPv4}`,
      }).then((res) => {
        console.log(res, 1241345);
        console.log(res.data.city);
        axios({
          method: "post",
          url: "http://localhost:5000/api/carddata",
          data: {city:res.data.city,lat:res.data.lat,lon:res.data.lon}
        }).then((res) => {
          setCardData({...res.data.data})
          console.log(res,"qwe");
          // console.log(cardData)
        });
      });
    });
  }, []);
  useEffect(() => {
    if(cardData===undefined){return}
    setCardDataKeys([Object.keys(cardData)])
    console.log(cardDataKeys,21)

    
  }, [cardData])
  useEffect(() => {
    var temp = Object.keys(bedrooms).filter((key) => bedrooms[key]);
    if (temp.length === 0) {
      temp = ["1BHK", "2BHK", "3BHK", "4BHK", "5BHK"];
    }
    var temp1 = Object.keys(sharing).filter((key) => sharing[key]);
    if (temp1.length === 0) {
      temp1 = [1, 2, 3];
    }
    setSelectedFilter({
      ...selectedFilter,
      bedrooms: temp,
      sharing: temp1,
      location: searchCities,
    });
  }, [bedrooms, sharing, searchCities]);
  const apply = () => {
    console.log(selectedFilter);
    axios({
      method: "post",
      url: "",
      data: selectedFilter,
    });
  };
  const availableLabel = [
    {
      name: "boys",
      key: 1,
      label: "avaibility",
    },
    {
      name: "girls",
      key: 2,
      label: "avaibility",
    },
    {
      name: "both",
      key: 3,
      label: "avaibility",
    },
  ];

  
  const [state, setState] = useState(true);

  const [slider, setSlider] = useState(false);
  const [value, setValue] = useState();
  const handleClick = ({ target }) => {
    console.log(target.className.split(" ")[1]);
    setValue(target.className.split(" ")[1]);
    setSlider(true);
  };

  return (
    <>
    
      {state && !slider ? (
        <div className="App1">
          <div className="part1 sidebar">
            <div className="querybox">
              <FilterSideBar
                setSharing={setSharing}
                setAvailable={setAvailable}
                available={available}
                sharing={sharing}
                availableLabel={availableLabel}
                sharingLabel={sharingLabel}
                setSelectedFilter={setSelectedFilter}
                selectedFilter={selectedFilter}
                bedrooms={bedrooms}
                setBedrooms={setBedrooms}
                apply={apply}
              />
            </div>
          </div>

          <div className="part1 grid">
            <div className="" style={{marginBottom:"10px"}}>
            <SearchBar
            
            setSharing={setSharing}
              setAvailable={setAvailable}
              available={available}
              sharing={sharing}
              availableLabel={availableLabel}
              sharingLabel={sharingLabel}
              setSelectedFilter={setSelectedFilter}
              selectedFilter={selectedFilter}
              searchCities={searchCities}
              setSearchCities={setSearchCities}
              bedrooms={bedrooms}
              setBedrooms={setBedrooms}
              apply={apply}
            />
    </div>
            {console.log(selectedFilter)}
            <div className="sd">
             
             {
             cardDataKeys.length!==0 &&
             
             cardDataKeys[0].map((data,i)=>(
               
               
               <div className="">
                   <Card1
                handleClick={handleClick}
                slider={slider}
                setSlider={setSlider}
                data={cardData[data]}
                image={`pg--image-i ${i}`}
                loc={loc}
              />
                 
               </div>
             ))}
             
             
            </div>
          </div>
        </div>
      ) : (
        <div>
          {console.log(cardData[cardDataKeys[0][value]].url,"123we13r")}
          <Slider
            images={cardData[cardDataKeys[0][value]].url}
            length1={cardData[cardDataKeys[0][value]].url.length * 82}
            setSlider={setSlider}
          />
        </div>
      )}
    </>
  );
};

export default Card;
