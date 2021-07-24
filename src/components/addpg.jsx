import { useHistory } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { v4 as uuidv4 } from "uuid";
import React, { useRef, useEffect, useCallback, useState } from "react";
import axios from "axios";
const AddPg = () => {
  const [pgDetails, setPgDetails] = useState({
    flatName: "",
    PlotArea: "",
    address: "",
    roomsForRent: "",
    maximumCapacity: 0,
    costPerBed: 0,
    sharing: "",
    avaibility: "",
    pgid:uuidv4(5),
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
  const [list, setList] = useState([]);

  const [rule, setRule] = useState("");
  const handleDeleteTag = ({ target }) => {
    setList(list.filter((element, index) => index !== parseInt(target.id)));
  };

  const handleDeleteLocationTag = ({ target }) => {
    setLocationList(
      locationList.filter((element, index) => index !== parseInt(target.id))
    );

  };
 

  const history = useHistory();
  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && mode) {
        setMode("");
      }
    },
    [setMode, mode]
  );
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
  useEffect(() => {
    console.log(address);
    setPgDetails({ ...pgDetails, address: address });
  }, [address]);
  const servicesList = [
    {
      name: "jain food",
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

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    console.log(results[0]);
    const latLng = await getLatLng(results[0]);
    console.log(latLng, value);
    setPgDetails((pgDetails) => {
      return { ...pgDetails, address: value };
    });
    setPgDetails({ ...pgDetails, ...latLng });

    setAddress(value);
    setCoordinates(latLng);
  };

  const [cusService,setCusService]=useState("")
  const [customArr,setCustomArr]=useState([])
  const removeService=({target})=>{
    setCustomArr(
        customArr.filter((element,index)=>index !== parseInt(target.id))
    )
  }
  let servicesarr
  useEffect(() => {
    
    servicesarr = Object.keys(services).filter((key) => services[key]);
    
    console.log(servicesarr.concat(customArr,123))
    
    setPgDetails({...pgDetails,service:servicesarr.concat(customArr)})
    
  }, [services,customArr])
  console.log(pgDetails.service)
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
  const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => {
    return (
      <input type={type} name={name} checked={checked} onChange={onChange} />
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
  const Adddetails = async () => {
    console.log(123, uuidv4(10));
    console.log(services, 123);
    // // console.log(user)
    // const id = await uuidv4(5);
    // console.log(id);
    // setPgDetails({ ...pgDetails, pgid: id });
    
    // pgDetails.services.push(services);
    pgDetails.imgData.push(imgData);
    pgDetails.imgList.push(imgList);
    pgDetails.rule.push(list);
    pgDetails.location.push(locationList);
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
      {mode === "" && (
        <button
          onClick={() => {
            setMode("pg");
          }}
        >
          addpg
        </button>
      )}
      {mode === "pg" && (
        <div className="" onClick={closeModal} ref={modalRef}>
          <div className="" mode={mode}>
            <h1>basic details</h1>
            <div class="form-group">
              <input
                type="text"
                required
                onChange={({ target }) => {
                  setPgDetails({ ...pgDetails, flatName: target.value });
                }}
              />
              <label>Name of appartment</label>
            </div>
            <div class="form-group">
              <input
                type="text"
                required
                onChange={({ target }) => {
                  setPgDetails({ ...pgDetails, PlotArea: target.value });
                }}
              />
              <label>Area</label>
            </div>
            <div className="address">
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
                  <div className="form-group">
                    <input type="textbox" {...getInputProps({})} />
                    <label>adress </label>
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
                )}
              </PlacesAutocomplete>
            </div>

            <div class="form-group">
              <input
                type="text"
                required
                onChange={({ target }) => {
                  setPgDetails({ ...pgDetails, roomsForRent: target.value });
                }}
              />
              <label>available rooms for rent</label>
            </div>
            <div class="form-group">
              <input
                type="text"
                required
                onChange={({ target }) => {
                  setPgDetails({ ...pgDetails, maximumCapacity: parseInt(target.value) });
                }}
              />
              <label>maximum capacity</label>
            </div>
            <div class="form-group">
              <input
                type="text"
                required
                onChange={({ target }) => {
                  setPgDetails({ ...pgDetails, costPerBed: parseInt(target.value) });
                }}
              />
              <label>Cost per bed</label>
            </div>
            <div className="sharing">
              <label>sharing per room</label>
              <button
                onClick={() => {
                  setPgDetails({ ...pgDetails, sharing: "1" });
                }}
              >
                1
              </button>
              <button
                onClick={() => {
                  setPgDetails({ ...pgDetails, sharing: "2" });
                }}
              >
                2
              </button>
              <button
                onClick={() => {
                  setPgDetails({ ...pgDetails, sharing: "3" });
                }}
              >
                3
              </button>
            </div>
            <div className="avaibitlty">
              <button
                onClick={() => {
                  setPgDetails({ ...pgDetails, avaibility: "girls" });
                }}
              >
                girls
              </button>
              <button
                onClick={() => {
                  setPgDetails({ ...pgDetails, avaibility: "boys" });
                }}
              >
                boys
              </button>
              <button
                onClick={() => {
                  setPgDetails({ ...pgDetails, avaibility: "both" });
                }}
              >
                both
              </button>
              
            </div>
            <div className="services">
              {servicesList.map((item) => (
                <label key={item.key}>
                  {item.name}
                  <Checkbox
                    name={item.name}
                    checked={services[item.name]}
                    onChange={handleChange}
                  />
                </label>
              ))}
             
            </div>
           <div className="custom service">
           <div className="">

                  {
                    customArr.map((ser,i)=>(
                      <div className="">
                          <label htmlFor="">{ser}</label>
                          <button id={i} onClick={removeService}>X</button>

                      </div>
                    ))
                  }

                <input type="text" value={cusService} onChange={({target})=>{
                    setCusService(target.value)

                }}/>
                <button onClick={()=>{
                  if(cusService!==""){
                    setCustomArr([...customArr,cusService])
                    console.log(customArr)
                    setCusService("")
                  }
                }}>addService</button>
              </div>
           </div>

            <div className="rule">
              <input
                type="text"
                value={rule}
                onChange={({ target }) => {
                  setRule(target.value);
                  console.log(target.value);
                }}
              />
              <button
                onClick={() => {
                  if (rule !== "") {
                    setList([...list, rule]);
                    setRule("");
                  }
                }}
              >
                addRule
              </button>
              {list.map((rule, i) => (
                <>
                  <p>{rule}</p>
                  <button id={i} onClick={handleDeleteTag}>
                    X
                  </button>
                </>
              ))}
            </div>
            <div className="images">
              <input
                type="file"
                accept="image/*"
                onChange={onSelectFile}
                multiple
              />
              {imgList.map((img, i) => (
                <>
                  <button id={i} onClick={handleRemoveItem}>
                    X
                  </button>
                  <img src={img} alt="img" height="100px" width="100px" />
                  <input
                    key={i}
                    id={i}
                    type="text"
                    value={imgData[i]}
                    onChange={({ target }) => {
                      setImgData({ ...imgData, [i]: target.value });
                    }}
                  />
                </>
              ))}
              <button onClick={Adddetails}>submit</button>
              <button
                onClick={() => {
                  console.log(pgDetails);
                }}
              >
                1
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddPg;
