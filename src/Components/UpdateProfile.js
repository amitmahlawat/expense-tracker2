import userEvent from "@testing-library/user-event";
import React,{useEffect, useRef, useState} from "react";
import { Form,Card, Container,Button, Navbar } from "react-bootstrap";


const UpdateProfile=()=>{
const[completed,SetCompleted]=useState(0)
const[nameUpdate,SetnameUpdate]=useState(false)
const[UrlUpdate,SetUrlUpdate]=useState(false)

const NameRef=useRef();
const urlRef=useRef();



const nameChangeHandler=()=>{
    if(NameRef.current.value){
        SetnameUpdate(true)
    }else{
        SetnameUpdate(false)
    }
}

const UrlChangeHandler=()=>{
    if(urlRef.current.value){
        SetUrlUpdate(true)
    }else{
        SetUrlUpdate(false)
    }
}
useEffect(()=>{
    if(nameUpdate && UrlUpdate){
        SetCompleted(100)
    }else if(nameUpdate || UrlUpdate){
        SetCompleted(50)
    }else{
        SetCompleted(0)
    }

})
    



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
    
    
    useEffect(()=>{
        const token=localStorage.getItem('token')
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCjIdx0_Dp6Zypz0RoEoDqh8A81TIyYtzE',{
           method:'POST', 
        body:JSON.stringify({
                idToken:token
            }),
            headers:{
                'Content-Type':'/application/jason'
            }
            }).then(res=>{
            res.json().then(data=>{
                NameRef.current.value=data.users[0].displayName
                SetnameUpdate(true)
                console.log(data.users[0])
                urlRef.current.value=data.users[0].photoUrl
                SetUrlUpdate(true)
            })
        })
    },[])


    return(<>
        <Container>
        
        <Navbar bg='dark' variant="dark">

        
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>your profile is {completed}% complete</Navbar.Text>
        </Navbar.Collapse>

        
        </Navbar    >
        <h1 style={{textAlign:'center'}}>Contact Details</h1>
        <Card>
            <Card.Body>
        <Form onSubmit={SubmitHandler}>
            <Form.Label htmlFor="fullname">Full Name</Form.Label>
            <Form.Control id='fullname' type="text" onChange={nameChangeHandler} ref={NameRef} required></Form.Control>
            <Form.Label htmlFor="url">Profile photo URL</Form.Label>
            <Form.Control id='url' type="url" onChange={UrlChangeHandler} ref={urlRef} required></Form.Control>
            <Button  className="mt-3" type="submit" >update</Button>
        </Form>
        </Card.Body>
        </Card>
        </Container>
        </>
    )
}



export default UpdateProfile;