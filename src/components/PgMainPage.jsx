import React from 'react';
import SearchBar from './searchbar';
 const PgMainPage = ()=>{

    const[point,setPoint] = React.useState({lat:null,lng:null});


    React.useEffect(() =>{
        navigator.geolocation.getCurrentPosition(function(position) {

                setPoint({lat:position.coords.latitude,lng:position.coords.longitude});
                
              });
            
    
            },[setPoint])
   
    return(
    <>
    {point.lat}
        <SearchBar/>
      </> 
    );
 }
 export default PgMainPage;