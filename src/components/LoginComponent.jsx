import React, { useState } from 'react';
import { LoginAPI } from '../api/AuthAPI';
import '../Sass/LoginComponent.scss';
import SportsforgeLogo from "../assets/SportsforgeLogo1.png";
import {toast} from  'react-toastify';
import {useNavigate} from  'react-router-dom';

export default function LoginComponent() {
  let navigate= useNavigate();
  const [credentails, setCredentials] = useState({});
  const login = async() => { 
    try {
      let res=await LoginAPI(credentails.email, credentails.password);
      toast.success('Sign in successful');
      localStorage.setItem('userEmail',res.user.email);
      navigate('/home');
    } catch (err) {
      console.log(err);
      toast.error("Invalid email or password");
    }
   };
  return (
    <>
      <div className='login-top'>
      <img src={SportsforgeLogo} className="SportsforgeLogo" />
      </div>
    <div className="login-wrapper">
<div className='login-card'>
      <div className="login-wrapper-inner">
        <h1 className="heading">Sign in</h1>
        <p className="sub-heading">Stay Updated On your Sports World</p>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or Phone"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password"
          />
        </div>
        <button onClick={login} className="login-btn">
          Sign in
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
        <p className="go-to-signup">
          New to SportsForge?{" "}
          <span className="join-now" onClick={() => navigate("/register")}>
            Join now
          </span>
        </p>
      </div>
      </div>
    </div>
    </>
  )
}
