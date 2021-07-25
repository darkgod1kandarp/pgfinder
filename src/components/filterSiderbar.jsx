import React, { useState,useEffect } from "react";
import { Budget, Area } from "./sliderCheckbox";
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
  apply
}) => {

  const servicesList = [
    {
      name: "food services",
      key: 1,
      label: "facilities",
    },
    {
      name: "AC",
      key: 2,
      label: "facilities",
    },
    {
      name: "attched washroom",
      key: 3,
      label: "facilities",
    },
    {
      name: "Wifi",
      key: 4,
      label: "facilities",
    },
    {
      name: "personal cupboard",
      key: 5,
      label: "facilities",
    },
    {
      name: "room cleaning",
      key: 6,
      label: "facilities",
    },

    {
      name: "TV",
      key: 7,
      label: "facilities",
    },

    {
      name: "parking",
      key: 8,
      label: "facilities",
    },
    {
      name: "furnished",
      key: 9,
      label: "facilities",
    },
    {
      name: "laundry",
      key: 10,
      label: "facilities",
    },
    {
      name: "wardern",
      key: 11,
      label: "facilities",
    },
    {
      name: "security",
      key: 12,
      label: "facilities",
    },
  ];

  const [services, setServices] = useState({
    "jain food": false,
    AC: false,
    "attched washroom": false,
    Wifi: false,
    "personal cupboard": false,
    "room cleaning service": false,
    TV: false,
    parking: false,
    furnished: false,
    laundry: false,
    wardern: false,
    security: false,
  });
  const handleChangeService = (event) => {
    setServices({
      ...services,
      [event.target.name]: event.target.checked,
    });
  };
  useEffect(() => {
    const temp= Object.keys(services).filter((key) => services[key])
    setSelectedFilter({...selectedFilter,service:temp})
  }, [services])
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
  ];

  const handleChangeSharing = (event) => {
    setSharing({
      ...sharing,
      [event.target.name]: event.target.checked,
    });
  };
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
        height: "100%",
        justifyContent: "center",
      }}
    >
      <div className="content" style={{ width: "380px" ,height:"maxContent" }}>
        <div className="budget filter">
          <div className="title">Budget</div>
          <Budget
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
          <div className="range">
            <p>min :{selectedFilter.min_budget} ₹</p>
            <p>max :{selectedFilter.max_budget} ₹</p>
          </div>
        </div>

        <div className="area filter">
          <div className="title">Area</div>
          <Area
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
          <div className="range">
            <p>min :{selectedFilter.min_area} sq.ft</p>
            <p>max :{selectedFilter.max_area} sq.ft</p>
          </div>
        </div>

        <div className="bedroom filter">
          <div className="title">No. of Bedrooms</div>

          <div className="bedrooms-checbox checkbox">
            {bedroomsLabel.map((item, i) => (
              <label className={`label ${
                bedrooms[item.name] ? "selected" : ""
              }`}key={item.key}>
                <Checkbox
                  name={item.name}
                  checked={bedrooms[item.name]}
                  onChange={handleChangeBHK}
                />
                {item.name}
              </label>
            ))}
          </div>
        </div>
        <div className="available filter">
          <div className="title">Avaibility</div>
          <div className="available--checkbox checkbox">
            {availableLabel.map((item) => (
              <label className={`label ${
                available[item.name] ? "selected" : ""
              }`} key={item.key}>
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

        <div className="sharing filter">
          <div className="title">Sharing Per Room</div>
          <div className="checkbox">
            {sharingLabel.map((item) => (
              <label className={`label ${
                sharing[item.name] ? "selected" : ""
              }`} key={item.key}>
                <Checkbox
                  name={item.name}
                  checked={sharing[item.name]}
                  onChange={handleChangeSharing}
                />
                {item.name}
              </label>
            ))}
          </div>
        </div>
        <div className="services filter">
          <div className="title">services</div>
          <div className="checkbox">
              {servicesList.map((item) => (
                <label className={`label ${
                  services[item.name] ? "selected" : ""
                }`} key={item.key}>
                  <Checkbox
                    name={item.name}
                    checked={services[item.name]}
                    onChange={handleChangeService}
                  />
                  {item.name}
               
                </label>
              ))}
             
            </div>
        </div>
        <div className="">
          <button className="apply" onClick={apply}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
