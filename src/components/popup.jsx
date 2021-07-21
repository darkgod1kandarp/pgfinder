import React, {
  useRef,
  useEffect,
  useCallback,
} from "react";
import "./login/Popup.scss";

export const SignUp = ({
  mode,
  setMode,
  credentials,
  setCredentials,
  handleclickSignup,

}) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setMode("");
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && mode) {
        setMode("");
      }
    },
    [setMode, mode]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      <div className="background" onClick={closeModal} ref={modalRef}>
        <div className="popupwrapsignup" mode={mode}>
          <img
            className="popupimgsignup"
            src="https://images.unsplash.com/photo-1626209549536-c483af22ca11?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80"
          />
          <div className="popupcontent">
            <h1>Sign Up</h1>
            <p>help to find the better place to stay</p>
            <div class="form-group">
              <input
                type="text"
                required
                onChange={({ target }) => {
                  console.log(target.value);
                  setCredentials({ ...credentials, username: target.value });
                }}
              />
              <label>Username</label>
            </div>
            <div class="form-group">
              <input
                type="text"
                required
                onChange={({ target }) => {
                  console.log(target.value);
                  setCredentials({ ...credentials, email: target.value });
                }}
              />
              <label>email</label>
            </div>

            <div class="form-group">
              <input
                type="text"
                required
                onChange={({ target }) => {
                  setCredentials({ ...credentials, password: target.value });
                }}
              />
              <label>password</label>
            </div>

            <div class="form-group">
              <input
                type="text"
                required
                onChange={({ target }) => {
                  setCredentials({ ...credentials, Cpassword: target.value });
                }}
              />
              <label> Confirm password</label>
            </div>
            <div
              className="Signup--text"
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                fontSize: "10px",
              }}
            >
              <p>already have a account</p>
              <button
                onClick={() => {
                  setMode("login");
                }}
                className={"popup__link"}
              >
                login
              </button>
            </div>

            <button className="popupcontentsubmit" onClick={handleclickSignup}>
              SignUp
            </button>
          </div>
          <button
            className="popupclose"
            aria-label="Close modal"
            onClick={() => setMode("")}
          >
            X
          </button>
        </div>
      </div>
    </>
  );
};

export const ForgotPassword = ({
  mode,
  setMode,
  setPassword,
  password,
  forgotPhase,
  setForgotPhase,
  handleCheckOtp,
  handleForgot,
  handleUpdatePassword
}) => {
  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setMode("");
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && mode) {
        setMode("");
      }
    },
    [setMode, mode]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {mode == "forgot" ? (
        <div className="background" onClick={closeModal} ref={modalRef}>
          <div className="popupwrap" mode={mode}>
            <img
              className="popupimg"
              src="https://images.unsplash.com/photo-1626209549536-c483af22ca11?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80"
            />
            <div className="popupcontent">
              <h1>Forgot Password</h1>
              <p>help to find the brtter place to stay</p>
              {forgotPhase === "name" && (
                <div class="form-group">
                  <input
                    type="text"
                    required
                    onChange={({ target }) => {
                      console.log(target.value);
                      setPassword({ ...password, name: target.value });
                    }}
                  />
                  <label>Name</label>
                </div>
              )}
              {forgotPhase === "otp" && (
                <div class="form-group">
                  <input
                    type="text"
                    required
                    onChange={({ target }) => {
                      console.log(target.value);
                      setPassword({ ...password, otp: target.value });
                    }}
                  />
                  <label>OTP</label>
                </div>
              )}

              {forgotPhase === "update" && (
                <div className="">
                  <div class="form-group">
                    <input
                      type="text"
                      required
                      onChange={({ target }) => {
                        console.log(target.value);
                        setPassword({ ...password, password: target.value });
                      }}
                    />

                    <label>Password</label>
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      required
                      onChange={({ target }) => {
                        console.log(target.value);
                        setPassword({ ...password, Cpassword: target.value });
                      }}
                    />

                    <label>Confirm Password</label>
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  if (forgotPhase === "name") {
                    handleForgot()
                  }
                  if (forgotPhase === "otp") {
                    handleCheckOtp()
                  }
                  if(forgotPhase==="update"){
                    handleUpdatePassword()
                  }
                }}
              >
                Next
              </button>
            </div>
            <button
              className="popupclose"
              aria-label="Close modal"
              onClick={() => setMode("")}
            >
              X
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export const Login = ({
  mode,
  setMode,
  setloginCredentials,
  loginCredentials,
  handleclickLogin,
}) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setMode("");
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && mode) {
        setMode("");
      }
    },
    [setMode, mode]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {mode == "login" ? (
        <div className="background" onClick={closeModal} ref={modalRef}>
          <div className="popupwrap" mode={mode}>
            <img
              className="popupimg"
              src="https://images.unsplash.com/photo-1626209549536-c483af22ca11?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80"
            />
            <div className="popupcontent">
              <h1>Login</h1>
              <p className="popupcontent--text">
                help to find the brtter place to stay
              </p>
              <div class="form-group">
                <input
                  type="text"
                  required
                  onChange={({ target }) => {
                    console.log(target.value);
                    setloginCredentials({
                      ...loginCredentials,
                      username: target.value,
                    });
                  }}
                />
                <label>Username</label>
              </div>
              <div class="form-group">
                <input
                  type="text"
                  required
                  onChange={({ target }) => {
                    console.log(target.value);
                    setloginCredentials({
                      ...loginCredentials,
                      password: target.value,
                    });
                  }}
                />
                <label>Password</label>
              </div>

              <div
                className="Signup--text"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  fontSize: "10px",
                }}
              >
                <p>don`t have a account</p>
                <button
                  onClick={() => {
                    setMode("signup");
                  }}
                  className={"popup__link"}
                >
                  signup
                </button>
              </div>

              <div
                className=""
                style={{ alignItems: "center", fontSize: "10px" }}
              >
                <button
                  onClick={() => {
                    setMode("forgot");                    
                  }}
                  className="popup__link"
                >
                  {" "}
                  forgot Password
                </button>
              </div>
              <button
                onClick={handleclickLogin}
                className={"popupcontentsubmit"}
              >
                Login{" "}
              </button>
            </div>
            <button
              className="popupclose"
              aria-label="Close modal"
              onClick={() => setMode("")}
            >
              X
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};
