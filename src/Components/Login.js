import React, { useState, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router';
const kimicon = require('../assets/kim.png')


const Login = ({handleLogin, user}) => {
    const [loginWindow, setLoginWindow] = useState(false);
    const navigate = useNavigate();
    const userMail = useRef();
    const userPass = useRef();
    const realmId = useRef();
    console.log(user);
    useEffect(()=>{
        if(user?.id){
            navigate("./main");
        }
    },[user, navigate])
    
    return (
        <div className = "Login-container">
            {loginWindow? 
            (<div className = "Login-entry">
                <div className = "Login-inputs">
                    <h2>Admin Login</h2>
                    <input className ="Login-input" placeholder = "id" ref={realmId}>
                    </input>
                    <input className ="Login-input" placeholder = "user" ref={userMail}>
                    </input>
                    <input className = "Login-input" placeholder = "password" ref={userPass}>
                    </input>
                    <button className = "Login-button" onClick = {e => handleLogin({
                        email: userMail.current.value,
                        password: userPass.current.value,
                        realmID: realmId.current.value,
                    })}>LOGIN</button>
                    <button className = "Back-button" onClick ={e => setLoginWindow(false)}>BACK</button>
                    </div>
                </div>)
                :
                (null)}
            <h1>FEED KIM</h1>
            <img alt = "kim icon" src={kimicon} height ="30%"/>
            <div className = "Login-options">
                <button className = "Option-button" onClick= {e => navigate("./guest")}>
                    GUEST
                </button>
                <button className = "Option-button" onClick = {e => setLoginWindow(true)}>
                    ADMIN
                </button>
             
            </div>
        </div>
    );
};

export default Login;