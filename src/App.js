
import './App.css';
import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Main from './Components/Main';
import Guest from './Components/Guest';
import Login from './Components/Login';
import * as Realm from "realm-web";



function App() {

    const [userCreds, setUserCreds] = useState({
    });

    const [user, setUser] = useState({});


    const handleLogin = (creds) => {
      setUserCreds(creds)
      console.log(creds);
      try {
      const {email, password, realmID} = creds;
      const app = new Realm.App({ id: realmID });
      const loginUser = async () => {
        const user = await app.logIn(Realm.Credentials.emailPassword(email, password));
        setUser(user);
      };
      loginUser();
    } catch(error) {
      console.log(error);
    }
    }
  
  //   const login = async (credentials) => {
  //     try {
  //       const { data } = await axios.post("/auth/login", credentials);
  //       await localStorage.setItem("messenger-token", data.token);
  //       setUser(data);
  //     } catch (error) {
  //       console.error(error);
  //       setUser({ error: error.response.data.error || "Server Error" });
  //     }
  //   };
  
  
  //   useEffect(() => {
  //     if (user?.error) {
  //       // check to make sure error is what we expect, in case we get an unexpected server error object
  //       if (typeof user.error === "string") {
  //         setErrorMessage(user.error);
  //       } else {
  //         setErrorMessage("Internal Server Error. Please try again");
  //       }
  //       setSnackBarOpen(true);
  //     }
  //   }, [user?.error]);
  
  
    return (
      <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Login handleLogin = {handleLogin} user={user}/>}
          />
          <Route
            path="guest"
            element={<Guest />}
          />
          <Route
            path="main"
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
