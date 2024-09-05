import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";
import ReflctionCreation from "../ReflctionCreation/ReflctionCreation";
// import { connection } from "mongoose";

function Login() {
  const toDashboard = useNavigate();

  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toCreateAc, setToCreateAc] = useState(false);
  const [error, setError] = useState("");
  const [valid, setValid] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const URL = "http://localhost:1111";

  const handleUserAuth = async () => {
    setIsloading(true);
    try {

    
      const res = await axios.post(`${URL}/auth/logIn`, {
        userName: userName,
        password: userPassword,
      });

      if (!userName || !userPassword) {
        setIsloading(false);
        return setValid("fill Every Field");
      }
      if (res.data.message == "user not found") {
        setIsloading(false);
        return setError(res.data.message);
      }

      setIsloading(false);
      console.log(res.data.user);
      
      return toDashboard("/Dashboard", { state: { data: res.data.user } });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserCreate = async () => {
    if (!userName || !userPassword || !userConfirmPassword) {
      return setValid("fill every field");
    }

    console.log({
      userName: userName,
      password: userPassword.length,
    });

      // if (userPassword.length > 7) {
      //  return setValid("password must be 8 ");
      // }

        if (userPassword === userConfirmPassword) {
          setValid("password is not matching");
        }

          setIsloading(true);

          try{
          const res = await axios.post(`${URL}/auth/signUp`, { userName : userName , password: userPassword })
            
              if (res.data.message == "user name found") {
                setIsloading(false);
                return setValid("user name found, try another user name");
              } 
                if (res.data.message == "user found") {
                  setError("user found, signing in");

                  setTimeout(() => {
                    toDashboard("/Dashboard", {
                      state: { data: res.data.user },
                    });
                  }, 1000);
                  setIsloading(false);
                } else {
                  toDashboard("/Dashboard", { state: { data: res.data } });
                  setIsloading(false);
                }
              
              
            }
            catch(error){
              console.log(error);
              
            
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
                  onChange={(e) => setUserName(e.target.value)}
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
                  onChange={(e) => setUserName(e.target.value)}
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
      <ReflctionCreation />
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
