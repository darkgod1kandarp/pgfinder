import React, { useState, useEffect } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { useHistory } from "react-router-dom";
const PgFinderLogin = () => {
  const history = useHistory();

  const { token } = JSON.parse(localStorage.getItem("jwt"));

  const jwt = `Bearer ${token}`;

  useEffect(() => {
    const checkingIfTheLocalStorageHaveTheDataOrNot =
      localStorage.getItem("jwt");
    console.log(checkingIfTheLocalStorageHaveTheDataOrNot);
    if (
      checkingIfTheLocalStorageHaveTheDataOrNot !== null ||
      checkingIfTheLocalStorageHaveTheDataOrNot !== undefined
    ) {
      console.log(123);
      async function fetchApi() {
        await axios({
          method: "post",
          url: "http://localhost:5000/api/posts",
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

                history.push("/home");
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => {
            // history.push("/home");
          });
      }
      fetchApi();   
    }
  }, [history,jwt]);

  const [state, setState] = useState({ username: "", password: "" });
  const responseGoogle = async (response) => {
    setState({ username: response.Ys.It, password: response.Ys.Ve });
    await localStorage.setItem("data", JSON.stringify(state));

    await axios({
      method: "post",
      url: "http://localhost:5000/api/datagaining",
      params: { data: { password: response.Ys.It, username: response.Ys.Ve } },
      headers: { Authorization: jwt },
    })
      .then((res) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
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
    }).then((response) =>
      localStorage.setItem("jwt", JSON.stringify(response.data))
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
        clientId="1057081408783-no215q4qet3l1t84s0a1dvhopjecfq5n.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
};
export default PgFinderLogin;
