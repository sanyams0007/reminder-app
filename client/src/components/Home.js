import React from "react";
import "./Home.css";
import timesvg from "../images/time.svg";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  return (
    <div className="home_container">
      <div className="home">
        <div className="home_content">
          <h1>Never forget a thing.</h1>
          <p>
            Make sure you don't let your important tasks slip away. Add one-time
            reminders to help you become more productive than ever .
          </p>
          <button onClick={() => history.push("/login")}>
            Get Started- It's Free
          </button>
        </div>
        <img src={timesvg} className="home_img" alt="home" />
      </div>
    </div>
  );
};

export default Home;
