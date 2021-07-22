import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ScatterBoxLoader from "./circleloader";
import { Login, SignUp,ForgotPassword } from "./popup";
export default function LoginPage() {
  const history = useHistory();
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    acctype: "/pg",
  });
  const [loginCredentials, setloginCredentials] = useState({
    username: "",
    password: "",
  });
  const [ownerDetials, setOwnerDetails] = useState({
    username: "",
    password: "",
    email: "",
    phoneNumber:0,
    personalImage: "",
    pgLicence: "",
    acctype: "/owner",
  });
  const [password, setPassword] = useState({
    name: "",
    otp: "",
    password: "",
    Cpassword: "",
    acctype: "",
  });
  const [otp, setOtp] = useState("");
  const [forgotPhase, setForgotPhase] = useState("name");

  const imagereader = function readFileAsText(file) {
    return new Promise(function (resolve, reject) {
      let fr = new FileReader();

      fr.onload = function () {
        resolve(fr.result);
      };

      fr.onerror = function () {
        reject(fr);
      };

      fr.readAsDataURL(file);
    });
  };
  const onChangePersonal = ({ target }) => {
    let files = target.files;
    let readers = [];
    if (!files.length) return;
    for (let i = 0; i < files.length; i++) {
      readers.push(imagereader(files[i]));
    }

    Promise.all(readers).then((values) => {
      for (let j = 0; j < files.length; j++) {
        setOwnerDetails({ ...ownerDetials, personalImage: values[0] });
      }
    });
  };
  const onChangePglic = ({ target }) => {
    let files = target.files;
    let readers = [];
    if (!files.length) return;
    for (let i = 0; i < files.length; i++) {
      readers.push(imagereader(files[i]));
    }

    Promise.all(readers).then((values) => {
      for (let j = 0; j < files.length; j++) {
        setOwnerDetails({ ...ownerDetials, pgLicence: values[0] });
      }
    });
  };
  const [mode, setMode] = useState("signup");
  React.useEffect(() => {
    const checkingIfTheLocalStorageHaveTheDataOrNot =
      localStorage.getItem("jwt");
    console.log(checkingIfTheLocalStorageHaveTheDataOrNot);
    if (
      checkingIfTheLocalStorageHaveTheDataOrNot !== null ||
      checkingIfTheLocalStorageHaveTheDataOrNot !== undefined
    ) {
      var jwt;

      try {
        const token = JSON.parse(checkingIfTheLocalStorageHaveTheDataOrNot);
        jwt = `Bearer ${token}`;
        console.log(jwt);
      } catch (err) {
        jwt = "";
      }

      async function fetchApi() {
        const data = await JSON.parse(localStorage.getItem("data"));
        //  console.log(data)
        await axios({
          method: "post",
          url: "http://localhost:5000/api/homepage",
          headers: { Authorization: jwt },
          data: data,
        })
          .then(async (res) => {
            console.log(res, "q4124");
            history.push(res.data.acctype);
          })

          .catch((err) => setLoading(false));
      }
      fetchApi();
    }
  }, [history, mode]);
  const handleclickSignup = async () => {
    console.log(credentials);
    localStorage.setItem("data", JSON.stringify(credentials));
    axios({
      method: "post",
      url: "http://localhost:5000/api/signin",
      data: credentials,
    }).then((res) => {
      console.log(res, 1123);
      if (res.data.data === "no account") {
        axios({
          method: "post",
          url: "http://localhost:5000/api/login",
        }).then((res) => {
          console.log(res);
          localStorage.setItem("jwt", JSON.stringify(res.data.token));
          history.push("/pg");
        });
      }
    });
  };
  const handleclickLogin = async () => {
    localStorage.setItem("data", JSON.stringify(loginCredentials));
    axios({
      method: "post",
      url: "http://localhost:5000/api/login1",
      data: loginCredentials,
    }).then((res) => {
      console.log(res, "login");

      if (res.data.data === "/pg" || res.data.data==="/owner") {
        axios({
          method: "post",
          url: "http://localhost:5000/api/login",
        }).then((res) => {
          console.log(res);
          console.log(res.data.data,"qweq")
          history.push(res.data.data);
          localStorage.setItem("jwt", JSON.stringify(res.data.token));
          
        });
      }
     
    });
  };
  const handleCheckOtp = () => {
    if (otp === password.otp) {
      setForgotPhase("update");
    } else {
      alert("as");
    }
  };
  const handleUpdatePassword = () => {
    if (password.password === password.Cpassword) {
      console.log(123)
      axios({
        method: "post",
        url: "http://localhost:5000/api/update",
        data: { username: password.name, password: password.password },
      }).then((res) => {
        if (res.data.data === "updated") {
          history.push(password.acctype);
        }
      });
    } else {
      alert("123");
    }
  };
  const handleForgot = () => {
    

    axios({
      method: "post",
      url: "http://localhost:5000/api/forgotpassword",
      data: {
        username: password.name,
      },
    }).then((res) => {
      if (res.data.send === "email send") {
        setOtp(res.data.data);
        setForgotPhase("otp");
        setPassword({ ...password, acctype: res.data.acctype });
        console.log(res, otp);
      }
      if (res.data.send === "email not send") {
        alert("email not send pls try again");
        setForgotPhase("name");
      }
    });
  };
  const handleclickOwner = () => {
    console.log(123);
    localStorage.setItem("data", JSON.stringify(ownerDetials));
    axios({
      method: "post",
      url: "http://localhost:5000/api/signupowner",
      data: ownerDetials,
    }).then((res) => {
      console.log(res);
      if (res.data.data === "account created") {
        axios({
          method: "post",
          url: "http://localhost:5000/api/login",
        }).then((res) => {
          console.log(res);
          localStorage.setItem("jwt", JSON.stringify(res.data.token));
        });
        history.push("/owner");
      }
    });
  };
  return loading ? (
    <ScatterBoxLoader />
  ) : (
    <>
      {user === "" && (
        <div>
          <button
            onClick={() => {
              setUser("owner");
            }}
          >
            As PG Owner
          </button>
          <button
            onClick={() => {
              setUser("user");
            }}
          >
            A PG Finder{" "}
          </button>
        </div>
      )}

      {user === "user" && (
        <div className="userloginsignup">
          <div className="btnloginsignup">
            <button className="signup"
              onClick={() => {
                setMode("signup");
              }}
            >
              signup
            </button>
            <button className="login"
              onClick={() => {
                setMode("login");
              }}
            >
              login
            </button>
          </div>
              {mode==="signup" &&
              <SignUp 
                setMode={setMode}
                mode={mode}
                handleclickSignup={handleclickSignup}
                credentials={credentials}
                setCredentials={setCredentials}              
              />
              }
              {
                <Login
                setMode={setMode}
                mode={mode}
                setloginCredentials={setloginCredentials}
                loginCredentials={loginCredentials}
                handleclickLogin={handleclickLogin}
                />
 }
<p>{mode}</p>
 {
   mode==="forgot" &&
<ForgotPassword
 setMode={setMode}
 mode={mode}
 handleCheckOtp={handleCheckOtp}
 handleForgot={handleForgot}
 handleUpdatePassword={handleUpdatePassword}
 forgotPhase={forgotPhase}
 setForgotPhase={setForgotPhase}
 password={password}
 setPassword={setPassword}
/>
 }

        </div>
      )}

      {/* {user === "user" && (
        <div className="">
          <div className="">
            <button
              onClick={() => {
                setMode("forgot");
              }}
            >
              forgot
            </button>
            <p>{mode}</p>
          </div>

          {mode === "signup" && (
            <div className="">
              <input
                type="text"
                className=""
                onChange={({ target }) => {
                  setCredentials({ ...credentials, username: target.value });
                }}
              />
              <input
                type="text"
                className=""
                onChange={({ target }) => {
                  setCredentials({ ...credentials, password: target.value });
                }}
              />
              <input
                type="text"
                className=""
                onChange={({ target }) => {
                  setCredentials({ ...credentials, email: target.value });
                }}
              />
              <button onClick={handleclickSignup}>signup</button>
            </div>
          )}
          {mode === "login" && (
            <div className="">
              <input
                type="text"
                className=""
                onChange={({ target }) => {
                  setloginCredentials({
                    ...loginCredentials,
                    username: target.value,
                  });
                }}
              />
              <input
                type="text"
                className=""
                onChange={({ target }) => {
                  setloginCredentials({
                    ...loginCredentials,
                    password: target.value,
                  });
                }}
              />
              <button onClick={handleclickLogin}>login</button>
            </div>
          )}
          {mode === "forgot" && (
            <div className="">
              {forgotPhase === "name" && (
                <div className="">
                  <input
                    type="text"
                    onChange={({ target }) => {
                      setPassword({ ...password, name: target.value });
                    }}
                  />
                  <button onClick={handleForgot}>next</button>
                </div>
              )}
              {forgotPhase === "OTP" && (
                <div className="">
                  <input
                    type="text"
                    onChange={({ target }) => {
                      setPassword({ ...password, otp: target.value });
                    }}
                  />
                  <button onClick={handleCheckOtp}>verify</button>
                </div>
              )}
              {forgotPhase === "password" && (
                <div className="">
                  <input
                    type="text"
                    className=""
                    onChange={({ target }) => {
                      setPassword({ ...password, password: target.value });
                    }}
                  />
                  <input
                    type="text"
                    className=""
                    onChange={({ target }) => {
                      setPassword({ ...password, Cpassword: target.value });
                    }}
                  />
                  <button onClick={handleUpdatePassword}>update</button>
                </div>
              )}
            </div>
          )}
        </div>
      )} */}

      {user === "owner" && (
        <div className="">
          <div className="">
            <button
              onClick={() => {
                setMode("signup");
              }}
            >
              signup
            </button>
            <button
              onClick={() => {
                setMode("login");
              }}
            >
              login
            </button>
            <p>{mode}</p>
          </div>
          {mode === "signup" && (
            <div className="">
              <input
                type="text"
                className=""
                onChange={({ target }) => {
                  setOwnerDetails({ ...ownerDetials, username: target.value });
                }}
              />
              <input
                type="text"
                className=""
                onChange={({ target }) => {
                  setOwnerDetails({ ...ownerDetials, password: target.value });
                }}
              />
              <input
                type="text"
                className=""
                onChange={({ target }) => {
                  setOwnerDetails({ ...ownerDetials, email: target.value });
                }}
              />
              <input
                type="text"
                className=""
                onChange={({ target }) => {
                  setOwnerDetails({
                    ...ownerDetials,
                    phoneNumber: parseInt(target.value),
                  });
                }}
              />
              <input type="file" accept="image/*" onChange={onChangePersonal} />

              <input type="file" accept="image/*" onChange={onChangePglic} />

              <button onClick={handleclickOwner}>signUP</button>
            </div>
          )}
          {mode === "login" && (
            <div className="">
              <input
                type="text"
                className=""
                onChange={({ target }) => {
                  setloginCredentials({
                    ...loginCredentials,
                    username: target.value,
                  });
                }}
              />
              <input
                type="text"
                className=""
                onChange={({ target }) => {
                  setloginCredentials({
                    ...loginCredentials,
                    password: target.value,
                  });
                }}
              />
              <button onClick={handleclickLogin}>login</button>
            </div>
          )}
        </div>
      )}
      {console.log(otp)}
    </>
  );
}
