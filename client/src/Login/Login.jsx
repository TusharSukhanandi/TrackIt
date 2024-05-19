import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";
import ReflctionCreation from "../ReflctionCreation/ReflctionCreation";

function Login() {
  const toDashboard = useNavigate();

  const [user, setUser] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toCreateAc, setToCreateAc] = useState(false);
  const [error, setError] = useState("");
  const [valid, setValid] = useState("");
  const [isLoading, setIsloading] = useState(false)

  const URL = "https://track-it-backend.vercel.app";

  function handleUserAuth() {
    setIsloading(true)
    axios
      .post(`${URL}/auth`, { user: user, password: userPassword })
      .then((res) => {
        if (user != "" && userPassword != "") {
          if (res.data.message == "user not found") {
            setError(res.data.message);
            setIsloading(false)
          } else {
            toDashboard("/Dashboard", { state: { data: res.data } });
            setIsloading(false)
          }
        } else {
          setValid("fill Every Field");
          setIsloading(false)
        }
      })
      .catch((err) => console.log(err));

      
  }

  function handleUserCreate() {
 
   
    if (user != "" && userPassword != "" && userConfirmPassword != "") {

      if (userPassword.length >= 8) {
        if (userPassword === userConfirmPassword) {
          setIsloading(true)
          axios
            .post(`${URL}/create`, { user: user, password: userPassword })
            .then((res) => {
              if (res.data.message == "user name found") {
                setValid("user name found, try another user name");
                setIsloading(false)
              } else {
                if (res.data.message == "user found") {
                  setError("user found, signing in");
                 
                  setTimeout(() => {
                    toDashboard("/Dashboard", {
                      state: { data: res.data.user },
                      
                    });
                  }, 1000);
                  setIsloading(false)
                } else {
                  toDashboard("/Dashboard", { state: { data: res.data } });
                  setIsloading(false)
                }
                
              }
            })
            .catch((err) => console.log(err));
        } else {
          setValid("password is not matching");
        }
      } else {
        setValid("password must be 8 ");
      
      }
    } else {
      setValid("fill every field");
     
    }
  }

  function togglePassword(e) {
    e.preventDefault();
    setShowPassword(!showPassword);
   
  }

  function handleToCreateAc(e) {
    e.preventDefault();
    setToCreateAc(!toCreateAc);
    setError("");
   
  }


  return (
    <div className="container">
      <div className="header">TrackIt</div>
      <div className="sign-container">
        <div
          className={toCreateAc ? "signIn-container" : "signIn-container open"}
        >
          <div className="signIn">
            <div className="signInTitle">
              <u>Sign In</u>
            </div>
            <form>
              <div className="name">
                <input
                  className="input-Login"
                  placeholder="User name"
                  type="text"
                  onChange={(e) => setUser(e.target.value)}
                />
              </div>
              <div className="password">
                <input
                  className="input-Login"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setUserPassword(e.target.value)}
                />
                <button onClick={togglePassword} className="eye">
                  <div style={{ display: showPassword ? "none" : "block" }}>
                    <i className="fa-solid fa-eye"></i>
                  </div>
                  <div style={{ display: showPassword ? "block" : "none" }}>
                    <i className="fa-solid fa-eye-slash"></i>
                  </div>
                </button>
              </div>
            </form>
            <button className="done" onClick={handleUserAuth}>
              Done
            </button>
            <p onClick={handleToCreateAc} className="newAc">
              Create account
            </p>
            <p className="error">{error}</p>
          </div>
        </div>

        <div
          className={toCreateAc ? "signUp-container open" : "signUp-container"}
        >
          <div className="signUp">
            <div className="signUpTitle">
              <u>Sign Up</u>
            </div>
            <form>
              <div className="name">
                <input
                  className="input-Login"
                  placeholder="User name"
                  type="text"
                  onChange={(e) => setUser(e.target.value)}
                />
              </div>
              <div className="password">
                <input
                  className="input-Login"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setUserPassword(e.target.value)}
                />

                <button onClick={togglePassword} className="eye">
                  <div style={{ display: showPassword ? "none" : "block" }}>
                    <i className="fa-solid fa-eye"></i>
                  </div>
                  <div style={{ display: showPassword ? "block" : "none" }}>
                    <i className="fa-solid fa-eye-slash"></i>
                  </div>
                </button>
              </div>
              <input
                placeholder="Confirm Password"
                type="password"
                className="confirm-password"
                onChange={(e) => setUserConfirmPassword(e.target.value)}
              />
            </form>
            <button className="done" onClick={handleUserCreate}>
              Done
            </button>
            <p onClick={handleToCreateAc} className="newAc">
              already have an account?
            </p>
            <p>{error}</p>
          </div>
        </div>
        <p className="valid">{valid}</p>
      </div>
      <ReflctionCreation/>
      <div className="load">
       <div className={isLoading ? "loading" : ""}>
        <div className={isLoading ? "bar open" : "bar"}></div>
        <div className={isLoading ? "bar open" : "bar"}></div>
        <div className={isLoading ? "bar open" : "bar"}></div>
        <div className={isLoading ? "bar open" : "bar"}></div>
       </div>
      </div>
    </div>
  );
}

export default Login;
