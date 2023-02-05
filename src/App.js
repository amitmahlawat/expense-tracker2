import React from "react";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { Redirect, Route } from "react-router-dom";
import Welcome from "./Components/WelcomePage";
function App() {
  return (
    <div>
      <Route path="/" exact>
        <Redirect to="/welcome"/>
      </Route>
      <Route path="/welcome">
        <Welcome/>
      </Route>
      <Route path='/signup'>
      <Signup/>
      </Route>
      <Route path='/login'>
      <Login/>
      </Route>
      
    </div>
  );
}

export default App;
