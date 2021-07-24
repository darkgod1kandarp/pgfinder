import React, { useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import useGeolocation from "react-hook-geolocation";
import "./searchbar.scss";
import { Budget, Area, AvailableFor } from "./sliderCheckbox";
import axios from "axios";
const SearchBar = ({
  sharing,
  available,
  setSharing,
  setAvailable,
  availableLabel,
  sharingLabel,
  selectedFilter,
  setSelectedFilter,
  searchCities,
  setSearchCities,
  bedrooms,
  setBedrooms,
  apply,
}) => {
  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });

  const handleDeleteTag = ({ target }) => {
    console.log(target.id)
    const a=disCity[target.id]
    console.log(a)
    
    delete searchCities[a]
    setDisCity(disCity.filter((element, index) => index !== parseInt(target.id)));
  };
  // const geolocation=useGeolocation()
  // console.log(geolocation)

  const [filterPopUp, setFilterPopUp] = useState(false);
  const [filterType, setFilterType] = useState("buget");
  // const [selectedFilter, setSelectedFilter] = useState({
  //   max_budget: 0,
  //   min_budget: 0,
  //   max_area: "",
  //   min_area: "",
  // });
  const [disCity, setDisCity] = useState([]);
  console.log(disCity);
  //
  // const [searchCities, setSearchCities] = useState({});

  const [city, setCity] = useState("");
  const [locality, setLocality] = useState({
    area: "",
    city: "",
    state: "",
    country: "",
  });

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
  const handleChangeBHK = (event) => {
    setBedrooms({
      ...bedrooms,
      [event.target.name]: event.target.checked,
    });
  };
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
        setCity(res.data.city);
        if (disCity[0] !== res.data.city) {
          setDisCity([...disCity, res.data.city]);
        }
        console.log(res.data.city);
      });
    });
  }, [available]);
  const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => {
    return (
      <input type={type} name={name} checked={checked} onChange={onChange} />
    );
  };
  const handleChange = (event) => {
    setAvailable({
      ...available,
      [event.target.name]: event.target.checked,
    });
  };
  const handleChangeSharing = (event) => {
    setSharing({
      ...sharing,
      [event.target.name]: event.target.checked,
    });
  };
  const handleApply = () => {
    setSelectedFilter({ ...selectedFilter, available: available });
  };
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    console.log(results[0]);
    let city, state, area, country;
    for (let i = 0; i < results[0].address_components.length; i++) {
      for (let j = 0; j < results[0].address_components[i].types.length; j++) {
        switch (results[0].address_components[i].types[j]) {
          case "sublocality":
            area = results[0].address_components[i].long_name;
          case "locality":
            city = results[0].address_components[i].long_name;

            break;
          case "administrative_area_level_1":
            state = results[0].address_components[i].long_name;
            break;
          case "country":
            country = results[0].address_components[i].long_name;
            break;
        }
      }
    }
    setLocality({
      ...locality,
      city: city,
      area: area,
      state: state,
      country: country,
    });

    console.log(results, 123);
    const latLng = await getLatLng(results[0]);
    console.log(latLng, 123141235);

    if (area !== undefined) {
      setSearchCities({ ...searchCities, [area]: { ...latLng, area: area } });
      setDisCity([...disCity, area.concat(" ", city)]);
    }
    if (city !== undefined && area === undefined) {
      setSearchCities({ ...searchCities, [city]: { ...latLng, city: city } });
      setDisCity([...disCity, city]);
    }
    if (state !== undefined && city === undefined && area === undefined) {
      setSearchCities({
        ...searchCities,
        [state]: { ...latLng, state: state },
      });
      setDisCity([...disCity, state]);
    }

    setAddress(value);
    setCoordinates(latLng);
  };
  useEffect(() => {
    console.log(selectedFilter);
  }, [selectedFilter]);

  return (
    <div className="" >
      {filterPopUp && <button
        style={{ zIndex: "10" }}
        onClick={() => {
          setFilterPopUp(false);
          console.log(filterPopUp);
        }}
      >
        X
      </button>}
      <div
        className="searchbar"
        onClick={() => {
          setFilterPopUp(true);
        }}
        
      >
        {!filterPopUp &&         
        <label htmlFor="" className="searchlabel">search here</label>}
        {filterPopUp && (
          <div
            className="filterpop"
        
          >
            {disCity.map((city, i) => (
              <div className="">
                <label className="city-header" id={i} htmlFor="">
                  {city}
                  <button id={i} onClick={handleDeleteTag}>x</button>
                </label>
              </div>
            ))}
            {console.log(disCity)}

            <div className="inputsection">
              <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <input
                      className="Ginput"
                      {...getInputProps({ placeholder: "Google Search" })}
                    />

                    <div>
                      {loading ? <div>...loading</div> : null}

                      {suggestions.map((suggestion) => {
                        const style = {
                          backgroundColor: suggestion.active
                            ? "#41b6e6"
                            : "#fff",
                          width: "780px",
                          marginLeft: "10px",
                        };

                        return (
                          <div
                            className="sugestions"
                            {...getSuggestionItemProps(suggestion, { style })}
                          >
                            {suggestion.description}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </div>

            <div className="btn-Selector">
              <button
                className="selector"
                onClick={() => {
                  if (filterType === "budget") {
                    setFilterType("");
                  } else {
                    setFilterType("budget");
                  }
                }}
              >
                Budget
              </button>
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
                Avaibility
              </button>
              <button
                className="selector"
                onClick={() => {
                  if (filterType === "bedroom") {
                    setFilterType("");
                  } else {
                    setFilterType("bedroom");
                  }
                }}
              >
                No. Of Bedrooms
              </button>
              <button
                className="selector"
                onClick={() => {
                  if (filterType === "sharing") {
                    setFilterType("");
                  } else {
                    setFilterType("sharing");
                  }
                }}
              >
                Sharing
              </button>
            </div>

            <div className="budget filterPopup">
              {filterType === "budget" && (
                <div className="budget pop">
                  <Budget
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                  />
                  <div className="range">
                    <p>min :{selectedFilter.min_budget} ₹</p>
                    <p>max :{selectedFilter.max_budget} ₹</p>
                  </div>
                </div>
              )}
            </div>
            <div className="area filterPopup">
              {filterType === "Area" && (
                <div className="area pop">
                  <Area
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                  />
                  <div className="range">
                    <p>min :{selectedFilter.min_area} sq.ft</p>
                    <p>max :{selectedFilter.max_area} sq.ft</p>
                  </div>
                </div>
              )}
            </div>
            <div className="avaibility filterPopup">
              {filterType === "avaible" && (
                <div className="available pop">
                  <div className="title">Avaibility</div>
                  <div className="checkboxS">
                    {availableLabel.map((item) => (
                      <label className="labelS" key={item.key}>
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
              )}
            </div>

            <div className="sharing filterPopup">
              {filterType === "sharing" && (
                <div className="sharing pop">
                  <div className="title">Sharing Per Room</div>
                  <div className="checkboxS">
                    {sharingLabel.map((item) => (
                      <label className="labelS" key={item.key}>
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
              )}
            </div>
            <div className="bedrooms filterPopup">
              {filterType === "bedroom" && (
                <div className="bedroom pop">
                  <div className="title">No. of Bedrooms</div>

                  <div className="checkboxS">
                    {bedroomsLabel.map((item, i) => (
                      <label className="labelS" key={item.key}>
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
              )}
            </div>
              
            <div className="submit">
              <button onClick={apply}>apply</button>
              {console.log("123",searchCities,123)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
