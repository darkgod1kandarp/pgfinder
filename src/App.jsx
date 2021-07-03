import React from "react";
import Phase1 from "./components/phase1";
import Phase2 from "./components/phase2";
import Phase3 from "./components/phase3";
export default function App() {
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
      {phase1 ? (
        <div>
          <Phase1 setDetails={setDetails} details={details}></Phase1>
          <button onClick={() => setPhase1(!phase1)}> on CLick</button>
        </div>
      ) : phase2 ? (
        <div>
          <button onClick={() => setPhase1(!phase1)}>BACK</button>
          <Phase2 setDetails={setDetails} details={details}></Phase2>
          <button onClick={() => setPhase2(!phase2)}>on click part2</button>
        </div>
      ) : (
        <div>
          <button onClick={() => setPhase2(!phase2)}>BACK</button>
          <Phase3></Phase3>
          <button>on click part3</button>
        </div>
      )}
    </div>
  );
}
