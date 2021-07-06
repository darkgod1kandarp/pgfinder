import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";


export default function Phase2() {
  const [address, setAddress] = React.useState("");
  const [state,setState] =  React.useState([]);
  const [details,setDetails] = React.useState({});
  const[files,setFiles] = React.useState([])
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });


  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

 

  React.useEffect(()=>{
   setDetails((prevDetails)=>{return {...details,state}})
  
  },[state,details])
  React.useEffect(()=>{

      
   
    const fileToDataURI = async () => {
      for (let x of files) {
        const fileing = await convertBase64(x);
        console.log(fileing);
        setState((prevState) => {
          return { ...prevState, [x.name]: fileing };
        });
      }
    };

    fileToDataURI();
   
    
     
  },[files]);


  const[checkedItems,setCheckedItems] =  React.useState([])

  const checkboxes = [
    {
      name: "food",
      key: 1,
      label: "facilities",
    },
    {
      name: "AC",
      key: 2,
      label: "facilities",
    },
    {
      name: "washroom/bathroom",
      key: 3,
      label: "facilities",
    },
    {
      name: "power backup available",
      key: 4,
      label: "facilities",
    },
    {
      name: "cupboard",
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
      name: "four wheeler parking",
      key: 9,
      label: "facilities",
    },

    {
      name: "gym",
      key: 10,
      label: "facilities",
    },

    {
      name: "laundry",
      key: 11,
      label: "facilities",
    },
    {
      name: "fridge",
      key: 12,
      label: "facilities",
    },
    {
      name: "water cooler",
      key: 13,
      label: "facilities",
    },
    {
      name: "warden",
      key: 14,
      label: "facilities",
    },
    {
      name: "microwave",
      key: 15,
      label: "facilities",
    },
  ];
  const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => {
    return (
      <input type={type} name={name} checked={checked} onChange={onChange} />
    );
  };
  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };
  React.useEffect(() => {
    console.log(details);
  }, [details]);


  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
   

  };

  React.useEffect(()=>{
    setDetails({ ...details, lat: coordinates.lat, lng: coordinates.lng });
  },[coordinates,details])

  const fileSelectHandler = async ({ target }) => {
    
    setFiles(target.files);
 
    
    
  };

  return (
    <div>
      <input type="text" placeholder="name of the company..."></input>
      <input type="text" placeholder="total number of rooms"></input>
      <input type="description about your PG"></input>
      <input type="file" multiple onChange={fileSelectHandler} />

      <PlacesAutocomplete
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
      
      {checkboxes.map((item) => (
        <label key={item.key}>
          {item.name}
          <Checkbox
            name={item.name}
            checked={checkedItems[item.name]}
            onChange={handleChange}
          />
        </label>
      ))}
    </div>
  );
}
