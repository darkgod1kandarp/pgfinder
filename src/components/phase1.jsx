import React from "react";
import PlacesAutocomplete,{geocodeByAddress,getLatLng} from "react-places-autocomplete";
export default function Phase1({setDetails,details}) {

  
    return(

        <div>
        <input type ="text" name =  "name" placeholder =  "Enter your name ..." onChange =  {({target})=>setDetails({...details,name:target.value})}></input>
        <input type =  "text" name  = "firstName" placeholder = "Firstname"  onChange ={({target})=>{setDetails({...details,firstName:target.value});console.log(details)}} ></input>
        <input type =  "text" name ="lastName" onChange = {({target})=>setDetails({...details,lastName:target.value})} placeholder = "lastname "></input>
        <input type = "text" name = "email" onChange =  {({target})=>setDetails({...details,email:target.value})} placeholder =  "email"></input>
        <input type = "text" name = "adharCardNumber" onChange = {({target})=>setDetails({...details,adharCardNumber: target.value})} placeholder = "adharcard number "></input>
        <input type ="text" name = "livingAddress" onChange = {({target})=>setDetails({...details,livingAddress:target.value})} placeholder = "livingaddress"></input>

        </div>

    );
}