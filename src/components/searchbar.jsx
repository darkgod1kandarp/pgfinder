import React, { useState, useEffect } from "react";

import { Budget, Area, AvailableFor } from "./sliderCheckbox";
const SearchBar = () => {
  const [filterPopUp, setFilterPopUp] = useState(false);
  const [filterType, setFilterType] = useState("buget");
  const [selectedFilter, setSelectedFilter] = useState({
    max_budget: 0,
    min_budget: 0,
    max_area: "",
    min_area: "",
    available: {},
  });

  useEffect(() => {
    console.log(selectedFilter);
  }, [selectedFilter]);

  return (
    <div className="">
      <div
        className="searchbar"
        contentEditable
        onClick={() => {
          setFilterPopUp(true);
        }}
      >
        {!filterPopUp && <p>search</p>}
      </div>
      {filterPopUp && (
        <div className="filter">
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
  );
};

export default SearchBar;
