import React, { useEffect, useState ,useContext,useRef} from "react"
import {Button} from "react-bootstrap";
import BadgerMessage from "./BadgerMessage";
import { LoginSessionContext } from "../structural/BadgerApp";

export default function BadgerChatroom(props) {
    const postTitleRef = useRef();
    const postContentRef = useRef();
    const [messages, setMessages] = useState([]);
    const [loginSession, setLoginSession] = useContext(LoginSessionContext);


    const loadMessages = () => {
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
            headers: {
                "X-CS571-ID": "bid_fb95ac7241c9a040a85a"
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    useEffect(() => {
        loadMessages()
    }, [props]);

    return <>
        <h1>{props.name} Chatroom</h1>
        {
           <>
            <h4>Post Title</h4>
            <input id="postTitle" ref={postTitleRef}></input>
            <h4>Post Content</h4>
            <input id="postContent" ref={postContentRef}></input>
            <br/><br/>
            <Button id="postBtn" variant="primary" onClick={()=>{
                if(loginSession==null){
                    alert("You must be logged in to post!");
                }else if(postTitleRef==null || postContentRef == null 
                    || postTitleRef.current.value ==='' 
                    || postContentRef.current.value===''){
                    alert("You must provide both a title and content!");
                }else{
                    fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`,{
                        method:"POST",
                        credentials: "include",
                        headers: {
                            "Content-Type":"application/json",
                            "X-CS571-ID": "bid_fb95ac7241c9a040a85a"},
                        body: JSON.stringify({
                            "title": postTitleRef.current.value,
                            "content": postContentRef.current.value
                        })
                    }).then(res=>{
                        if(res.status===200){
                            alert("Successfully posted!");
                            postTitleRef.current.value=""
                            postContentRef.current.value=""
                            loadMessages();
                            return res.json()
                        }else{
                            res.json().then(data=>{alert(data.msg)});
                        }
                    })
                }

            }}>Create Post</Button>
           </>
        }
        <hr/>
        {
            messages.length > 0 ?
                <>
                    {
                        messages.map(message => {
                            return <BadgerMessage
                                    key = {message.id}
                                    title = {message.title}
                                    poster = {message.poster}
                                    content = {message.content}
                                    created = {message.created}
                                    id={message.id}
                                    chatroom={props.name}
                                    toReload={loadMessages}
                            ></BadgerMessage>
                        })
                    }
                </>
                :
                <>
                    <p>There are no messages in this chatroom yet!</p>
                </>
        }
    </>
}