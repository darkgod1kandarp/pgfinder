import React, { useState, useEffect } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { useHistory } from "react-router-dom";
const PgFinderLogin = () => {
  const history = useHistory();
 
  

  useEffect(() => {  
    
    const checkingIfTheLocalStorageHaveTheDataOrNot =   
      localStorage.getItem("jwt");
    console.log(checkingIfTheLocalStorageHaveTheDataOrNot);
    if (
      checkingIfTheLocalStorageHaveTheDataOrNot !== null ||
      checkingIfTheLocalStorageHaveTheDataOrNot !== undefined
    ) {
        var jwt;
        try{
        const { token } = JSON.parse(localStorage.getItem("jwt"));

     jwt = `Bearer ${token}`;
        }
        catch(err){
          jwt ="";
        }

    
      async function fetchApi() {
        await axios({
          method: "post",
          url: "http://localhost:5000/api/login",
          headers: { Authorization: jwt },
        })
          .then(async (res) => {
            const data = await JSON.parse(localStorage.getItem("data"));
            console.log(data);
            await axios({
              method: "post",
              url: "http://localhost:5000/api/datagaining",
              params: {
                data,
              },
              headers: { Authorization: jwt },
            })
              .then((response) => {
                console.log(response);

                history.push("/pg");
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => {
            // history.push("/home");
          });
      }
      fetchApi();   
    }
  }, [history]);

  const [state, setState] = useState({ username: "", password: "" });
  const responseGoogle = async (response) => {
      console.log(response);
    setState({ username: response.Ys.It, password: response.Ys.Ve });
    await localStorage.setItem("data", JSON.stringify(state));
    axios({
        method: "post",
        url: "http://localhost:5000/api/login",
        data: state,
      }).then((response) =>
        localStorage.setItem("jwt", JSON.stringify(response.data))
      );
    
   
  };

  const handleClick = async () => {
    console.log(state);
    localStorage.setItem("data", JSON.stringify(state));
    const op = await localStorage.getItem("data");
    console.log(op);
    axios({
      method: "post",
      url: "http://localhost:5000/api/login",
      data: op,
    }).then((response) =>{
      localStorage.setItem("jwt", JSON.stringify(response.data))
      history.push("/pg")
    }
    );
  };

  

  return (
    <>
      <input
        type="text"
        placeholder="Username"
        onChange={({ target }) =>
          setState({ ...state, username: target.value })
        }
      ></input>
      <input
        type="text"
        placeholder="password"
        onChange={({ target }) =>
          setState({ ...state, password: target.value })
        }
      ></input>
      <button type="submit" onClick={handleClick}>
        Submit
      </button>
      <GoogleLogin
        clientId="863493315126-7lv128pfcvn3kl7gqv56c6928474gcth.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
};
export default PgFinderLogin;
