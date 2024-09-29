import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./login.css";
import ReflctionCreation from "../ReflctionCreation/ReflctionCreation";
import { useUserContext } from "../context/UserContext";

function Login() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toCreateAc, setToCreateAc] = useState(false);
  const [error, setError] = useState("");
  const [valid, setValid] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const { setUser } = useUserContext();

  console.log(import.meta.env.VITE_API_URL || false);

  const handleUserAuth = async () => {
    setIsloading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/logIn`, {
        userName: userName,
        password: userPassword,
      }, {withCredentials : true});

      if (!userName || !userPassword) {
        setIsloading(false);
        return setValid("fill Every Field");
      }
    
      localStorage.setItem("TrackIt-User", JSON.stringify(res.data.user));
      setUser(res.data.user);

      setIsloading(false);
     
    } catch (error) {
      console.log(error);
      return setError(error.response.data.message);
    } finally {
      setIsloading(false);
    }
  };

  const handleUserCreate = async () => {
    if (!userName || !userPassword || !userConfirmPassword) {
      return setValid("fill every field");
    }

    if (userPassword.length < 7) {
      return setValid("password must be 8 ");
    }

    if (userPassword !== userConfirmPassword) {
     return setValid("password is not matching");
    }

    setIsloading(true);

    try { 
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signUp`, {
        userName: userName,
        password: userPassword,
      }, {withCredentials : true});

      if (res.data.message == "user name found") {
        setIsloading(false);
        return setValid("user name found, try another user name");
      }
      if (res.data.message == "user found") {
        setError("user found, signing in");

        setIsloading(false);
      } else {
        console.log("hello");
        console.log(res);
        
        setUser(res.data);
        localStorage.setItem("TrackIt-User", JSON.stringify(res.data));
        setIsloading(false);
      }
    } catch (error) {
      console.log(error);
      setValid(error.response.data.message)
      setIsloading(false)
    }
  };

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
