import React, { useState } from "react";
import { Budget } from "./sliderCheckbox";
import "./filtersidebar.scss";
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
  bedrooms,
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
      <input
        className="input"
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
      />
    );
  };
  const bedroomsLabel = [
    {
      name: "1BHK",
      key: 1,
      label: "no. of bedrooms",
    },
    {
      name: "2BHK",
      key: 2,
      label: "no. of bedrooms",
    },
    {
      name: "3BHK",
      key: 3,
      label: "no. of bedrooms",
    },
    {
      name: "4BHK",
      key: 4,
      label: "no. of bedrooms",
    },
    {
      name: "5BHK",
      key: 5,
      label: "no. of bedrooms",
    },
    {
      name: "+5BHK",
      key: 6,
      label: "no. of bedrooms",
    },
  ];
  const handleChangeBHK = (event) => {
    setBedrooms({
      ...bedrooms,
      [event.target.name]: event.target.checked,
    });
  };
  const handleChange = (event) => {
    setAvailable({
      ...available,
      [event.target.name]: event.target.checked,
    });
  };
  return (
    <div
      className=""
      style={{
        maxWidth: "380px",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <div className="content" style={{ width: "380px" }}>
        <div className="budget filter" style={{ width: "340px" }}>
          <Budget
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
          <div className="range">
            <p>min :{selectedFilter.min_budget} ₹</p>
            <p>max :{selectedFilter.max_budget} ₹</p>
          </div>
        </div>
        <div className="bedroom filter">
          <div className="title">No. of Bedrooms</div>

          <div className="bedrooms-checbox">
            {bedroomsLabel.map((item, i) => (
              <label className="bedrooms--label" key={item.key}>
                <Checkbox
                  name={item.name}
                  checked={bedrooms[item.name]}
                  onChange={handleChangeBHK}
                />
                {item.name}
              </label>
            ))}
            {console.log(bedrooms)}
          </div>
        </div>
        <div className="available filter">
          <div className="title">Avaibility</div>
          <div className="available--checkbox">
            {availableLabel.map((item) => (
              <label className="available--label" key={item.key}>
                <Checkbox
                  name={item.name}
                  checked={available[item.name]}
                  onChange={handleChange}
                />
                {item.name}
           
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
