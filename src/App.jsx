import React from "react";
// import Phase1 from "./components/phase1";
// import Phase2 from "./components/phase2";
// import Phase3 from "./components/phase3";
import Register from "./components/Register";
import Dashboard from "./components/dashboard";
// import Op from "./components/op"
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from "./components/LoginPage";
import PgFinderLogin from "./components/PgFinderLogin";
import PgPage from "./components/PgPage";
import PgMainPage from "./components/PgMainPage";
import SignUp from "./components/signup";
import SearchBar from "./components/searchbar";
import CircleLoader from "./components/circleloader";




export default function App() {
  // const [details, setDetails] = React.useState({
  //   name: "",
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   livingAddress: "",
  //   phoneNumber: "",
  //   adharCardNumber: "",
  // });
  // const [phase1, setPhase1] = React.useState(true);
  // const [phase2, setPhase2] = React.useState(true);

  // const[state,setState] = React.useState([]);


  

  return (
    <div className="">
      <BrowserRouter><Switch>
        <Route path="/login"  component={LoginPage}></Route>
        <Route path="/home" component={Register}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
       
        <Route path = "/pgpage" component = {PgPage}></Route>
        <Route path ="/pg" component ={PgMainPage}></Route>
        <Route path ="/Signup" component ={SignUp}></Route>
        <Route path ="/searchbar" component={SearchBar}></Route>
        <Route path="/pgfinderlogin" component = {PgFinderLogin}></Route>
        <Route path ="/Circle" component = {CircleLoader}></Route>
      <Route exact path ="/" component = {LoginPage}></Route>
       
        </Switch></BrowserRouter>
    
    </div>
    // <div>
    //   {phase1 ? (
    //     <div>
    //       <Phase1 setDetails={setDetails} details={details}></Phase1>
    //       <button onClick={() => setPhase1(!phase1)}> on CLick</button>
    //     </div>
    //   ) : phase2 ? (
    //     <div>
    //       <button onClick={() => setPhase1(!phase1)}>BACK</button>
    //       <Phase2 setDetails={setDetails} details={details}></Phase2>
    //       <button onClick={() => setPhase2(!phase2)}>on click par t2</button>
    //     </div>
    //   ) : (
    //     <div>
    //       <button onClick={() => setPhase2(!phase2)}>BACK</button>
    //       <Phase3></Phase3>
    //       <button>on click part3</button>
    //     </div>
    //   )}
    // </div>
  );
}
