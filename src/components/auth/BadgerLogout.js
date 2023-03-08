import React, { useEffect,useContext } from 'react';
import { LoginSessionContext } from '../structural/BadgerApp';

export default function BadgerLogout() {
    const [loginSession,setLoginSession]=useContext(LoginSessionContext);

    useEffect(() => {
        fetch('https://cs571.org/s23/hw6/api/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": "bid_fb95ac7241c9a040a85a"
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            setLoginSession(null)
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}