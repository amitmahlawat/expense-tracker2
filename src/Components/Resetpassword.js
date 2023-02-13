import React from "react";
import { Form, Button, Card, Container,Row,Col } from "react-bootstrap";
import { useRef } from "react";
const ResetPassword = () => {

    const EmailRef=useRef();
const SubmitHandler=async(e)=>{
    e.preventDefault();
 const   EnteredEmail=EmailRef.current.value
const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCjIdx0_Dp6Zypz0RoEoDqh8A81TIyYtzE',{
    method:"POST",
    body:JSON.stringify({
        requestType:"PASSWORD_RESET",
        email:EnteredEmail
    }),
    headers:{
        'Content-Type':"application/json"
    }
})
const data=await response.json()
console.log(data)
}


  return (
    <Container>
      <Row>
        <Col md={{ span: 3, offset: 5 }}>
          <Card>
            <Card.Title className="mt-5" style={{textAlign:"center"}}>Reset Password</Card.Title>
            <Form onSubmit={SubmitHandler}>
              <Form.Control className="mt-3"
                type="email"
                placeholder="enter your mail id"  ref={EmailRef}
              ></Form.Control>
              <div className="d-grid">
              <Button className="mt-3" type="submit">
                Send link
              </Button></div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
