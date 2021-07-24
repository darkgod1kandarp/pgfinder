import { Login ,SignUp,ForgotPassword} from "./Popup";
import React, { useState } from "react";
const Main = () => {
  const[user,setuser]=("true")
  const [showModal, setShowModal] = useState("");
  const [details, setDetails] = useState({
      name:"",
      Password:""
  });

  const [signUpDetails, setSignUpDetails] = useState({
    name:"",
    email:"",
    password:"",
    Cpassword:""
})

const [Fpassword, setFpassword] = useState({
  email:"",
  OTP:"",
  Password:"",
  Cpassword:""
})
const [ownerDetails,setOwnerDetails]=useState({
  name:"",
  email:"",
  password:"",
  Cpassword:"",
  phoneNumber:""


})
console.log(Fpassword,signUpDetails)
  return (
    <>
      <div className="container">
        <button
          onClick={() => {
            setShowModal("login");
          }}
        >
          Login
        </button>
        <button
          onClick={() => {
            setShowModal("signup");
          }}
        >
          SignUp
        </button>
        <button
          onClick={() => {
            setShowModal("forgot");
          }}
        >
          ForgotPassword
        </button>
        <button
          onClick={() => {
            setShowModal("Osignup");
          }}
        >
          Owner
        </button>
        <Login
          showModal={showModal}
          setShowModal={setShowModal}
          setDetails={setDetails}
          details={details}
        />
        

        <SignUp
          showModal={showModal}
          setShowModal={setShowModal}
          setSignUpDetails={setSignUpDetails}
          signUpDetails={signUpDetails}
            ownerDetails={ownerDetails}
            setOwnerDetials={setOwnerDetails}
/>
        <ForgotPassword
          showModal={showModal}
          setShowModal={setShowModal}
          setFpassword={setFpassword}
          Fpassword={Fpassword}
        />
  
      </div>
    </>
  );
};

export default Main;
