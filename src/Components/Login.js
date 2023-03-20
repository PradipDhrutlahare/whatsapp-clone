import React from 'react';
import  Button from '@mui/material/Button';
import "../Components/Style.css";
import logo from "../whatsapp.png";
import { auth ,provider } from "../firebase";
import {  signInWithPopup } from "firebase/auth";
import { UserStatus } from "../Context/StateProvider";

const Login = () => {
  const {state, dispatch} = UserStatus();

    const signIn = () =>{
   signInWithPopup(auth, provider)
      .then((result) =>{
        dispatch({
          type:"SET_USER",
          user:result.user  ,
        
        })
      })
      .catch((error) => alert(error.message))
    }
  return (
    <div className='login'>
       <div className="login_container">
            <img src={logo} className='img' alt="" />
            <div className="login_text">
                <h1>Sign in to WhatsApp</h1>
            </div>
            <Button onClick={signIn}>Sign in with Google</Button>
       </div>
    </div>
  )
}

export default Login;
