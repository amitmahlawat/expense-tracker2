import userEvent from "@testing-library/user-event";
import React,{useRef} from "react";
import { Form,Card, Container,Button } from "react-bootstrap";


const UpdateProfile=()=>{
const NameRef=useRef();
const urlRef=useRef();

    const SubmitHandler=(e)=>{
        e.preventDefault();
        const enteredName=NameRef.current.value;
        const enteredURL=urlRef.current.value;
        const token=localStorage.getItem('token')
        
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCjIdx0_Dp6Zypz0RoEoDqh8A81TIyYtzE',
        {
            method:'POST',
            body:JSON.stringify({
                idToken:token,
                displayName:enteredName,
                photoUrl:enteredURL,
                returnSecureToken:true
            }),
            headers: {
                "Content-Type": "application/json",
              }

        }).then(res=>{
            res.json().then(data=>{
                console.log(data)
            })
        })
    }


    return(<>
        <Container>
        <h1 style={{textAlign:'center'}}>Contact Details</h1>
        <Card>
            <Card.Body>
        <Form onSubmit={SubmitHandler}>
            <Form.Label htmlFor="fullname">Full Name</Form.Label>
            <Form.Control id='fullname' type="text" ref={NameRef}></Form.Control>
            <Form.Label htmlFor="url">Profile photo URL</Form.Label>
            <Form.Control id='url' type="url" ref={urlRef}></Form.Control>
            <Button  className="mt-3" type="submit" >update</Button>
        </Form>
        </Card.Body>
        </Card>
        </Container>
        </>
    )
}



export default UpdateProfile;