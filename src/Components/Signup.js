import React,{useRef} from "react";
import { Container,Row,Col, Form ,Card,Button,NavLink, Nav} from "react-bootstrap";

const Signup=()=>{
const EmailRef=useRef();
const PasswordRef=useRef();
const confirmPasswordRef=useRef();

const formSubmitHandler=(e)=>{
    e.preventDefault();
    const enteredEmail=EmailRef.current.value
    const enteredPassword=PasswordRef.current.value
    const enteredConfirmPassword=confirmPasswordRef.current.value

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCjIdx0_Dp6Zypz0RoEoDqh8A81TIyYtzE',{
        method:"POST",
        body:JSON.stringify({
            email:enteredEmail,
              password:enteredPassword,
              returnSecureToken:true
          }),
          
            headers:{
              'Content-Type':'application/json'
            }
    }).then(res=>{
        if(res.ok){
            res.json().then(data=>{
                console.log(data.idToken)
            })
        }
    })
    
    };
   
   
   
    return (
        <Container  >
            <Row className="mt-5" >
                <Col>
                </Col>
            </Row>
            
            <Row className="mt-5" >
                <Col>
                </Col>
            </Row>
            <Row className="mt-5" >
                <Col>
                
                </Col>
            </Row>
            <Row className="mt-5" >   
                <Col  md={{ span: 3, offset: 5 }} >
                <Card style={{borderRadius:'0px'}} >
                    <Card.Body>
                        <Card.Title className="mt-4" style={{textAlign:'center'}}>SignUp</Card.Title>
                        <Form onSubmit={formSubmitHandler}>
                            <Form.Control placeholder="Enter your Email" className="mt-5" ref={EmailRef} required></Form.Control>
                            <Form.Control id="password" placeholder="Enter your Password" min={6} className="mt-2" ref={PasswordRef} required></Form.Control>
                            <Form.Control id="password" placeholder="Re-Enter your Password" min={6} className="mt-2" ref={confirmPasswordRef} required></Form.Control>
                            <div className="d-grid">
                            <Button type="submit" className="mt-4" style={{borderRadius:'50px'}}>Sign Up</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
                
                <Card className="mt-2" style={{padding:'0'}}>
                <p style={{textAlign:'center', fontSize:'15px',marginTop:'5px',marginBottom:'5px'}}>Have an Account?<Nav.Item><NavLink>Login</NavLink></Nav.Item></p>
                </Card>
                
                </Col>
            </Row>
        </Container>
        
    )
};


export default Signup;