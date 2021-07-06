import React, { useState } from "react";
import Phase1 from "./phase1";

import Phase3 from "./phase3";
import { useHistory } from "react-router-dom";
const Register = () => {
  const [details, setDetails] = useState({
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    livingAddress: "",
    phoneNumber: "",
    adharCardNumber: "",
  });
  

 

  const history = useHistory();

  const [error, setError] = useState({
    nameErr: "",
    firstNameErr: "",
    lastNameErr: "",
    emailErr: "",
    livingAddressErr: "",
    phoneNumberErr: "",
    adharCardNumberErr: "",
  });
  const [Phase, setPhase] = useState("Phase1");
 
     
  
  const next = async () => {
    if (Phase === "Phase1") {
      setPhase("Phase3");
    }
    if(Phase ==="Phase3"){
      console.log("123")
     history.push("/dashboard");
    }
    // if (Phase === "Phase2") {
      
    //   await fileToDataURI();

    //   setDetails((prevDetails) => {
    //     return { ...prevDetails, state ,checkedItems};
    //   });

    //   setPhase("Phase3");
    // }
  };
  

  
  const back = () => {
    // if (Phase === "Phase2") {
    //   setPhase("Phase1");
    // }
    if (Phase === "Phase3") {
      
      setPhase("Phase1");
    }
  };
  

  return (
    <div className="">
      {Phase === "Phase1" && (
        <Phase1
          setDetails={setDetails}
          details={details}
          setError={setError}
          error={error}
        />
      )}
      {/* {Phase === "Phase2" && (
        <Phase2
          setDetails={setDetails}
          details={details}
          state={state}
          setState={setState}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
          
        />
      )} */}
      {Phase === "Phase3" && (
        <Phase3 setDetails={setDetails} details={details}  />
      )}
      <button
        onClick={next}
        // disabled={
        //   !(
        //     error.nameErr &&
        //     error.firstNameErr &&
        //     error.lastNameErr &&
        //     error.emailErr &&
        //     error.livingAddressErr &&
        //     error.phoneNumberErr &&
        //     error.adharCardNumberErr
        //   )
        // }
      >
        NEXT
      </button>
      <button onClick={back}>BACK</button>
    </div>
  );
};

export default Register;
