import React, { useRef, useState,useContext, } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  NavLink,
  Nav
} from "react-bootstrap";
import AuthContext from "./Auth-context";
import { useHistory,Link } from "react-router-dom";

const Login = () => {
const history = useHistory()
  const authCtx=useContext(AuthContext)
  const EmailRef = useRef();
  const PasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = EmailRef.current.value;
    const enteredPassword = PasswordRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCjIdx0_Dp6Zypz0RoEoDqh8A81TIyYtzE",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),

        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          authCtx.login(data.idToken)
          history.replace('/')
          
        });
      }else{
        res.json().then(data=>{
          console.log(data)
        })
      }
    });
  };

  return (
    <body >
    <Container fluid>
      
      <Row className="mt-5">
        <Col></Col>
      </Row>
    
      <Row className="mt-5">
        <Col></Col>
      </Row>
      <Row className="mt-5">
        <Col></Col>
      </Row>
      <Row className="mt-5">
        <Col md={{ span: 3, offset: 5 }}>
          <Card style={{ borderRadius: "0px" }}>
            <Card.Body>
              <Card.Title className="mt-4" style={{ textAlign: "center" }}>
                Login
              </Card.Title>
              <Form onSubmit={formSubmitHandler}>
                <Form.Control
                  placeholder="Enter your Email"
                  className="mt-5"
                  ref={EmailRef}
                  required
                ></Form.Control>
                <Form.Control
                  id="password"
                  placeholder="Enter your Password"
                  min={6}
                  className="mt-2"
                  ref={PasswordRef}
                  required
                ></Form.Control>
              <Link to="/resetpassword" style={{textAlign:"center",textDecoration:"none",}}>Forgot password?</Link>
                <div className="d-grid">
                  <Button
                    type="submit"
                    className="mt-4"
                    style={{ borderRadius: "50px"}}
                  >
                    Login
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          <Card className="mt-2" style={{ padding: "0" }}>
            <p
              style={{
                textAlign: "center",
                fontSize: "15px",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            >
              Don't have an Account ?
              <Link to="/signup" style={{textDecoration:"none",}}>Sign up </Link>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
    </body>
  );
};

export default Login;
