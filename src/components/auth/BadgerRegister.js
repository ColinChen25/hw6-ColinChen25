import React from 'react';
import {useState} from 'react';
import {Button} from "react-bootstrap";

export default function BadgerRegister() {

    // TODO Create the register component.
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordConfirmInput, setPasswordConfirmInput] = useState('');

    return <>
        <h1>Register</h1>
        <h4>Username</h4>
        <input type="text" id="regUsername" 
        value={usernameInput} onChange={(e)=>setUsernameInput(e.target.value)}></input>
        <br/>
        <h4>Password</h4>
        <input type="password" id="regPassword"
        value={passwordInput} onChange={(e)=>setPasswordInput(e.target.value)}></input>
        <br/>
        <h4>Repeat Password</h4>
        <input type="password" id="regPasswordConfirm" 
        value={passwordConfirmInput} onChange={(e)=>setPasswordConfirmInput(e.target.value)}></input>
        <br/><br/>
        <Button variant="primary" onClick={()=>{
            if(usernameInput === '' || passwordInput === '' || passwordConfirmInput === ''){
                alert("You must provide both a username and password!");
            }else if(!(passwordInput === passwordConfirmInput)){
                alert("Your passwords do not match!");
            }else{
                fetch("https://www.cs571.org/s23/hw6/api/register",{
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type":"application/json",
                    "X-CS571-ID": "bid_fb95ac7241c9a040a85a"},
                body: JSON.stringify({
                    "username": usernameInput,
                    "password": passwordInput
                })
            }).then(res=>{ //process status code
                if (res.stuats === 200){
                    return res.json();
                }
                else if(res.status === 400 || res.status === 413){
                    res.json().then((data)=>{
                        alert(data.msg);
                    })
                }
                else if(res.status === 409){
                    alert("That username has already been taken!");
                }
            }).then(json=>{ //process returned json
                alert(json.msg);

            }).catch(e=>{
                alert("An error occured while making the request")
            })
            }
        }}>Register</Button>

        

    </>
}