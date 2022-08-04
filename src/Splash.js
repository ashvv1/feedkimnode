import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
const splashScreen = require('./assets/pawpng.gif');

const Splash = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        setTimeout(()=>{
            navigate('./login')
        }, 3000)

    }, [navigate]);
 
    return (
        <div className = "Splash-container">
            <h1 className ="Splash-greeting">Hello!</h1>
            <img src={splashScreen} alt="paw prints" width="100%" height="100%"></img>
        </div>
    );
};

export default Splash;