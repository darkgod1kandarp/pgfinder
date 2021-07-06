import React from "react";
export default function Phase3() {
  const [details, setDetails] = React.useState({
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    livingAddress: "",
    phoneNumber: "",
    adharCardNumber: "",
  });
  const [phase1, setPhase1] = React.useState(true);
  const [phase2, setPhase2] = React.useState(true);

  return (
    <div>
      <input type ="file" id ="dc" placeholder ="debit/credit photo"></input> 
      <label for = "file" >debit/credit photo</label>
      <input type = "file"  placeholder ="addharcard"></input>
      <label for="file">Select file</label>
      <input type= "text" placeholder ="cardnumber"></input>
      <input type ="password" placeholder ="cvv" ></input> 

    </div>
  );
}
