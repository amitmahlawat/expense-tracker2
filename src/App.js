import React from "react";
import { useContext } from "react";
import AuthContext from "./Components/Auth-context";
import { Button } from "react-bootstrap";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { Redirect, Route } from "react-router-dom";
import Welcome from "./Components/WelcomePage";
import UpdateProfile from "./Components/UpdateProfile";
import { useHistory } from "react-router-dom";
import ResetPassword from "./Components/Resetpassword";


function App() {
  const history=useHistory()
  const authCtx=useContext(AuthContext)
  const logoutHandler=()=>{
    authCtx.logout()
    history.replace('/login')
  }

  return (
    <div>
     {authCtx.isLoggedIn && <Button onClick={logoutHandler}>Logout</Button>}
      <Route path="/profile">
      <UpdateProfile/>
      </Route>
      <Route path="/" exact>
        <Redirect to="/welcome"/>
      </Route>
      <Route path="/welcome">
        <Welcome/>
      </Route>
      <Route path='/signup'>
      <Signup/>
      </Route>
      {!authCtx.isLoggedIn &&<Route path='/login'>
      <Login/>
      </Route>}
      <Route path="/resetpassword">
        <ResetPassword/>
      </Route>
      
    </div>
  );
}

export default App;
