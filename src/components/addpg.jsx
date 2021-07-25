import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import history, { useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from "uuid";
import React, { useRef, useEffect, useCallback, useState } from "react";
import axios from "axios";
import "./addpg.scss";
const AddPg = () => {
  const [pgDetails, setPgDetails] = useState({
    flatName: "",
    PlotArea: 0,
    address: "",
    roomsForRent: "",
    maximumCapacity: 0,
    costPerBed: 0,
    sharing: "",
    avaibility: "",
    pgid: uuidv4(5),
    services: [],
    imgList: [],
    imgData: [],
    rule: [],
    location: [],
  });
  const modalRef = useRef();
  const [mode, setMode] = useState("pg");
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setMode("");
    }
  };
  const [files, setFiles] = useState([]);
  const [list, setList] = useState([]);

  const [rule, setRule] = useState("");
  const handleDeleteTag = ({ target }) => {
    setList(list.filter((element, index) => index !== parseInt(target.id)));
  };
  const [services, setServices] = useState({
    "food services": false,
    AC: false,
    "attched washroom/bathroom": false,
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
  const [address, setAddress] = React.useState("");
  const [cusService, setCusService] = useState("");
  const [customArr, setCustomArr] = useState([]);
  const removeService = ({ target }) => {
    setCustomArr(
      customArr.filter((element, index) => index !== parseInt(target.id))
    );
  };
  let servicesarr;
  useEffect(() => {
    servicesarr = Object.keys(services).filter((key) => services[key]);

    setPgDetails({ ...pgDetails, service: servicesarr.concat(customArr) });
  }, [services, customArr]);
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && mode) {
        setMode("");
      }
    },
    [setMode, mode]
  );
  
  useEffect(() => {
    console.log(address);
    setPgDetails({ ...pgDetails, address: address });
  }, [address]);
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
      name: "attched washroom/bathroom",
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
      name: "room cleaning service",
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

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);

    setPgDetails((pgDetails) => {
      return { ...pgDetails, address: value };
    });
    setPgDetails({ ...pgDetails, ...latLng });
    console.log(typeof latLng.lat);

    setAddress(value);
  };
  const history=useHistory()

  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));

    setPgDetails({ ...pgDetails, username: data.username });
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
  const Checkbox = ({
    type = "checkbox",
    name,
    checked = false,
    onChange,
    className,
  }) => {
    return (
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
        className={className}
      />
    );
  };
  const handleChange = (event) => {
    setServices({
      ...services,
      [event.target.name]: event.target.checked,
    });
  };

  const [img, setImg] = useState({
    values: [],
  });
  const [imgData, setImgData] = useState({});

  const [imgList, setImgList] = useState(img.values);
  const imgreader = function readFileAsText(file) {
    return new Promise(function (resolve, reject) {
      let fr = new FileReader();

      fr.onload = function () {
        resolve(fr.result);
      };

      fr.onerror = function () {
        reject(fr);
      };

      fr.readAsDataURL(file);
    });
  };
  const [locationList, setLocationList] = useState([]);
  const [location, setLocation] = useState();
  const Adddetails = async () => {
    console.log(123, uuidv4(10));
    console.log(services, 123);
    pgDetails.services.push(services);
    pgDetails.imgData.push(imgData);
    pgDetails.imgList.push(imgList);
    pgDetails.rule.push(list);
    pgDetails.location.push(locationList);
    console.log(pgDetails)
    axios({
      method: "post",
      url: "http://localhost:5000/api/pgadding",
      data: pgDetails,
    }).then((res) => {
      console.log(res);
    });
  };
  const onSelectFile = async (e) => {
    let files = e.target.files;
    setFiles([...files]);
    let readers = [];
    if (!files.length) return;

    for (let i = 0; i < files.length; i++) {
      readers.push(imgreader(files[i]));
      console.log(213);
    }

    Promise.all(readers).then((values) => {
      for (let j = 0; j < files.length; j++) {
        setImg({ ...img, values });
      }
    });
  };

  useEffect(() => {
    setImgList(img.values);
    console.log(56621);
  }, [img.values]);
  const handleRemoveItem = (e) => {
    console.log(
      imgList.filter((img, i) => i !== e.target.id),
      1232342,
      e.target.id
    );
    setImgList(imgList.filter((img, i) => i !== parseInt(e.target.id)));
    delete imgData[parseInt(e.target.id)];
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      
        <div className="addpg__container" onClick={closeModal} ref={modalRef}>
          <div className="addpg" mode={mode}>
            <h1 className="addpg__heading">Basic Details</h1>
            <div class="addpg__form--container">
              <label htmlFor="addpg__noa">Name of appartment</label>
              <input
                type="text"
                required
                onChange={({ target }) => {
                  setPgDetails({ ...pgDetails, flatName: target.value });
                }}
                id="addpg__noa"
                className="addpg__input"
                placeholder={"Name of appartment"}
              />
            </div>
            <div class="addpg__form--container">
              <label htmlFor="addpg__area">Area</label>
              <input
                type="text"
                required
                onChange={({ target }) => {
                  setPgDetails({ ...pgDetails, PlotArea: parseInt(target.value) });
                }}
                id="addpg__area"
                className="addpg__input"
                placeholder={"Area"}
              />
            </div>

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
                <div className="addpg__form--container">
                  <label htmlFor="addpg__address">Address</label>
                  <div className="addpg__address">
                    <input
                      type="textbox"
                      {...getInputProps({})}
                      className="addpg__input"
                      placeholder="address"
                      id="addpg__address"
                    />

                    <div>
                      {loading ? <div>...loading</div> : null}

                      {suggestions.map((suggestion) => {
                        const style = {
                          backgroundColor: suggestion.active
                            ? "#41b6e6"
                            : "#fff",
                        };

                        return (
                          <div
                            className="suggestion"
                            {...getSuggestionItemProps(suggestion, { style })}
                          >
                            {suggestion.description}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </PlacesAutocomplete>

            <div class="addpg__form--container">
              {/* <label htmlFor="addpg__aror">available rooms for rent</label>
              <input
                type="text"
                required
                onChange={({ target }) => {
                  setPgDetails({ ...pgDetails, roomsForRent: target.value });
                }}
                placeholder={"available rooms for rent"}
                className="addpg__input"
                id="addpg__aror"
              /> */}
            </div>
            <div class="addpg__form--container">
              <label htmlFor="addpg__maximum">maximum capacity</label>
              <input
                type="text"
                required
                onChange={({ target }) => {
                  setPgDetails({ ...pgDetails, maximumCapacity: parseInt(target.value) });
                }}
                className="addpg__input"
                placeholder="maximum capacity"
                id="addpg__maximum"
              />
            </div>
            <div class="addpg__form--container">
              <label htmlFor="addpg__cpb">Cost Per Bed</label>
              <input
                type="text"
                required
                onChange={({ target }) => {
                  setPgDetails({ ...pgDetails, costPerBed: parseInt(target.value) });
                }}
                className="addpg__input"
                placeholder="Cost per bed"
                id="addpost__cpb"
              />
            </div>
            <div className="addpg__sharing">
            <label className="addpg__sharing--label">
                No of Bedrooms :{" "}
              </label>
              <button
                onClick={() => {
                  setPgDetails({ ...pgDetails, roomsForRent: "1BHK" });
                }}
                disabled={pgDetails.roomsForRent === "1BHK"}
                className="addpg__sharing--option"
              >
                1BHK
              </button>
              <button
                onClick={() => {
                  setPgDetails({ ...pgDetails, roomsForRent: "2BHK" });
                }}
                disabled={pgDetails.roomsForRent === "2BHK"}
                className="addpg__sharing--option"
              >
                2BHK
              </button>
              <button
                onClick={() => {
                  setPgDetails({ ...pgDetails, roomsForRent: "3BHK" });
                }}
                disabled={pgDetails.roomsForRent === "3BHK"}
                className="addpg__sharing--option"
              >
                3BHK
              </button>
              <button
                onClick={() => {
                  setPgDetails({ ...pgDetails, roomsForRent: "4BHK" });
                }}
                disabled={pgDetails.roomsForRent === "4BHK"}
                className="addpg__sharing--option"
              >
                4BHK
              </button>
              <button
                onClick={() => {
                  setPgDetails({ ...pgDetails, roomsForRent: "5BHK" });
                }}
                disabled={pgDetails.roomsForRent === "5BHK"}
                className="addpg__sharing--option"
              >
                5BHK
              </button>
            </div>
            
            <div className="addpg__sharing">
              <label className="addpg__sharing--label">
                Sharing per room :{" "}
              </label>
              <button
                onClick={() => {
                  setPgDetails({ ...pgDetails, sharing: "1" });
                }}
                disabled={pgDetails.sharing === "1"}
                className="addpg__sharing--option"
              >
                1
              </button>
              <button
                onClick={() => {
                  setPgDetails({ ...pgDetails, sharing: "2" });
                }}
                disabled={pgDetails.sharing === "2"}
                className="addpg__sharing--option"
              >
                2
              </button>
              <button
                onClick={() => {
                  setPgDetails({ ...pgDetails, sharing: "3" });
                }}
                disabled={pgDetails.sharing === "3"}
                className="addpg__sharing--option"
              >
                3
              </button>
              <button
                onClick={() => {
                  setPgDetails({ ...pgDetails, sharing: "" });
                }}
                className="addpg__sharing--option"
              >
                Remove
              </button>
            </div>
            <div className="avaibitlty addpg__avaibility">
              <label className="addpg__avaibility--label">Avaibility</label>

              <button
                onClick={() => {
                  setPgDetails({ ...pgDetails, avaibility: "girls" });
                }}
                disabled={pgDetails.avaibility === "girls"}
                className="addpg__avaibility--option"
              >
                girls
              </button>
              <button
                onClick={() => {
                  setPgDetails({ ...pgDetails, avaibility: "boys" });
                }}
                disabled={pgDetails.avaibility === "boys"}
                className="addpg__avaibility--option"
              >
                boys
              </button>
              <button
                onClick={() => {
                  setPgDetails({ ...pgDetails, avaibility: "both" });
                }}
                disabled={pgDetails.avaibility === "both"}
                className="addpg__avaibility--option"
              >
                both
              </button>
            </div>
            <div className="addpg__services">
              {servicesList.map((item) => (
                <label
                  key={item.key}
                  className={`addpg__services--option ${
                    services[item.name] ? "addpg__services--selected" : ""
                  }`}
                >
                  {item.name}
                  <Checkbox
                    name={item.name}
                    checked={services[item.name]}
                    onChange={handleChange}
                    className={"addpg__services--input"}
                  />
                </label>
              ))}
            </div>
                  
            <div className="addpg__rule">
              <input
                type="text"
                value={cusService}
                onChange={({ target }) => {
                  setCusService(target.value);
                }}
                className="addpg__rule--input"
              />
              <button
                onClick={() => {
                  if (cusService !== "") {
                    setCustomArr([...customArr, cusService]);
                    console.log(customArr);
                    setCusService("");
                  }
                }}
                className="addpg__rule--btn"
              >
                addService
              </button>
            </div>
            <div className="addpg__rule">
              <input
                type="text"
                value={rule}
                onChange={({ target }) => {
                  setRule(target.value);
                  console.log(target.value);
                }}
                className="addpg__rule--input"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (rule !== "") {
                      setList([...list, rule]);
                      setRule("");
                    }
                  }
                }}
              />
              <button
                onClick={() => {
                  if (rule !== "") {
                    setList([...list, rule]);
                    setRule("");
                  }
                }}
                className="addpg__rule--btn"
              >
                addRule
              </button>
            </div>
            <div className="addpg__crule--container">
              {list.map((rule, i) => (
                <div className="addpg__crule">
                  <p className="addpg__crule--text">{rule}</p>
                  <button
                    id={i}
                    onClick={handleDeleteTag}
                    className="addpg__crule--btn"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

            <div className="addpg__crule--container">
              {customArr.map((ser, i) => (
                <div className="addpg__crule">
                  <p className="addpg__crule--text">{ser}</p>
                  <button
                    id={i}
                    onClick={removeService}
                    className="addpg__crule--btn"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <div className="addpg__image--container">
              <label className="addpg__image" htmlFor="addpg__input">
                <span className="addpg__image--btn">Choose</span>
                <p className="addpg__image--name">
                  {files.length === 0
                    ? "Select Images"
                    : files.slice(0, 2).map((file) => file.name)}
                </p>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={onSelectFile}
                multiple
                id="addpg__input"
                className="addpg__image--input"
              />
              <div className="addpg__images--container">
                {imgList.map((img, i) => (
                  <div className="addpg__images">
                    <button
                      id={i}
                      onClick={handleRemoveItem}
                      className="addpg__images--btn"
                    >
                      X
                    </button>
                    <img
                      src={img}
                      alt="img"
                      className="addpg__images--preview"
                    />
                    <input
                      key={i}
                      id={i}
                      type="text"
                      value={imgData[i]}
                      className="addpg__images--input"
                      onChange={({ target }) => {
                        setImgData({ ...imgData, [i]: target.value });
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="addpg__submit--container">
                <button onClick={Adddetails} className="addpg__submit">
                  submit
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default AddPg;
