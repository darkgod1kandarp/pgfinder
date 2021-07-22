import React, { useState ,useEffect} from "react";
import Slider from "./slider";
import "./box.css";
import SearchBar from "./searchbar";
import { useHistory } from "react-router-dom";
import Card1 from "./card1";
import axios from "axios";
import FilterSideBar from "./filterSiderbar";
const Card = () => {
  const history = useHistory();

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
    max_budget: 0,
    min_budget: 0,
    max_area: 0,
    min_area: 0,
    available:"both"
  });
  const [bedrooms,setBedrooms]=useState({
    "1BHK":false,
    "2BHK":false,
    "3BHK":false,
    "4BHK":false,
    "5BHK":false,
    
  })
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
    
    var temp =Object.keys(bedrooms).filter(key => bedrooms[key])
    if(temp.length===0){
      temp=["1BHK","2BHK","3BHK","4BHK","5BHK"]
    }  
    var temp1 =Object.keys(sharing).filter(key => sharing[key])
    if(temp1.length===0){
      temp1=[1,2,3]
    }
    setSelectedFilter({...selectedFilter,bedrooms:temp,sharing:temp1,location:searchCities})


  }, [bedrooms,sharing,searchCities])
   const apply=()=>{
    console.log(selectedFilter) 
    axios({
       method:"post"
       ,url:"",
       data:selectedFilter
     })
   } 
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
  
  const [slider, setSlider] = useState(false);
  const[value,setValue] = useState();
  const handleClick = ({ target }) => {
      console.log(target.className.split(" ")[1])
    setValue(target.className.split(" ")[1])
    setSlider(true);    
    
  };

  
  return (
    <>
      {state && !slider ?  (
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
              />
              <h>kandarp</h>
            </div>
          </div>

          <div className="part1 grid">
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
              
              {console.log(selectedFilter)}

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
