import { Details } from "@material-ui/icons";
import React, { useRef, useEffect, useCallback ,useState} from "react";
import "./Popup.scss";
import GoogleLogin from "react-google-login";

export const Login = ({ showModal, setShowModal, setState, state,handleClick }) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal("");
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal("");
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal == "login" ? (
        <div className="background" onClick={closeModal} ref={modalRef}>
          <div className="popupwrap" showModal={showModal}>
            <img
              className="popupimg"
              src="https://images.unsplash.com/photo-1626209549536-c483af22ca11?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80"
            />
            <div className="popupcontent">
              <h1>Login</h1>
              <p>help to find the brtter place to stay</p>
              <div class="form-group">
                <input
                  type="text"
                  required
                  onChange={({ target }) => {
                    console.log(target.value);
                    setState({ ...state, username: target.value });
                  }}
                />
                <label>Username</label>
              </div>
              <div class="form-group">
                <input type="text" required 
                 onChange={({ target }) => {
                  console.log(target.value);
                  setState({ ...state, password: target.value });
                }}/>
                <label>Password</label>
              </div>
              <button onClick={handleClick} >Login   </button>

            </div>
            <button
              className="popupclose"
              aria-label="Close modal"
              onClick={() => setShowModal("")}
            >
              X
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export const SignUp = ({ showModal, setShowModal, signUpDetails, setSignUpDetails ,ownerDetails,setOwnerDetails}) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal("");
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal("");
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>


      {showModal == "signup" ? (
        <div className="background" onClick={closeModal} ref={modalRef}>
          <div className="popupwrapsignup" showModal={showModal}>
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
                    setSignUpDetails({ ...signUpDetails, name: target.value });
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
                    setSignUpDetails({ ...signUpDetails, email: target.value });
                  }}
                />
                <label>email</label>
              </div>
              
              <div class="form-group">
                <input
                  type="text"
                  required
                  onChange={({ target }) => {
                    console.log(target.value);
                    setSignUpDetails({ ...signUpDetails, password: target.value });
                  }}
                />
                <label>password</label>
              </div>
              
              <div class="form-group">
                <input
                  type="text"
                  required
                  onChange={({ target }) => {
                    console.log(target.value);
                    setSignUpDetails({ ...signUpDetails, Cpassword: target.value });
                  }}
                />
                <label> Confirm password</label>
              </div>
              <button>Login</button>
              <button onClick={()=>{setShowModal("Osignup")}}>owner</button>
            </div>
            <button
              className="popupclose"
              aria-label="Close modal"
              onClick={() => setShowModal("")}
            >
              X
            </button>
          </div>
        </div>
      ) : null}

    
    </>
  );
};


export const ForgotPassword = ({ showModal, setShowModal,setFpassword, Fpassword }) => {
  const modalRef = useRef();
  const [phase, setPhase] = useState("phase1")
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal("");
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal("");
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal == "forgot" ? (
        <div className="background" onClick={closeModal} ref={modalRef}>
          <div className="popupwrap" showModal={showModal}>
            <img
              className="popupimg"
              src="https://images.unsplash.com/photo-1626209549536-c483af22ca11?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80"
            />
            <div className="popupcontent">
              <h1>Forgot Password</h1>
              <p>help to find the brtter place to stay</p>
              {phase==="phase1" &&
              <div class="form-group">
                <input
                  type="text"
                  required
                  onChange={({ target }) => {
                    console.log(target.value);
                    setFpassword({ ...Fpassword, email: target.value });
                  }}
                />
                <label>Email</label>
              </div>}
              {phase==="phase2" &&<div class="form-group">
                <input
                  type="text"
                  required
                  onChange={({ target }) => {
                    console.log(target.value);
                    setFpassword({ ...Fpassword, OTP: target.value });
                  }}
                />
                <label>OTP</label>
              </div>}

              {phase==="phase3" &&
                <div className="">
              <div class="form-group">
                <input
                  type="text"
                  required
                  onChange={({ target }) => {
                    console.log(target.value);
                    setFpassword({ ...Fpassword, password: target.value });
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
                    setFpassword({ ...Fpassword, Cpassword: target.value });
                  }}
                />
                
                <label>Confirm Password`</label>
              </div>
              </div>
              }

              <button onClick={()=>{
                if(phase==="phase1"){setPhase("phase2")}
                if(phase==="phase2"){setPhase("phase3")}
              }}>Next</button>
            </div>
            <button
              className="popupclose"
              aria-label="Close modal"
              onClick={() => setShowModal("")}
            >
              X
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export const OwnerSignUp = ({ showModal, setShowModal, setDetails, details }) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal("");
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal("");
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal == "Osignup" ? (
        <div className="background" onClick={closeModal} ref={modalRef} >
          <div className="popupwrapsignup" showModal={showModal} >
            <img
              className="popupimgsignup"
              src="https://images.unsplash.com/photo-1626209549536-c483af22ca11?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80"
            
            />
            <div className="popupcontent">
              <h1>Sign Up</h1>
              <p>help to find the better place to stay</p>
              <div className="form-group">
                <input
                  type="text"
                  required
                  onChange={({ target }) => {
                    console.log(target.value);
                    setDetails({ ...details, name: target.value });
                  }}
                />
                <label>Username</label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  required
                  onChange={({ target }) => {
                    console.log(target.value);
                    setDetails({ ...details, email: target.value });
                  }}
                />
                <label>email</label>
              </div>
              <div class="form-group">
                <input
                  type="text"
                  required
                  onChange={({ target }) => {
                    console.log(target.value);
                    setDetails({ ...details, email: target.value });
                  }}
                />
                <label>Phone number</label>
              </div><div class="form-group">
                <input
                  type="text"
                  required
                  onChange={({ target }) => {
                    console.log(target.value);
                    setDetails({ ...details, email: target.value });
                  }}
                />
                <label>Adhar Card</label>
              </div>
                  <div className="">
                    <input type="file" />
                  </div>
              <div class="form-group">
                <input
                  type="text"
                  required
                  onChange={({ target }) => {
                    console.log(target.value);
                    setDetails({ ...details, password: target.value });
                  }}
                />
                <label>password</label>
              </div>
              
              <div class="form-group">
                <input
                  type="text"
                  required
                  onChange={({ target }) => {
                    console.log(target.value);
                    setDetails({ ...details, Cpassword: target.value });
                  }}
                />
                <label> Confirm password</label>
              </div>
              <button>Login</button>
            </div>
            <button
              className="popupclose"
              aria-label="Close modal"
              onClick={() => setShowModal("")}
            >
              X
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};



