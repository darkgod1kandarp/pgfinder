import React, { useState } from "react";
import Phase1 from "./phase1";
import Phase2 from "./phase2";
import Phase3 from "./phase3";
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
  const [error, setError] = useState({
    nameErr: "",
    firstNameErr: "",
    lastNameErr: "",
    emailErr: "",
    livingAddressErr: "",
    phoneNumberErr: "",
    adharCardNumberErr: "",
  });
  const [Phase, setPhase] = useState("Phase2");

  const next = () => {
    if (Phase === "Phase1") {
      setPhase("Phase2");
    }
    if (Phase === "Phase2") {
      setPhase("Phase3");
    }
  };
  const back = () => {
    if (Phase === "Phase2") {
      setPhase("Phase1");
    }
    if (Phase === "Phase3") {
      setPhase("Phase2");
    }
  };
  const validation = () => {};
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
      {Phase === "Phase2" && (
        <Phase2 setDetails={setDetails} details={details} />
      )}
      {Phase === "Phase3" && (
        <Phase3 setDetails={setDetails} details={details} />
      )}
      <button
        onClick={next}
        disabled={
          !(
            error.nameErr &&
            error.firstNameErr &&
            error.lastNameErr &&
            error.emailErr &&
            error.livingAddressErr &&
            error.phoneNumberErr &&
            error.adharCardNumberErr
          )
        }
      >
        NEXT
      </button>
      <button onClick={back}>BACK</button>
    </div>
  );
};

export default Register;
