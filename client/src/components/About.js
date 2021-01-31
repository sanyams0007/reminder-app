import React from "react";
import "./About.css";
import aboutsvg from "../images/about2.png";
const About = () => {
  return (
    <div className="about_container">
      <h2>What do we do...</h2>
      <div className="about">
        <div className="about_content">
          <p>
            <span>EveryDay Reminders</span> is an easy to use productivity app
            which helps you in reminding important dates, events of life such as
            birthdays of your besties in case you forgot by creating real time
            reminders and keeps track of all reminders so when the timely moment
            come it reminds you by sending a message in your Mail and Mobile.
          </p>
        </div>
        <img src={aboutsvg} className="about_img" alt="About" />
      </div>
    </div>
  );
};

export default About;
