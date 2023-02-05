import React from "react";
import { Navbar ,Container, Card} from "react-bootstrap";
import { Link } from "react-router-dom";



const Welcome=()=>{


    return(
        <Navbar>
      <Container>
        <Navbar.Brand><h1>Welcome to Expense tracker!!!</h1></Navbar.Brand>
        
        {/* <Navbar.Collapse className="justify-content-end"> */}
          <Navbar.Text>
           <Card style={{padding:'0'}}><Card.Body>your profile is incomplete:<Link to="/profile">complete Now</Link></Card.Body></Card>
          </Navbar.Text>
        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>
        
        
    )
}

export default Welcome;