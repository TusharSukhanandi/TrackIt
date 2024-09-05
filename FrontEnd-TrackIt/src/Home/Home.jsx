import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import ReflctionCreation from "../ReflctionCreation/ReflctionCreation";

function Home() {
    const toLogin = useNavigate();

    const handleLogin = () => {
        toLogin("/login")
    }

  return (
    <div className="home">
      <div className="header">TrackIt</div>
      <main>
        <div className="caption">
          TrackIt! Lets you track your daily exercise routine.
        </div>
        <div className="loginBtn">
            <button onClick={handleLogin}>Log-in</button>
        </div>
      </main>
      <ReflctionCreation/>
    </div>
  );
}

export default Home;
