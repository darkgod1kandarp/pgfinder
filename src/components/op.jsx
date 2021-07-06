import React from "react";
import axios from "axios";



export default function Op (){
const [state,setState] = React.useState({});


React.useEffect(() => {

    
  const jwt ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImJyYWQiLCJlbWFpbCI6ImJyYWRAZ21haWwuY29tIn0sImlhdCI6MTYyNTQ4NDY3M30.niCpf8fuKjiwE89CuTXoVd9gDykFqEuPlimJt2ow_zc";
    
  localStorage.setItem('data',JSON.stringify(jwt));
  
  axios({
        method: 'post',
        url: 'http://localhost:5000/api/posts',
        headers: { Authorization:jwt}
    }).then((response) => console.log(setState(response.data)));

    


});

return(
<p>fef</p>
);

}