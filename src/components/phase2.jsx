import React from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

export default function Phase2({ setDetails, details }) {

    const [address, setAddress] = React.useState("");
    const [coordinates, setCoordinates] = React.useState({
        lat: null,
        lng: null
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
    const [count,setCount] = React.useState(0);
    const[state,setState] = React.useState([]);
    const fileToBase64 = async()=>{
        var x;
     
      for (x of details.files){
         setCount(count+1);
        const fileing = await convertBase64(x);
        setDetails({...details,count:fileing})
      }
      console.log(details);


    }
    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(latLng);
        console.log(details);
        setDetails({ ...details, lat: coordinates.lat, lng: coordinates.lng })
    };

   
     const fileSelectHandler = ({target})=>{
        setDetails({...details,files:target.files});
     }
 



    return (
        <div>
            {console.log(details)}
            <input type="text" placeholder="name of the company..."></input>
            <input type  ="text" placeholder="total number of rooms"></input>
            <input type ="description about your PG"></input>
            <input type="file" multiple onChange ={fileSelectHandler} />
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <p>Latitude: {coordinates.lat}</p>
                        <p>Longitude: {coordinates.lng}</p>

                        <input {...getInputProps({ placeholder: "Type address" })} />

                        <div>
                            {loading ? <div>...loading</div> : null}

                            {suggestions.map(suggestion => {
                                const style = {
                                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
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
            <button onClick = {fileToBase64}>Complete</button>

        </div>

    );
}