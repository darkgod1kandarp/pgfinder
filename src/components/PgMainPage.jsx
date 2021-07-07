import React from 'react';
 const PgMainPage = ()=>{

    const[point,setPoint] = React.usestate({lat:null,lng:null});


    React.useEffect(() =>{
        navigator.geolocation.getCurrentPosition(function(position) {

                setPoint({lat:position.coords.latitude,lng:position.coords.longitude});
                
              });
            
    
            },[setPoint])
   
    return(
    <>
        <p>1234567897</p>
    
        <p>{point.lat}</p>
      </> 
    );
 }
 export default PgMainPage;