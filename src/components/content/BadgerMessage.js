import React, {useContext}from "react"
import { LoginSessionContext } from "../structural/BadgerApp";
import { Button } from "react-bootstrap";

function BadgerMessage(props) {
    const [loginSession, setLoginSession]=useContext(LoginSessionContext);
    const dt = new Date(props.created);
    const handleReload = ()=>{
        props.toReload();
    }

    return <>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br/><br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {props.poster === loginSession ? (
        <Button variant="danger" id="deleteBtn" onClick={()=>{
            fetch(`https://www.cs571.org/s23/hw6/api/chatroom/${props.chatroom}/messages/${props.id}`,{
                method: "DELETE",
                credentials: "include",
                headers: {
                    "X-CS571-ID": "bid_fb95ac7241c9a040a85a"}
            }).then(res=>{
                if(res.status===200){
                    alert("Successfully deleted the post!");
                    handleReload();
                    return res.json()
                }else{
                    res.json().then(data=>{alert(data.msg)});
                }
            })
        }}>Delete Post</Button>
      ) : null}
    </>
}

export default BadgerMessage;