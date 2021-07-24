import React from 'react';
import { useLocation } from 'react-router';
import { Fragment, useEffect, useState, useRef } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import { useGoogleMaps } from "react-hook-google-maps";
import useGeolocation from "react-hook-geolocation";

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

const Map = () => {
  const latlng=useGeolocation()
  console.log(latlng,"we")
      const location = useLocation().state;
      const [counter,setCounter]=useState(0)
    console.log(location);
    const [dest, setDest] = useState({
      lat: location.lat,
      lng: location.lng
    });
    const [saving ,setSaving] = useState("");
      const handleSelect = async value => {
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      setDest(latLng);
    };
  
    const prevMarkersRef = useRef([]);
     const [point,setPoint] = useState({lat:null,lng:null});
    // incoming location to set
   
    navigator.geolocation.getCurrentPosition(function(position) {
  
      setPoint({lat:latlng.latitude,lng:latlng.longitude});
      
    });
  console.log(point)
  
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
        <div ref={ref} style={{ width: "100vw", height: "100vh" }} />
      </div>
    );


    // const location = useLocation().state;
    // console.log(location);
    // return (
    //     <div className="">

    //     </div>
    //   );
}
 
export default Map;