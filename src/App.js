import React from "react";
import { useContext } from "react";
import { Button, Navbar } from "react-bootstrap";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { Redirect, Route,NavLink } from "react-router-dom";
import Welcome from "./Components/WelcomePage";
import UpdateProfile from "./Components/UpdateProfile";
import { useHistory } from "react-router-dom";
import ResetPassword from "./Components/Resetpassword";
import Expenses from "./Components/Expenses";
import { useDispatch,useSelector } from "react-redux";
import { authActions } from "./Components/store";
import { ExpenseActions } from "./Components/store";
function App() {
  const dispatch=useDispatch()
  const totalAmount = useSelector(state=>state.ExpenseReducer.totalAmount)
const IsLoggedIn=useSelector(state=>state.AuthReducer.isLoggedIn)
  const history=useHistory()

  const logoutHandler=()=>{
    dispatch(authActions.LogOut())
    localStorage.clear()
    history.replace('/login')
  }

  return (
    <div>
      <Navbar style={{background:'black'}}>
      
      {IsLoggedIn && <Button  style={{marginLeft:"0%"}} variant=" btn-outline-info "><NavLink style={{textDecoration:"none"}} to='/expenses'>Expenses</NavLink></Button>}
      {IsLoggedIn && <Button style={{marginLeft:"80%"}} onClick={logoutHandler}>Logout</Button>}
      {!IsLoggedIn && <Button variant=" btn-outline-info "><NavLink style={{textDecoration:"none"}} to='/login'>Login</NavLink></Button>}
      
      </Navbar>
      
      {IsLoggedIn && <Route path="/expenses">
      <Expenses/>
      </Route>}
     
      <Route path="/profile">
      <UpdateProfile/>
      </Route>
      <Route path="/" exact>
        <Redirect to="/welcome"/>
      </Route>
      {IsLoggedIn && <Route path="/welcome">
        <Welcome/>
      </Route>}
      <Route path='/signup'>
      <Signup/>
      </Route>
      {!IsLoggedIn &&<Route path='/login'>
      <Login/>
      </Route>}
      <Route path="/resetpassword">
        <ResetPassword/>
      </Route>
      
    </div>
  );
}

export default App;
