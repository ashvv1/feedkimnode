
import './App.css';
import React, { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Main from './Components/Main';
import Guest from './Components/Guest';
import Login from './Components/Login';
import Splash from './Splash';
import * as Realm from "realm-web";



function App() {

    const [user, setUser] = useState({});

    const handleLogin = (creds) => {
      const {email, password, realmID} = creds;
      try {
      const app = new Realm.App({ id: realmID });
      const loginUser = async () => {
        const realmUser = await app.logIn(Realm.Credentials.emailPassword(email, password));
        setUser({
          ...realmUser,
        rid: realmID
      });
      };
      loginUser();
    } catch(error) {
      console.log(error);
    }
    };
  
    return (
      <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/feedkimnode"
            element={<Splash />}
          />
          <Route
            path="/feedkimnode/login"
            element={<Login handleLogin = {handleLogin} user={user}/>}
          />
          <Route
            path="/feedkimnode/guest"
            element={<Guest />}
          />
          <Route
            path="/feedkimnode/main"
            element={
              user? 
                (<Main user={user} />) :
                (<Login handleLogin = {handleLogin}/>)
              
            }
          />
         
        </Routes>
        </BrowserRouter>
      </>
    );
  };
  

export default App;
