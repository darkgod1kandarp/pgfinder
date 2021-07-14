import { grey } from "@material-ui/core/colors";
import React, { useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import { Budget, Area, AvailableFor } from "./sliderCheckbox";
const SearchBar = () => {
  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });

  const [filterPopUp, setFilterPopUp] = useState(false);
  const [filterType, setFilterType] = useState("buget");
  const [selectedFilter, setSelectedFilter] = useState({
    max_budget: 0,
    min_budget: 0,
    max_area: "",
    min_area: "",
    available: {},
  });

  const handleSelect = async (value) => {
    
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    console.log(results )

  };
  useEffect(() => {
    console.log(selectedFilter);
    
  }, [selectedFilter]);

  return (
    <div className="">

      <div
        
        className="searchbar"
        onClick={() => {
          setFilterPopUp(true); 
        }}
      >
        
      <label htmlFor="">search here</label>
      {filterPopUp && (
        <div className="filter" style={{position:"absolute",order:"top" ,width:"100vw" ,backgroundColor:"white",boxShadow:"5px 10px #888888" ,padding:"1rem"}}>
        <PlacesAutocomplete
         style={{position:"absolute",order:"top" ,width:"160px" ,backgroundColor:"white",boxShadow:"5px 10px #888888"}}
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
        
        >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input {...getInputProps({ placeholder: "Type address" })} />

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
          <div className="budget">
            <button
              className="selctor"
              onClick={() => {
                if (filterType === "budget") {
                  setFilterType("");
                } else {
                  setFilterType("budget");
                }
              }}
            >
              budget
            </button>
            {filterType === "budget" && (
              <Budget
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
              />
            )}
          </div>
          <div className="area">
            <button
              className="selector"
              onClick={() => {
                if (filterType === "Area") {
                  setFilterType("");
                } else {
                  setFilterType("Area");
                }
              }}
            >
              Area
            </button>
            {filterType === "Area" && (
              <Area
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
              />
            )}
          </div>
          <div className="avaibility">
            <button
              className="selector"
              onClick={() => {
                if (filterType === "avaible") {
                  setFilterType("");
                } else {
                  setFilterType("avaible");
                }
              }}
            >
              aviability
            </button>

            {filterType === "avaible" && (
              <AvailableFor
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
              />
            )}
          </div>
          <button
            onClick={() => {
              setFilterPopUp(false);
              
              console.log(selectedFilter);
            }}
          >
            X
          </button>
        </div>
      )}
      </div>
      
    </div>
  );
};

export default SearchBar;
