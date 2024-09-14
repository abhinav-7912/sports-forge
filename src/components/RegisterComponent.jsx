import React, { useState } from 'react';
import { RegisterAPI} from '../api/AuthAPI';
import { postUserData } from '../api/FirestoreAPI';
import '../Sass/LoginComponent.scss';
import SportsforgeLogo from "../assets/SportsforgeLogo1.png";
import {toast} from  'react-toastify';
import {useNavigate} from  'react-router-dom';
import { getUniqueID } from "../helpers/getUniqueId";

export default function RegisterComponent() {
  let navigate= useNavigate();
  const [credentails, setCredentials] = useState({});
  const register = async() => { 
    try {
      let res = await RegisterAPI(credentails.email, credentails.password);
      toast.success("Account Created!");
      postUserData({
        userID: getUniqueID(),
        name: credentails.name,
        email: credentails.email,
        imageLink:
        "https://www.tenforums.com/attachments/user-accounts-family-safety/322690d1615743307-user-account-image-log-user.png",
      });
      navigate("/home");
      localStorage.setItem("userEmail", res.user.email);
    } catch (err) {
      console.log(err);
      toast.error("Cannot Create your Account");
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
        <h1 className="heading">Sign Up</h1>
        <p className="sub-heading">Join To Showcase Your Talent To the World</p>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, name: event.target.value })
            }
            type="text"
            className="common-input"
            placeholder="Your Name" required
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or Phone Number" required
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password (6 or more characters) " required
          />
        </div>
        <button onClick={register} className="login-btn">
          Agree And Join
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
        <p className="go-to-signup">
          Already On SportsForge?{" "}
          <span className="join-now" onClick={() => navigate("/")}>
            Sign in
          </span>
        </p>
      </div>
    </div>
    </div>
  </>
  )
}
