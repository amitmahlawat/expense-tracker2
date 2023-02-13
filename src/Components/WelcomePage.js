import React from "react";
import { Navbar ,Container, Card, Button} from "react-bootstrap";
import { Link } from "react-router-dom";



const Welcome=()=>{
    const token=localStorage.getItem('token')
    const verifyEmailHandler=async()=>{
        const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCjIdx0_Dp6Zypz0RoEoDqh8A81TIyYtzE',{
           method:'POST',
           body:JSON.stringify({
            requestType:"VERIFY_EMAIL",
            idToken:token
           }),
           headers:{
            'Content-Type':'application/json'
           }
        })
        if(!response.ok){
            throw new Error('something went wrong');
        }
        const data=await response.json()
        console.log(data)
    }
 

    return(
        <Navbar>
      <Container>
        <Navbar.Brand><h1>Welcome to Expense tracker!!!</h1></Navbar.Brand>
        
        {/* <Navbar.Collapse className="justify-content-end"> */}
          <Navbar.Text>
           <Card style={{padding:'0'}}><Card.Body>your profile is incomplete:<Link to="/profile">complete Now</Link></Card.Body></Card>
          </Navbar.Text>
          <Button onClick={verifyEmailHandler}>Verify Email id</Button>
        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>
        
        
    )
}

export default Welcome;