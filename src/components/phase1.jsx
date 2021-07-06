import React from "react";
import {
  Name,
  MobileNumber,
  address,
  email,
  aadhar,
} from "../Uitls/Validations";
export default function Phase1({ setDetails, details, error, setError }) {
  return (
    <div>
      <h1>personal details</h1>
      <input
        type="text"
        name="name"
        placeholder="Enter your name ..."
        onChange={({ target }) => {
          setDetails({ ...details, name: target.value });

          setError({
            ...error,
            nameErr: Name(target.value).username && Name(target.value).length,
          });
          console.log(details);
        }}
      ></input>
      <input
        type="text"
        name="firstName"
        placeholder="Firstname"
        onChange={({ target }) => {
          setDetails({ ...details, firstName: target.value });
          console.log(details);
          setError({
            ...error,
            firstNameErr: Name(target.value).username && Name(target.value).length,
          });
        }}
      ></input>

      <input
        type="text"
        name="lastName"
        onChange={({ target }) => {
          setDetails({ ...details, lastName: target.value });
          setError({
            ...error,
            lastNameErr: Name(target.value).username && Name(target.value).length,
          });

        }}
        placeholder="lastname "
      ></input>
     
      <input
        type="text"
        placeholder="mobile number"
        onChange={({ target }) => {
          setDetails({ ...details, phoneNumber: target.value });
          console.log(MobileNumber(target.value));
          setError({ ...error, phoneNumberErr: MobileNumber(target.value).username&&MobileNumber(target.value).length });
        }}
      />
      <input
        type="text"
        name="email"
        onChange={({ target }) => {
          setDetails({ ...details, email: target.value });
          setError({ ...error, emailErr: email(target.value).username&&email(target.value).length });
        }}
        placeholder="email"
      ></input>
      <input
        type="text"
        name="adharCardNumber"
        onChange={({ target }) => {
          setDetails({ ...details, adharCardNumber: target.value });
          setError({ ...error, adharCardNumberErr: aadhar(target.value) });
        }}
        placeholder="adharcard number "
      ></input>
      <input
        type="text"
        name="livingAddress"
        onChange={({ target }) => {
          setDetails({ ...details, livingAddress: target.value });
          setError({ ...error, livingAddressErr: address(target.value) });
        }}
        placeholder="livingaddress"
        
      ></input>
    
    {console.log(error)}
    </div>
  );
}
