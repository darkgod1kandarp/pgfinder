import { Fragment, useEffect, useState, useRef } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import { useGoogleMaps } from "react-hook-google-maps";
// import useGeoPosition from './useGeoPosition';
import usePlacesAutocomplete from "use-places-autocomplete";
import PlacesAutocomplete,{geocodeByAddress,getLatLng} from "react-places-autocomplete";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer,
} from 'react-google-maps';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption 
} from "@reach/combobox";

   
import "react-google-places-autocomplete/dist/index.min.css"

import "@reach/combobox/styles.css";

// export default function App() {
//   const [address, setAddress] = React.useState("");
//   const [coordinates, setCoordinates] = React.useState({
//     lat: null,
//     lng: null
//   });

//   const handleSelect = async value => {
//     const results = await geocodeByAddress(value);
//     const latLng = await getLatLng(results[0]);
//     setAddress(value);
//     setCoordinates(latLng);
//   };


//   return (
//     <div>
//       <PlacesAutocomplete
//         value={address}
//         onChange={setAddress}
//         onSelect={handleSelect}
//       >
//         {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//           <div>
//             <p>Latitude: {coordinates.lat}</p>
//             <p>Longitude: {coordinates.lng}</p>

//             <input {...getInputProps({ placeholder: "Type address" })} />

//             <div>
//               {loading ? <div>...loading</div> : null}

//               {suggestions.map(suggestion => {
//                 const style = {
//                   backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
//                 };

//                 return (
//                   <div {...getSuggestionItemProps(suggestion, { style })}>
//                     {suggestion.description}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </PlacesAutocomplete>
//     </div>
//   );
// }




const Direction = () => {

  const [address, setAddress] = useState("");
  const [dest, setDest] = useState({
    lat: 23.2778,
    lng: 71.3412
  });
  const [saving ,setSaving] = useState("");
    const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setDest(latLng);
  };

  const prevMarkersRef = useRef([]);
   const [point,setPoint] = useState({lat:null,lng:null});
  // incoming location to set
  navigator.geolocation.getCurrentPosition(function(position) {

    setPoint({lat:position.coords.latitude,lng:position.coords.longitude});
    
  });


  function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }


   
  // Map options
  const { ref, map, google } = useGoogleMaps(
    "'AIzaSyC6gtS1N5FhoW5UMc0hCG61quGnSuHeUAc",
    {
      zoom: 6,
      center: point
    }
  );
  useEffect(() => {
    if (map) {
      // ADD MARKER
      const m = addMarker();
    console.log(prevMarkersRef);
      clearMarkers(prevMarkersRef.current); //clear prev markers
      prevMarkersRef.current.push(m);
      map.setCenter(point);
      //Add Directions
      let directionsService = new google.maps.DirectionsService();
      let directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
      calcRoute(directionsService, directionsRenderer);
    }  
     
  }, [point,dest]);

 

  // SIDE FUNCTIONS
  function addMarker() {
    return new window.google.maps.Marker({
      position: point,
      map: map
    });
  }

  function clearMarkers(markers) {
    for (let m of markers) {
      m.setMap(null);
    }
  }
 

  function calcRoute(directionsService, directionsRenderer) {
    let request = {
      origin: point,
      destination: dest,
      travelMode: 'DRIVING'
    };
    directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(result);
      }
    });
  }

  return (
    <div>
    
     
      <p>{getDistanceFromLatLonInKm(point.lat,point.lng,dest.lat,dest.lng)}</p>
      <div ref={ref} style={{ width: 400, height: 300 }} />
    </div>
  );
};

export default Direction;







// export default function App(){
//   const[address,setAddress] = useState("")
//   const handleAddress = ({value})=>{

//    console.log(value);


//   }
  
// return(
// <div>
//     <GooglePlacesAutocomplete
//       apiKey="AIzaSyCejofxtxXDqgb1_xYwkgZy06mF-VNa15Q"
//       onSelect = {handleAddress}
//     />
//     {address}
//   </div>
// );
// }


// export default function App() {
//   const [rows, setRows] = useState([]);

//   return (
//     <div className="App">
//       <GooglePlacesAutocomplete
//         apiKey={"'AIzaSyC6gtS1N5FhoW5UMc0hCG61quGnSuHeUAc"}
//         placeholder="Type in an address"
//         inputStyle={{
//           height: 40,
//           fontSize: 28
//         }}
//         suggestionsStyles={{
//           container: {
//             padding: 16,
//             background: "#efefef"
//           },
//           suggestion: {
//             background: "#eee",
//             cursor: "pointer"
//           },
//           suggestionActive: {
//             background: "#bbb"
//           }
//         }}
//         onSelect={result => {
//           const { description, place_id } = result;
//           console.log(result);
//           setRows([{ description, place_id }, ...rows]);
//         }}
//       />

//       <div
//         style={{
//           textAlign: "left"
//         }}
//       >
//         {rows.map(row => (
//           <div class="selected-place">
//             <div>{row.description}</div>
//             <small>Place id: {row.place_id}</small>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function App() {
//    const {
//     error,
//     isRecording,
//     results,
//     startSpeechToText,
//     stopSpeechToText,
//   } = useSpeechToText({
//     continuous: true,
//     crossBrowser: true,
//     googleApiKey: "AIzaSyBeU3u3sSEK_datA-Y8FqvNgf9LY8nomu0",
//     timeout: 10000,
//   });
//   const [w,setW]=useState("");
//   useEffect(()=>{
//     setW(results[results.length - 1]);
//   },[results])
  


  
//   if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
  
//   const array1 = ["kandarp","rushabh","heet","aagam","shivam"]
//   return (
//     <div>
//       <h1>Recording: {isRecording.toString()}</h1>
//       <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
//         {isRecording ? 'Stop Recording' : 'Start Recording'}
//       </button>
//       {results.map(n =>(<p>{n}</p>))}
//       <input value={w} onChange={({target})=>{setW(target.value) 
//          } }/>
//          {w}
//       {array1.map((ar)=>{
//         console.log(w);
//         if(ar===w){
//           return(
//           <p>{ar}</p>
//           );
//         }
//       })}
//     </div>
//   );
// }

 

 
// const App = () => {
//   const { ref, map, google } = useGoogleMaps(
//     // Use your own API key, you can get one from Google (https://console.cloud.google.com/google/maps-apis/overview)
//     "AIzaSyC6gtS1N5FhoW5UMc0hCG61quGnSuHeUAc",
//     // NOTE: even if you change options later
//     {
//       center: { lat: 0, lng: 0 },
//       zoom: 3,
//     },
//   );
//   console.log(map); // instance of created Map object (https://developers.google.com/maps/documentation/javascript/reference/map)
//   console.log(google); // google API object (easily get google.maps.LatLng or google.maps.Marker or any other Google Maps class)
//   return <div ref={ref} style={{ width: 400, height: 300 }} />;
// };
 
// export default App;