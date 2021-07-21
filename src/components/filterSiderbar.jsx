import React, { useState } from "react";
import { Budget } from "./sliderCheckbox";
const FilterSideBar = ({
  sharing,
  available,
  setSharing,
  setAvailable,
  availableLabel,
  sharingLabel,
  selectedFilter,
  setSelectedFilter,
  setBedrooms,
  bedrooms
}) => {
  // const [available, setAvailable] = useState({
  //   boys: false,
  //   girls: false,
  //   both: false,
  // });
  // const [selectedFilter, setSelectedFilter] = useState({
  //   max_budget: 0,
  //   min_budget: 0,
  //   max_area: "",
  //   min_area: "",
    
  // });

//   const useStyles = makeStyles({
//     root: {
//       width: 200,
//     },
//   });
  // const availableLabel = [
  //   {
  //     name: "boys",
  //     key: 1,
  //     label: "avaibility",
  //   },
  //   {
  //     name: "girls",
  //     key: 2,
  //     label: "avaibility",
  //   },
  //   {
  //     name: "both",
  //     key: 3,
  //     label: "avaibility",
  //   },
  // ];
  const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => {
    return (
      <input type={type} name={name} checked={checked} onChange={onChange} />
    );
  };
  const bedroomsLabel=[
    {
      name:"1BHK",
      key:1,
      label:"no. of bedrooms"
    },
    {
      name:"2BHK",
      key:2,
      label:"no. of bedrooms"
    },
    {
      name:"3BHK",
      key:3,
      label:"no. of bedrooms"
    },
    {
      name:"4BHK",
      key:4,
      label:"no. of bedrooms"
    },
    {
      name:"5BHK",
      key:4,
      label:"no. of bedrooms"
    },
  ]
  const handleChangeBHK=(event)=>{
    setBedrooms({
      ...bedrooms,
      [event.target.name]: event.target.checked,
    });
    
  }
  const handleChange = (event) => {
    setAvailable({
      ...available,
      [event.target.name]: event.target.checked,
    });
  };
  return (
    <div
      className=""
      style={{ maxWidth: "300px", width: "100%", height: "100vh" }}
    >
      <div className="content" style={{ width: "300px" }}>
        <div className="budget" style={{width:'300px'}}>
        <Budget
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
              />
        </div>
        <div className="bedrooms">
          {
            bedroomsLabel.map((item,i)=>(
              <label key={item.key}>
              {item.name}
              <Checkbox
                name={item.name}
                checked={bedrooms[item.name]}
                onChange={handleChangeBHK}
              />
            </label>
            ))

          }
    {console.log(bedrooms)}

        </div>
        <div className="avaibility">
          {availableLabel.map((item) => (
            <label key={item.key}>
              {item.name}
              <Checkbox
                name={item.name}
                checked={available[item.name]}
                onChange={handleChange}
              />
            </label>
          ))}
        </div>

        <div className="sharing">
          
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
