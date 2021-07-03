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
      <input
        type="text"
        name="name"
        placeholder="Enter your name ..."
        onChange={({ target }) =>
          setDetails({ ...details, name: target.value })
        }
      ></input>
      <input
        type="text"
        name="firstName"
        placeholder="Firstname"
        onChange={({ target }) => {
          setDetails({ ...details, firstName: target.value });
          console.log(details);
        }}
      ></input>
      <input
        type="text"
        name="lastName"
        onChange={({ target }) =>
          setDetails({ ...details, lastName: target.value })
        }
        placeholder="lastname "
      ></input>
      <input
        type="text"
        name="email"
        onChange={({ target }) =>
          setDetails({ ...details, email: target.value })
        }
        placeholder="email"
      ></input>
    </div>
  );
}
