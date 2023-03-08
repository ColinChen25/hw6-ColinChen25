import React,{useContext, useRef} from 'react';
import {Button} from "react-bootstrap";
import { LoginSessionContext } from '../structural/BadgerApp';

export default function BadgerLogin() {
    const loginUsernameRef = useRef();
    const loginPasswordRef = useRef();
    const [loginSession,setLoginSession]=useContext(LoginSessionContext);



    return <>
        <h1>Login</h1>
        <h4>Username</h4>
        <input type="text" id="loginUsername" ref={loginUsernameRef}></input>
        <br/>
        <h4>Password</h4>
        <input type="password" id="loginPassword" ref={loginPasswordRef}></input>
        <br/><br/>
        <Button variant='primary' onClick={()=>{
            if(loginUsernameRef.current.value === '' || loginPasswordRef.current.value ===''){
                alert("You must provide both a username and password!")
            }else{
                fetch("https://www.cs571.org/s23/hw6/api/login",{
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type":"application/json",
                        "X-CS571-ID": "bid_fb95ac7241c9a040a85a"},
                    body: JSON.stringify({
                        "username":loginUsernameRef.current.value,
                        "password":loginPasswordRef.current.value
                    })
                }).then(res=>{
                    if(res.status === 200){
                        alert("Login successful")
                        return res.json();
                    }else if(res.status === 401){
                        alert("Incorrect password!");
                    }else if(res.status === 404){
                        alert("Incorrect username!")
                    }
                }).then(json=>{
                    
                    if(json){
                        setLoginSession(json.user.username);
                    }
                })
            }
        }}>Login</Button>
    </>
}